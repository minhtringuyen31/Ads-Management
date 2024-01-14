FROM node:16

WORKDIR /usr/src/client/citizens-app

COPY ./Client/citizens-app/package*.json ./

RUN npm install

COPY ./Client/citizens-app/. ./

EXPOSE 3000

CMD ["npm", "run dev"]
