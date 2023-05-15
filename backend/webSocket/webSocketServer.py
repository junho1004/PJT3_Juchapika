import asyncio
import websockets

# Define the global variable
react_server = None


async def handle_message(websocket, path):
    async for message in websocket:
        print(f"Received message: {message}")
        # Send message to React server
        react_server.send(message)


async def start_websocket_server():
    async with websockets.serve(handle_message, "0.0.0.0", 8082):
        await asyncio.Future()  # Run forever


# Define the React server address and port
REACT_SERVER_ADDRESS = "52.79.199.205"
REACT_SERVER_PORT = 80


# Create a WebSocket connection to the React server
async def connect_to_react_server():
    global react_server
    async with websockets.connect(f"ws://{REACT_SERVER_ADDRESS}:{REACT_SERVER_PORT}") as websocket:
        react_server = websocket
        print("Connected to React server")


# Start the WebSocket server and connect to the React server
async def main():
    await asyncio.gather(start_websocket_server(), connect_to_react_server())
    # await asyncio.gather(start_websocket_server())


asyncio.run(main())
