FROM node:19-alpine3.17 AS build
WORKDIR /app/
COPY package*.json /app/
RUN npm i
COPY . /app/

CMD ["sh", "-c", "npm rebuild esbuild && npm install -g vite && npm run dev"]

