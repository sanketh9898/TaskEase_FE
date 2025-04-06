# Build stage
FROM node:18-alpine as build

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app
RUN npm run build

# Production stage
FROM nginx:alpine

# Install Node.js and npm
RUN apk add --no-cache nodejs npm

# Install http-server globally
RUN npm install -g http-server

# Copy the built Angular app to the nginx container
# Ensure the path to the dist directory is correct, e.g., /app/dist/<your-app-name>/
COPY --from=build TaskEase_FE/dist/frontend/* /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]
