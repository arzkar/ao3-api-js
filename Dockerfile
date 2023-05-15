FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install app dependencies
RUN npm install

# Bundle app source code
COPY . .

# Expose port 8080 (assuming your application listens on this port)
EXPOSE 8080

# Start the application
CMD ["npm", "run", "deploy"]
