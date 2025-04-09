# Stage 1: Build the Angular application
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli
COPY . .
RUN ng build --configuration production

# Stage 2: Serve the Angular application with Nginx
FROM nginx:alpine
COPY --from=build /TaskEase_FE/dist/frontend/browser /usr/share/nginx/html
# Override the default Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
