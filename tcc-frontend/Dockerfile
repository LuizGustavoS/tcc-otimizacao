FROM node:20.9.0-alpine3.18 AS build
WORKDIR /dist/src/app

ENV LANG pt_BR.UTF-8
ENV LC_ALL pt_BR.UTF-8

RUN npm cache clean --force
COPY . .

RUN npm install
RUN npm run build --prod

FROM nginx:latest AS ngi

RUN apt-get update
RUN apt-get install -y locales locales-all
ENV LANG pt_BR.UTF-8
ENV LC_ALL pt_BR.UTF-8
ENV LANGUAGE pt_BR.UTF-8

COPY --from=build /dist/src/app/dist/tcc-frontend /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80