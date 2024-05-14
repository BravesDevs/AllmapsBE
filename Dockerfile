FROM node:21.6-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g typescript

RUN npm install --save-dev @types/node @types/express

COPY . .

RUN rm -rf dist

RUN tsc

EXPOSE 3000

CMD ["npm", "start"]
