import React, { useEffect, useState } from 'react';

const Test = () => {
  const [packets, setPackets] = useState([]);

  useEffect(() => {
    const client = new window.WebSocket('wss://juchapika.site:8082/');

    client.onopen = () => {
      console.log('WebSocket client connected');
    };

    client.onmessage = (message) => {
      const packet = JSON.parse(message.data);
      console.log('Received packet:', packet);

      // 실시간으로 패킷을 처리하거나 상태를 업데이트합니다.
      setPackets((prevPackets) => [...prevPackets, packet]);
    };

    client.onclose = () => {
      console.log('WebSocket client disconnected');
    };

    client.onerror = (error) => {
      console.log(error);
    };

    return () => {
      client.close();
    };
  }, [client]); // client를 종속성 배열에 추가

  return (
    <div>
      <h1>Real-time Packets</h1>
      {packets.map((packet, index) => (
        <div key={index}>Received packet: {JSON.stringify(packet)}</div>
      ))}
    </div>
  );
};

export default Test;
