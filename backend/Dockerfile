# --- Этап 1: Сборка проекта (Java 21 JDK) ---
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app

# Копируем файлы зависимостей для кэширования
COPY gradlew build.gradle settings.gradle ./
COPY gradle ./gradle

RUN chmod +x gradlew
RUN ./gradlew dependencies --no-daemon

# Копируем исходный код
COPY src ./src

# Собираем jar-файл
RUN ./gradlew bootJar --no-daemon


# --- Этап 2: Финальный запуск (Java 21 JRE) ---
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Копируем собранный jar из первого этапа
COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
