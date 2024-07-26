# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:14

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Make the server port available to the world outside this container.
EXPOSE 5001

# Run the web service on container startup.
CMD [ "node", "server.js" ]
