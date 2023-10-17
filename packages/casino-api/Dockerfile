FROM node:20-slim

WORKDIR /packages/casino-api

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

RUN apt-get update -y && apt-get install -y openssl

RUN npm run db:client

EXPOSE 3000

ENTRYPOINT npm run start
