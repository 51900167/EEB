import React, { useEffect, useState } from 'react';
import { sendMessageSocket, onReceiveMessage, joinChat } from '../../services/socket';

const Message = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

    // Lấy thông tin từ localStorage
    const userId = localStorage.getItem('username'); // Thay 'username' bằng tên thực tế của bạn nếu khác

    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        onReceiveMessage(handleNewMessage);
        joinChat();

        // Lấy lịch sử tin nhắn từ phòng chat chung
        const fetchMessages = async () => {
            try {
                const response = await fetch('http://localhost:8000/auth/message');
                const data = await response.json();
                setMessages(data);
                console.log(JSON.stringify(data, null, 3)); // Log object data for debugging
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();

        // Cleanup khi component bị unmount
        return () => {
            // Hủy đăng ký sự kiện nếu cần
            // Ví dụ: socket.off('receiveMessage', handleNewMessage);
        };
    }, []);

    const handleSend = async () => {
        if (message.trim() && userId && !isSending) {  // Đảm bảo userId không phải là null hoặc undefined và không đang gửi tin nhắn
            setIsSending(true);
            sendMessageSocket(userId, message); 
            setMessage('');
            setIsSending(false);
        }
    };

    return (
        <div>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.sender.firstName} {msg.sender.lastName} ({msg.sender.role}): </strong>{msg.message}
                    </div>
                ))}
            </div>
            <input 
                type="text" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSend();
                }}
            />
            <button onClick={handleSend} disabled={isSending}>Send</button>
        </div>
    );
};

export default Message;