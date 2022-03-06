FROM node:12

WORKDIR /usr/src/clean-node-api

COPY ./package.json .
COPY ./package-lock.json .

RUN npm ci --only=production

COPY ./dist ./dist