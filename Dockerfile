FROM node:alpine

RUN npm i -g pnpm

COPY ./package.json ./

COPY ./pnpm-lock.yaml ./

RUN pnpm i

COPY ../../ .

RUN pnpm run build:frontend

RUN pnpm run build:server

ENTRYPOINT  ["node", "build-server/server.cjs"]