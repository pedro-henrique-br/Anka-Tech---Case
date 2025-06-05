 
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3333

CMD ["npx", "ts-node-dev", "--respawn", "src/server.ts"]
