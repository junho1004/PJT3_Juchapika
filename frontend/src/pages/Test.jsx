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




import React, { useEffect } from 'react';
import io from 'socket.io-client';

const Test = () => {
  useEffect(() => {
    const socket = io('https://your-ec2-server-address:8082'); // HTTPS를 사용한 서버 주소

    socket.on('connect', () => {
      console.log('WebSocket client connected');
    });

    socket.on('message', (message) => {
      console.log('Received message:', message);

      // 받은 메시지 처리 로직
      // ...
    });

    socket.on('disconnect', () => {
      console.log('WebSocket client disconnected');
    });

    socket.on('error', (error) => {
      console.log(error);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <div>React App</div>;
};

export default Test;
