import React, { useEffect, useState, useRef } from "react";
import {
  sendMessageSocket,
  onReceiveMessage,
  joinChat,
} from "../../services/socket";
import default_avt from "../../assets/Image/default_avt.png";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const userId = localStorage.getItem("username"); // Thay 'username' bằng tên thực tế của bạn nếu khác

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
        console.log('Received new message:', newMessage);
        setMessages((prevMessages) => {
          if (!prevMessages.find((msg) => msg._id === newMessage._id)) {
            return [...prevMessages, newMessage];
          }
          return prevMessages;
        });
        scrollToBottom(); // Tự động cuộn xuống dưới cùng khi có tin nhắn mới
      };

    onReceiveMessage(handleNewMessage);
    joinChat();

    const fetchMessages = async (page) => {
      try {
        const response = await fetch(
          `http://localhost:8000/auth/message?page=${page}&limit=30`
        );
        const data = await response.json();
        console.log(data);
        if (data.length === 0) {
          setHasMore(false);
        } else {
          if (page === 1) {
            setMessages(data);
          } else {
            setMessages((prevMessages) => [...data, ...prevMessages]);
          }
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages(page);

    // Cleanup khi component bị unmount
    return () => {
      // Hủy đăng ký sự kiện khi component unmount
      // Ví dụ:
      // offReceiveMessage(handleNewMessage); // Giả sử có phương thức này để hủy đăng ký
    };
  }, [page]);

  const handleSend = async () => {
    if (message.trim() && userId && !isSending) {
      setIsSending(true);
      sendMessageSocket(userId, message);
      setMessage("");
      setIsSending(false);
      scrollToBottom(); // Cuộn xuống dưới cùng khi gửi tin nhắn
      // Force re-render after successful send
      setMessages([...messages]); // Spread operator triggers re-render
    }
  };

  const handleScroll = (e) => {
    if (e.target.scrollTop === 0 && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const messagesContainer = containerRef.current;
    messagesContainer.addEventListener("scroll", handleScroll);

    return () => {
      messagesContainer.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4" ref={containerRef}>
        {messages.map((msg, index) => {
          console.log(
            `Rendering message with avatar URL: ${msg.sender.avatar}`
          );
          return (
            <div
              key={index}
              className={`mb-2 ${
                msg.sender._id === userId
                  ? "flex justify-end"
                  : "flex justify-start"
              }`}>
              <div
                className={`bg-${
                  msg.sender._id === userId ? "blue-100" : "gray-100"
                } p-2 rounded-md flex items-center`}>
                <img
                  src={
                    msg.sender.avatar
                      ? `http://localhost:8000/${msg.sender.avatar}`
                      : default_avt
                  }
                  alt="avatar"
                  className="w-8 h-8 rounded-full mr-2"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = default_avt;
                  }}
                />
                <div>
                  <strong>
                    {msg.sender.lastName} {msg.sender.firstName}(
                    {msg.sender.role}
                    ):{" "}
                  </strong>
                  {msg.message}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex-none bg-white p-4 shadow-md flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          className="flex-grow mr-4 p-2 border border-gray-300 rounded"
          disabled={isSending}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={isSending}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Message;
