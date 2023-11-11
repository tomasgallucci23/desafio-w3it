# Set Image
FROM node:18

# Set WORKDIR
WORKDIR /app

# Copy Files
COPY package.json package-lock.json tsconfig.json jest.config.js ./

# Install deps
RUN npm install

# Copy source
COPY . ./

# Transpile
RUN npm run build



# Expose port
EXPOSE 3000

# Init app
CMD ["npm", "start"]
