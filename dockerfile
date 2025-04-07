FROM node:18-alpine

WORKDIR /TaskEase_FE

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build -- --configuration production --ssr

EXPOSE 4000

CMD ["node", "dist/frontend/server/main.js"]
