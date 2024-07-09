
FROM node:14


WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install


RUN npm install -g nodemon


COPY . .


COPY .env .env


EXPOSE 4600


CMD ["nodemon", "src/index.js"]
