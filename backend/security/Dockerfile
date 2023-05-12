## 사용할 base 이미지를 정의합니다.
#FROM openjdk:11.0.11-jdk-slim-buster
#
## 작업 디렉토리를 설정합니다.
#WORKDIR /var/jenkins_home/workspace/juchapika/backend/security
#
## Gradle 빌드 스크립트 파일을 복사합니다.
#COPY build.gradle .
#COPY gradlew .
###
## Gradle 의존성을 복사합니다.
#COPY gradle gradle
#
## RUN chmod +x gradlew
#RUN chmod +x gradlew
#
##test
## 애플리케이션을 빌드합니다.
#RUN ./gradlew clean build --stacktrace
#
## 빌드된 jar 파일을 복사합니다.
#COPY build/libs/security-0.0.1-SNAPSHOT.jar app.jar
#
## 컨테이너 실행 시 실행할 명령어를 정의합니다.
#CMD ["java", "-jar", "app.jar"]
#
## test

## 사용할 base 이미지를 정의합니다.
#FROM openjdk:11.0.11-jdk-slim-buster
#
## 작업 디렉토리를 설정합니다.
#WORKDIR /var/jenkins_home/workspace/juchapika/backend/security
#
## Gradle 빌드 스크립트 파일을 복사합니다.
#COPY build.gradle .
#COPY gradlew .
###
## Gradle 의존성을 복사합니다.
#COPY gradle gradle
#
## gradlew 실행 권한 부여
#RUN chmod +x gradlew
#
#
## Gradle을 사용하여 애플리케이션을 빌드합니다.
#RUN ./gradlew build --info
#
#
#RUN pwd
#
## 빌드된 jar 파일을 복사합니다.
#COPY build/libs/security-0.0.1-SNAPSHOT.jar app.jar
#
## 컨테이너 실행 시 실행할 명령어를 정의합니다.
#CMD ["java", "-jar", "app.jar"]

## 사용할 base 이미지를 정의합니다.
#FROM openjdk:11.0.11-jdk-slim-buster
#
## 작업 디렉토리를 설정합니다.
#WORKDIR /var/jenkins_home/workspace/juchapika/backend/security
#
## build/libs 폴더 내용 삭제
#RUN rm -rf build/libs/*
#
## Gradle 빌드 스크립트 파일을 복사합니다.
#COPY build.gradle .
#COPY gradlew .
#
## Gradle 의존성을 복사합니다.
#COPY gradle gradle
#
## gradlew 실행 권한 부여
#RUN chmod +x gradlew
#
## 빌드를 실행하기 전에 현재 위치를 출력합니다.
#RUN pwd && ls -la
#
## Gradle을 사용하여 애플리케이션을 빌드합니다.
#RUN ./gradlew clean build --info
#
## 빌드된 jar 파일을 복사합니다.
#COPY build/libs/security-0.0.1-SNAPSHOT.jar app.jar
#
## 컨테이너 실행 시 실행할 명령어를 정의합니다.
#CMD ["java", "-jar", "app.jar"]


FROM openjdk:11.0.11-jdk-slim-buster

WORKDIR /var/jenkins_home/workspace/juchapika/backend/security

COPY build.gradle .
COPY gradlew .
COPY gradle gradle

RUN chmod +x gradlew

# Gradle을 사용하여 애플리케이션을 빌드합니다.
RUN ./gradlew clean build --info

# build/libs 폴더에 있는 파일을 app.jar 로 이동합니다.
RUN mv build/libs/security-0.0.1-SNAPSHOT.jar app.jar

# build/libs 폴더 내용 삭제
RUN rm -rf build/libs/*

CMD ["java", "-jar", "app.jar"]