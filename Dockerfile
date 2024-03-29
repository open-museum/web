FROM node:16

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD npm exec svelte-kit preview --host
