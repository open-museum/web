FROM node:12

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run export

EXPOSE 5000

CMD npx serve __sapper__/export
