FROM node:16

WORKDIR /usr/src/client/officer-app

COPY ./Client/officer-app/package*.json ./

RUN npm install

COPY ./Client/officer-app/. ./

EXPOSE 3001

CMD ["npm", "start"]
