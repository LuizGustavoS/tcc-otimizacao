FROM node:20.9.0-alpine3.18 AS build
WORKDIR /dist/src/app

RUN npm cache clean --force
COPY . .

RUN npm install
RUN npm run build --prod

FROM nginx:latest AS ngi

COPY --from=build /dist/src/app/dist/tcc-frontend /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80