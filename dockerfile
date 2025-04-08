# Stage 1: Build the Angular application
FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli # Install Angular CLI globally
COPY . .
RUN ng build --configuration production

# Stage 2: Serve the Angular application with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
EXPOSE 80
