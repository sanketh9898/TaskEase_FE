# Stage 1: Build the Angular app
FROM node:18-alpine as build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Build with specific environment (default to dev)
ARG ENV=development
RUN if [ "$ENV" = "production" ]; then npm run build --prod; else npm run build; fi

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built files from previous stage
COPY --from=build /TaskEase_FE/dist/frontend /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
