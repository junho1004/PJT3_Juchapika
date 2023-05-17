import asyncio
import websockets
import ssl
import pathlib
import requests

ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ssl_context.load_cert_chain(
    pathlib.Path('/path/to/container/fullchain.pem'),
    pathlib.Path('/path/to/container/privkey.pem')
)


# , ssl=ssl_context

async def handle_message(websocket, path):
    async for message in websocket:
        print(f"Received message: {message}")
        # Process the received message as needed
        # ...

        # Send the received message to the React server
        await send_message_to_react_server(message)


async def start_websocket_server():
    async with websockets.serve(handle_message, "0.0.0.0", 8082, ssl=ssl_context):
        print("WebSocket server started")
        await asyncio.Future()  # Run forever


async def send_message_to_react_server(message):
    async with websockets.connect('wss://juchapika.site:8082/test') as ws:
        await ws.send(message)
        print('Message sent to React server successfully')


async def main():
    await start_websocket_server()


asyncio.run(main())

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
#     server = await start_websocket_server()
#
#     # Enable CORS
#     async def set_cors_headers(request):
#         request_headers = request.headers
#         origin = request_headers.get("Origin", "")
#         if origin == "https://juchapika.site":
#             response_headers = [
#                 ("Access-Control-Allow-Origin", origin),
#                 ("Access-Control-Allow-Methods", "GET, POST, OPTIONS"),
#                 ("Access-Control-Allow-Headers", "Content-Type"),
#                 ("Access-Control-Max-Age", "3600"),
#             ]
#             return response_headers
#
#     server.start_server = websockets.serve(
#         server._run, server.host, server.port, klass=server.klass, create_protocol=server.create_protocol, process_request=set_cors_headers
#     )
#     await server.wait_closed()
#
#
# asyncio.run(main())
#
