# Step 1: Use Node.js official image
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of your app's files
COPY . .

# Build the Angular app for production
RUN npm run build --prod

# Step 2: Use Nginx to serve the built Angular app
FROM nginx:alpine

# Copy the build output from the previous step to Nginx's public directory
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Expose port 80 for the container
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
