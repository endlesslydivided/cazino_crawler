FROM node:20-slim

WORKDIR /packages/casino-api

COPY package*.json .

RUN npm ci

COPY . .

COPY ./dist ./dist

RUN apt-get update -y && apt-get install -y openssl

RUN npm run db:client

ENTRYPOINT npm run start
