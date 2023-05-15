# Base image
FROM python:3.9-slim-buster

# Set working directory
WORKDIR /app

# Install required packages
RUN apt-get update && \
    apt-get install -y gcc make libffi-dev libssl-dev

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install asyncio and websockets
RUN pip install asyncio websockets

# Copy application files
COPY app.py .

# Expose the port number
EXPOSE 8083

# Start the WebSocket server
CMD ["python", "app.py"]
