# Step 1: Build Angular app
FROM node:18-alpine AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Step 2: Serve the app using http-server
FROM node:18-alpine

WORKDIR /app
RUN npm install -g http-server

# Copy built Angular app from previous stage
COPY --from=build /TaskEase_FE/dist/* /app/

# Expose port 8080
EXPOSE 8080

# Run the static server
CMD ["http-server", "/app", "-p", "8080"]
