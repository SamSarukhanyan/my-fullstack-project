import React, { useEffect, useState } from 'react';
import './index.css'

const WebSocketClient = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Подключение к WebSocket серверу
    const socket = new WebSocket('ws://127.0.0.1:4600/');

    // Обработчик открытия соединения
    socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    // Обработчик получения сообщений
    socket.onmessage = (event) => {
      console.log('Message from server:', event.data);
      setMessage(event.data);
    };

    // Обработчик закрытия соединения
    socket.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    // Обработчик ошибок
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Чистка при размонтировании компонента
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className='websocket'>
      <p>WebSocket Client</p>
      {"-"}
      <p>Message from server: {message}</p>
    </div>
  );
};

export default WebSocketClient;
