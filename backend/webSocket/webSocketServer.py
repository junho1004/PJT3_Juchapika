import asyncio
import websockets

# Define the global variable
react_server = None


async def handle_message(websocket, path):
    async for message in websocket:
        print(f"Received message: {message}")
        # Send message to WebSocket server
        await react_server.send(message)


async def start_websocket_server():
    async with websockets.serve(handle_message, "0.0.0.0", 8082):
        await asyncio.Future()  # Run forever


# Define the WebSocket server address and port
WEBSOCKET_SERVER_ADDRESS = "52.79.199.205"
WEBSOCKET_SERVER_PORT = 8082


# Create a WebSocket connection to the WebSocket server
async def connect_to_websocket_server():
    global react_server
    async with websockets.connect(f"wss://{WEBSOCKET_SERVER_ADDRESS}:{WEBSOCKET_SERVER_PORT}") as websocket:
        react_server = websocket
        print("Connected to WebSocket server")

#
# Start the WebSocket server and connect to the WebSocket server
async def main():
    await asyncio.gather(start_websocket_server(), connect_to_websocket_server())


asyncio.run(main())
