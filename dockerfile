# Step 1: Build the Angular Universal app
FROM node:18 as build

WORKDIR /app

# Copy application files
COPY . .

# Install dependencies
RUN npm install

# Build Angular Universal app
RUN npm run build:ssr

# Step 2: Serve the SSR app using Node.js
FROM node:18

# Copy built Angular Universal app from build stage
COPY --from=build /app/dist/frontend/* /app/dist/frontend

# Install dependencies needed to run SSR app
WORKDIR /app
RUN npm install --only=production

# Expose the port for the app
EXPOSE 4000

# Run the SSR app using Node.js
CMD ["npm", "run", "serve:ssr"]
