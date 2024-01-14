FROM node:16

WORKDIR /usr/src/mailservice

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5002  

CMD ["npm", "start"]
