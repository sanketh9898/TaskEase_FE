# Use Node 18 image as base
FROM node:18 as build

WORKDIR /app

# Copy application files
COPY . .

# Install dependencies
RUN npm install

# Build the Angular app using the --configuration production flag
RUN npm run build --configuration production

# Use Nginx to serve the built app
FROM nginx:alpine

# Copy built files to Nginx directory
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Expose port 80 for the app
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
