package com.example.backend.config;

import com.example.backend.course.CourseDetailDto;
import com.example.backend.course.CourseDto;
import com.example.backend.course.CourseSalesDto;
import com.example.backend.course.lesson.LessonDto;
import org.springframework.boot.cache.autoconfigure.RedisCacheManagerBuilderCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.serializer.JacksonJsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext.SerializationPair;
import tools.jackson.databind.ObjectMapper;

import java.time.Duration;
import java.util.List;

@Configuration(proxyBeanMethods = false)
@EnableCaching(order = Ordered.LOWEST_PRECEDENCE - 1)
public class CacheConfig {
    public static final String PUBLISHED_COURSES = "published-courses";
    public static final String PUBLISHED_COURSE_DETAILS = "published-courses-details";
    public static final String COURSES_SALES = "courses-sales";

    @Bean
    RedisCacheManagerBuilderCustomizer redisCacheCustomizer(ObjectMapper objectMapper) {
        var catalogType = objectMapper.getTypeFactory().constructCollectionType(List.class, CourseDto.class);
        var catalogSerializer = new JacksonJsonRedisSerializer<List<CourseDto>>(objectMapper, catalogType);
        var detailType = objectMapper.getTypeFactory()
                .constructParametricType(CourseDetailDto.class, LessonDto.class);
        var detailSerializer =
                new JacksonJsonRedisSerializer<CourseDetailDto<LessonDto>>(objectMapper, detailType);
        var salesType = objectMapper.getTypeFactory().constructCollectionType(List.class, CourseSalesDto.class);
        var salesSerializer = new JacksonJsonRedisSerializer<List<CourseSalesDto>>(objectMapper, salesType);
        var defaults = RedisCacheConfiguration.defaultCacheConfig()
                .prefixCacheNameWith("learnify:")
                .entryTtl(Duration.ofMinutes(1))
                .disableCachingNullValues();

        return builder -> builder
                .transactionAware()
                .cacheDefaults(defaults)
                .disableCreateOnMissingCache()
                .withCacheConfiguration(PUBLISHED_COURSES,
                        defaults.serializeValuesWith(SerializationPair.fromSerializer(catalogSerializer)))
                .withCacheConfiguration(PUBLISHED_COURSE_DETAILS,
                        defaults.serializeValuesWith(SerializationPair.fromSerializer(detailSerializer)))
                .withCacheConfiguration(COURSES_SALES,
                        defaults.serializeValuesWith(SerializationPair.fromSerializer(salesSerializer)));

    }
}
