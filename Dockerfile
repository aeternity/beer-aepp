FROM abiosoft/caddy

USER root
EXPOSE 80

ADD ./dist /srv
WORKDIR /srv
