// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// //#
// const socket = io('https://juchapika.site:8082'); // 웹소켓 서버 주소

// export default function Test() {
//   const [value1, setValue1] = useState('');
//   const [value2, setValue2] = useState(0);

//   useEffect(() => {
//     socket.on('message', (data) => {
//       const { battery, time } = JSON.parse(data); // 메시지 파싱
//       setValue1(battery); // value1 상태 변수에 battery 값을 할당
//       setValue2(time); // value2 상태 변수에 time 값을 할당
//     });
//     return () => {
//       socket.off('message'); // 컴포넌트 언마운트 시 이벤트 리스너 정리
//     };
//   }, []);
  

//   return (
//     <div>
//       <h1>WebSocket Receiver Example</h1>
//       <p>- battery: {value1}</p>
//       <p>- time: {value2}</p>
//     </div>
//   );
// }

const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const port = 8000;

app.use(express.json());

app.ws('/ws', (ws, req) => {
  ws.on('message', (message) => {
    console.log('Packet received from WebSocket:', message);

    // Process the received packet as needed
    // ...

    sendResponseToWebSocket(ws); // Send a response back to the WebSocket client
  });
});

app.post('/test', (req, res) => {
  const packet = req.body.message;
  console.log('Packet received from WebSocket:', packet);

  // Process the received packet as needed
  // ...

  res.sendStatus(200); // Send a response back to the WebSocket server
});

app.listen(port, () => {
  console.log(`React server listening at http://localhost:${port}`);
});

function sendResponseToWebSocket(ws) {
  // Send a response to the WebSocket client
  const response = 'Response from React server';
  ws.send(response);
}
