import io from 'socket.io-client';

const socket = io('http://localhost:8000'); // Đảm bảo endpoint đúng

export const joinChat = () => {
    socket.emit('joinChat');
};

export const sendMessageSocket = (sender, message) => {
    console.log('Sending message:', { sender, message });
    socket.emit('sendMessage', { sender, message });
};

export const onReceiveMessage = (callback) => {
    socket.on('receiveMessage', callback);
};

export const onLoadMessages = (callback) => {
    socket.on('loadMessages', callback);
};