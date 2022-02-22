FROM openjdk:11-jre-slim-buster
ENV APP_HOME=/usr/java/app
WORKDIR $APP_HOME
COPY target/AD-Project*.jar $APP_HOME/app.jar
COPY python-requirements.txt $APP_HOME/python-requirements.txt
EXPOSE 8080
ENV PYTHONBUFFERED=1
ENV SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/spring_finance?useSSL=false&serverTimezone=GMT&allowPublicKeyRetrieval=true&createDatabaseIfNotExist=true
RUN apt-get update && \
    apt-get -y install python3 python3-pip gcc g++ build-essential && \
    pip3 install --no-cache -r python-requirements.txt && \
    apt-get remove -y python3-pip gcc g++ build-essential && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /tmp/*
ENTRYPOINT ["java", "-jar", "app.jar"]
