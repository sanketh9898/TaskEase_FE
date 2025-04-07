# Option 2: With Nginx (Recommended for production)

 FROM node:18-alpine

 WORKDIR /TaskEase_FE

 COPY package*.json ./

 RUN npm install

 COPY . .

 RUN npm run build -- --prod

 FROM nginx:alpine

 COPY --from=0 /TaskEase_FE/dist/frontend /usr/share/nginx/html

 EXPOSE 80

 CMD ["nginx", "-g", "daemon off;"]
