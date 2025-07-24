# Use a minimal Node image
FROM node:22-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the source
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the API server
CMD ["node", "src/server.js"]
