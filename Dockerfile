# Use the official Node.js image from the Docker Hub
FROM node:latest

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Define the command to run your app
CMD ["node", "index.js"]
