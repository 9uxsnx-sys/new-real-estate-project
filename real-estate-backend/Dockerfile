# VistaHaven Payload CMS Backend Dockerfile
FROM node:20

# Install dependencies for image processing (sharp)
# Using Debian-based node image for better sharp binary compatibility
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Environment variable to auto-accept schema changes
ENV PAYLOAD_ACCEPT_DATA_LOSS=true

# Start command - auto-accept schema migration prompts
CMD ["sh", "-c", "yes | npm run dev"]
