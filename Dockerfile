# Use the official Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --omit=dev 

COPY .next .next
COPY public public

# Build the Next.js app
# RUN npm run build

# Expose port 3003
EXPOSE 3003

# Start the application
CMD ["npm", "start"]
