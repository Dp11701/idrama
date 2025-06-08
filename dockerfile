FROM node:20

WORKDIR /app

COPY .next/standalone ./
COPY .next/static ./static
COPY public ./public
COPY package.json ./
COPY node_modules ./node_modules

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "server.js"]




