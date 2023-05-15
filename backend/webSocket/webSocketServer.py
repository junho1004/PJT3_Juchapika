import asyncio
import websockets
import ssl

# Define the global variable
react_server = None


async def handle_message(websocket, path):
    async for message in websocket:
        print(f"Received message: {message}")
        # Send message to React server
        react_server.send(message)


async def start_websocket_server():
    ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    ssl_context.load_cert_chain("/etc/nginx/certs/fullchain.pem", "/etc/nginx/certs/privkey.pem")

    async with websockets.serve(handle_message, "0.0.0.0", 443, ssl=ssl_context):
        await asyncio.Future()  # Run forever


# Define the React server address and port
REACT_SERVER_ADDRESS = "52.79.199.205"
REACT_SERVER_PORT = 443


# Create a WebSocket connection to the React server
async def connect_to_react_server():
    global react_server
    ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
    ssl_context.check_hostname = False
    ssl_context.verify_mode = ssl.CERT_NONE

    async with websockets.connect(f"wss://{REACT_SERVER_ADDRESS}:{REACT_SERVER_PORT}", ssl=ssl_context) as websocket:
        react_server = websocket
        print("Connected to React server")


# Start the WebSocket server and connect to the React server
async def main():
    await asyncio.gather(start_websocket_server(), connect_to_react_server())


asyncio.run(main())
