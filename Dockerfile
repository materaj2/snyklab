FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Copy app and install dependencies
COPY package.json ./
RUN npm install

# Bundle app source
COPY app.js ./

# Expose port
EXPOSE 3000

# Start the application
CMD [ "node", "app.js" ]
