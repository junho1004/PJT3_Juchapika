import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://52.79.199.205:8082'); // 웹소켓 서버 주소

export default function Test() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState(0);

  useEffect(() => {
    socket.on('message', (data) => {
      const { value1, value2 } = JSON.parse(data);
      setValue1(value1);
      setValue2(value2);
    });
    return () => {
      socket.off('message'); // Clean up the event listener when component unmounts
    };
  }, []);

  return (
    <div>
      <h1>WebSocket Receiver Example</h1>
      <p>Value 1: {value1}</p>
      <p>Value 2: {value2}</p>
    </div>
  );
}
