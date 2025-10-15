############################
# 1) Build Stage (JDK 21)
############################
FROM eclipse-temurin:21-jdk AS build

# Make the build deterministic and cache-friendly
ARG SERVICE_DIR               
WORKDIR /workspace

# Copy only Gradle wrapper & build files first (better layer caching)
COPY ${SERVICE_DIR}/gradlew ${SERVICE_DIR}/gradlew.bat \
    ${SERVICE_DIR}/build.gradle ${SERVICE_DIR}/settings.gradle ./
COPY ${SERVICE_DIR}/gradle ./gradle

# Pre-warm Gradle dependency cache (safe even if it does little without sources)
RUN chmod +x gradlew

# Copy the rest of the service sources
COPY ${SERVICE_DIR}/ ./

RUN chmod +x gradlew

# Build the Spring Boot fat jar (skip tests here; CI can run tests separately)
# Use BuildKit cache for Gradle (fast subsequent builds)
RUN --mount=type=cache,target=/root/.gradle \
    ./gradlew --no-daemon clean bootJar


# Collect the jar to a known location
RUN JAR="$(ls -1 build/libs/*.jar | head -n1)" \
    && mkdir -p /out \
    && cp "$JAR" /out/app.jar


############################
# 2) Runtime Stage (JRE 21)
############################
FROM eclipse-temurin:21-jre

# Run as non-root for security
USER 10001

WORKDIR /app
COPY --from=build /out/app.jar /app/app.jar

# Tweak JVM for containers (Java 21 is container-aware; MaxRAMPercentage still useful)
ENV JAVA_OPTS="-XX:MaxRAMPercentage=75"
ENV SERVER_PORT=8080
EXPOSE 8080

# If you use Spring profiles, you can pass: -Dspring.profiles.active=prod
ENTRYPOINT ["sh","-c","java $JAVA_OPTS -jar /app/app.jar"]