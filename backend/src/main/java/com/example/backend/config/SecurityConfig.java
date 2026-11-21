package com.example.backend.config;

import com.example.backend.security.JwtCookieFilter;
import com.example.backend.security.JwtService;
import com.example.backend.user.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    @Order(1)
    SecurityFilterChain publicAuth(HttpSecurity http) throws Exception {
        return http
                .securityMatcher("/api/auth/signIn", "/api/auth/signUp")
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .build();
    }

    @Bean
    @Order(2)
    SecurityFilterChain apiSecurity(HttpSecurity http, JwtService jwtService, UserRepository userRepository)
            throws Exception {
        return http
                .securityMatcher("/api/**")
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/courses/sales", "/api/courses/admin/**",
                                "/api/users", "/api/enrollments").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/courses/*/status", "/api/users/update/role")
                                .hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/users/delete/*").hasRole("ADMIN")
                        .requestMatchers("/api/courses/mine", "/api/enrollments/students")
                                .hasAnyRole("ADMIN", "INSTRUCTOR")
                        .requestMatchers(HttpMethod.GET, "/api/courses").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/courses/*").permitAll()
                        .anyRequest().authenticated()
                )
                .exceptionHandling(e -> e.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                .addFilterBefore(new JwtCookieFilter(jwtService, userRepository),
                        UsernamePasswordAuthenticationFilter.class)
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .build();
    }
}
