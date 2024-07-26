# Build stage
FROM node:14 AS build

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from build stage.
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose the port nginx is reachable on
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
