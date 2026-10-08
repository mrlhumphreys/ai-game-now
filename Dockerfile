# https://truesparrow.com/blog/setup-local-development-environment-with-docker-compose/

FROM node:26.10.0 as builder
RUN npm install --global yarn

WORKDIR /app

COPY ./yarn.lock ./yarn.lock
COPY ./package.json ./package.json

RUN yarn install

COPY . /app

CMD ["yarn", "run", "dev"]
