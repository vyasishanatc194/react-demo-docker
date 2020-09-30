# Build frontend
FROM node:12.9-slim as builder

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --silent
COPY . ./
RUN npm run build


# Server
FROM nginx:1.17.0-alpine
WORKDIR /usr/src/app
ADD nginx_config /etc/nginx/conf.d/default.conf
ADD ./.htpasswd_rbm /etc/nginx/.htpasswd_rbm
COPY --from=builder /usr/src/app/build ./build
