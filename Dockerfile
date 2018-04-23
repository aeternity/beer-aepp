FROM node:9.8.0

USER root
EXPOSE 3000

ADD . /app
WORKDIR /app

CMD yarn start
