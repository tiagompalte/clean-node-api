FROM node:12-alpine

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm ci --only=production

COPY ./dist ./dist