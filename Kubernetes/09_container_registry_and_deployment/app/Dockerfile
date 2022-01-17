FROM node:16-alpine as build

WORKDIR /usr/src/app/
COPY package*.json ./
RUN npm install

COPY app.js ./

EXPOSE 8081
CMD ["npm", "start"]