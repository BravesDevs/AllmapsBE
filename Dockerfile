FROM node:21.6-alpine

COPY package.json /app/package.json

WORKDIR /src

RUN rm -rf dist

RUN cd /app && npm install && npm install typescript -g -q

COPY ./ /src

EXPOSE 3000

CMD ["npm", "start"]
