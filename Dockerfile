FROM node

WORKDIR /fastfood-api

COPY . .

RUN npm install

