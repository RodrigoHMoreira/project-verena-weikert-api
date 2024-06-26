# Use the official Node.js image with TypeScript support as a parent image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Update npm to the latest version (optional, if needed)
RUN npm install -g npm@latest

# Install Prisma separately if needed
RUN npm install prisma --no-save

# Install npm dependencies including devDependencies
RUN npm install --production=false

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
