# Multi-language DSA Lab Docker Image
FROM ubuntu:22.04

# Prevent interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install essential packages
RUN apt-get update && apt-get install -y \
    # C++ toolchain
    g++ \
    clang \
    cmake \
    make \
    # Python
    python3 \
    python3-pip \
    python3-dev \
    # Node.js for JavaScript
    nodejs \
    npm \
    # Utilities
    curl \
    wget \
    git \
    vim \
    # Clean up
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Python packages
RUN pip3 install --no-cache-dir \
    numpy \
    scipy \
    pandas \
    matplotlib

# Create app directory
WORKDIR /app

# Copy server files
COPY server.js package.json ./

# Install Node dependencies
RUN npm install

# Create directories for code execution
RUN mkdir -p /tmp/code-exec

# Expose port
EXPOSE 3000

# Start the execution server
CMD ["node", "server.js"]