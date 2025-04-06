# Stage 1: Build the Angular app
FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Run the Angular build
RUN npm run build --configuration production

# Stage 2: Serve the app with http-server
FROM nginx:alpine

# Install http-server
RUN npm install -g http-server

# Copy the build output from the build stage
COPY --from=build /TaskEase_FE/dist/* /usr/share/nginx/html/

# Expose port 8080
EXPOSE 8080

CMD ["http-server", "/usr/share/nginx/html", "--port", "8080"]
