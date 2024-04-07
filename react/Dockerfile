FROM node:18-alpine3.17

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json .
COPY package-lock.json .
RUN npm install
CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0" ]