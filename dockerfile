# Stage 1: Build Angular app
FROM node:20-alpine AS build
WORKDIR /TaskEase_FE
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli
COPY . .
RUN ng build --configuration production

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /TaskEase_FE/dist/frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
