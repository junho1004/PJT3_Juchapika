# import asyncio
# import websockets
# import ssl
# import pathlib
#
#
# ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
# ssl_context.load_cert_chain(
#     pathlib.Path('/path/to/container/fullchain.pem'),
#     pathlib.Path('/path/to/container/privkey.pem')
# )
# # , ssl=ssl_context
#
# async def handle_message(websocket, path):
#     async for message in websocket:
#         print(f"Received message: {message}")
#         # Process the received message as needed
#         # ...
#
#
# async def start_websocket_server():
#     async with websockets.serve(handle_message, "0.0.0.0", 8082, ssl=ssl_context):
#         print("WebSocket server started")
#         await asyncio.Future()  # Run forever
#
#
# async def main():
#     await start_websocket_server()
#
#
# asyncio.run(main())

import asyncio
import websockets
import ssl
import pathlib

ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ssl_context.load_cert_chain(
    pathlib.Path('/path/to/container/fullchain.pem'),
    pathlib.Path('/path/to/container/privkey.pem')
)


async def handle_message(websocket, path):
    async for message in websocket:
        print(f"Received message: {message}")
        # Process the received message as needed
        # ...


async def process_request(path, request_headers):
    # Allow requests from the specified origin
    origin = request_headers.get("Origin", "")
    if origin != "https://juchapika.site":
        return

    # Allow the Upgrade header for WebSocket handshake
    if "Upgrade" not in request_headers:
        return

    # Add the necessary CORS headers
    headers = [
        ("Access-Control-Allow-Origin", "https://juchapika.site"),
        ("Access-Control-Allow-Headers", "Upgrade, Origin, Content-Type, Accept"),
        ("Access-Control-Allow-Methods", "GET, POST, OPTIONS"),
        ("Access-Control-Allow-Credentials", "true"),
    ]

    return headers


async def start_websocket_server():
    async with websockets.serve(
            handle_message,
            "0.0.0.0",
            8082,
            ssl=ssl_context,
            process_request=process_request,
    ):
        print("WebSocket server started")
        await asyncio.Future()  # Run forever


async def main():
    await start_websocket_server()


asyncio.run(main())
