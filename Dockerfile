FROM node:14-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

# Install system dependencies
RUN apk add --no-cache postgresql-client

# Install application dependencies
COPY package*.json ./
RUN yarn install

# Copy application code
COPY . .

# Build the application
RUN yarn build

# Set environment variables for PostgreSQL connection
ENV POSTGRES_HOST=localhost
ENV POSTGRES_PORT=5432
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=root
ENV POSTGRES_DB=sportclub_db

# Expose the application port
EXPOSE 3000

# Start the application
RUN yarn start
