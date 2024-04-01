# https://truesparrow.com/blog/setup-local-development-environment-with-docker-compose/

FROM node:21.4.0 as builder

WORKDIR /src

COPY ./yarn.lock ./yarn.lock
COPY ./package.json ./package.json

RUN yarn install

COPY . /src

CMD ["yarn", "run", "dev"]
