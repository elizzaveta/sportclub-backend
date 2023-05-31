FROM node:16-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

# Install system dependencies
RUN apk add --no-cache postgresql-client

RUN rm -f package-lock.json

# Install application dependencies
COPY package*.json ./
RUN yarn install --production

# Copy application code
COPY . .

# Build the application
RUN yarn build

# Set environment variables for PostgreSQL connection
ENV POSTGRES_HOST=dpg-chrl5gbhp8ud4n7gcdgg-a
ENV POSTGRES_PORT=5432
ENV POSTGRES_USER=postgres_user
ENV POSTGRES_PASSWORD=3VnVrtLHGDQjDijl3GFEXkL8wsGqdKcR
ENV POSTGRES_DB=sportclub_db

# Expose the application port
EXPOSE 3000

# Start the application
RUN yarn start
