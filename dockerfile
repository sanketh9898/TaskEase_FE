# Stage 1: Build the Angular app
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG ENV=development
RUN if [ "$ENV" = "production" ]; then npm run build --prod; else npm run build; fi
# Debug: List contents of dist
RUN ls -la /app/dist

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built files from previous stage (assuming outputPath is dist/frontend)
COPY --from=build /app/dist/frontend /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
