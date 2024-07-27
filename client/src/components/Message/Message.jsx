import React, { useEffect, useState, useRef } from "react";
import { sendMessageSocket, onReceiveMessage, joinChat } from "../../services/socket";
import default_avt from "../../assets/Image/default_avt.png";
import { Link } from "react-router-dom";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const userId = localStorage.getItem("username");

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      console.log("Received new message:", newMessage);
      setMessages((prevMessages) => {
        if (!prevMessages.find((msg) => msg._id === newMessage._id)) {
          return [...prevMessages, newMessage];
        }
        return prevMessages;
      });
      scrollToBottom();
    };

    onReceiveMessage(handleNewMessage);
    joinChat();

    const fetchMessages = async (page) => {
      try {
        const response = await fetch(`http://localhost:8000/auth/message?page=${page}&limit=30`);
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

    return () => {
      // Hủy đăng ký sự kiện khi component unmount
    };
  }, [page]);

  const handleSend = async () => {
    if (message.trim() && userId && !isSending) {
      setIsSending(true);
      sendMessageSocket(userId, message);
      setMessage("");
      setIsSending(false);
      scrollToBottom();
      setMessages([...messages]);
    }
  };

  const handleScroll = (e) => {
    if (e.target.scrollTop === 0 && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const messagesContainer = containerRef.current;
    messagesContainer.addEventListener("scroll", handleScroll);

    return () => {
      messagesContainer.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore]);

  return (
    <div className="container rounded-lg shadow bg-white dark:bg-stone-800">
      <div className="flex flex-col h-[calc(100vh-120px)] rounded-lg">
        <div className="flex-1 overflow-y-auto p-4" ref={containerRef}>
          {messages.length === 0 ? (
            <p className="text-center text-stone-500 dark:text-stone-400">
              No messages yet
            </p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`relative flex items-start mb-3 group ${
                  msg.sender._id === userId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-center max-w-xs p-3 rounded-lg ${
                    msg.sender._id === userId
                      ? "bg-sky-100 dark:bg-sky-800 text-right"
                      : "bg-stone-100 dark:bg-stone-700"
                  }`}
                >
                  {msg.sender._id !== userId && (
                    <img
                      src={
                        msg.sender.avatar
                          ? `http://localhost:8000/${msg.sender.avatar}`
                          : default_avt
                      }
                      alt="avatar"
                      className="w-10 h-10 rounded-full mr-2"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = default_avt;
                      }}
                    />
                  )}
                  <div
                    className={`${
                      msg.sender._id === userId ? "text-right" : ""
                    }`}
                  >
                    <p className="font-semibold text-xs text-stone-900 dark:text-white">
                      <Link
                        to={`/profile/${msg.sender._id}`}
                        className="hover:underline"
                      >
                        {msg.sender.lastName} {msg.sender.firstName}
                      </Link>
                    </p>
                    <p className="text-sm text-stone-700 dark:text-white">
                      {msg.message}
                    </p>
                  </div>
                  {msg.sender._id === userId && (
                    <img
                      src={
                        msg.sender.avatar
                          ? `http://localhost:8000/${msg.sender.avatar}`
                          : default_avt
                      }
                      alt="avatar"
                      className="w-10 h-10 rounded-full ml-2"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = default_avt;
                      }}
                    />
                  )}
                </div>
                <div
                  className={`absolute bottom-0 ${
                    msg.sender._id === userId ? "right-0" : "left-0"
                  } p-1 text-xs text-stone-500 dark:text-stone-400 bg-white dark:bg-stone-800 shadow-md rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                >
                  <p className="text-xs">{new Date(msg.timestamp).toLocaleString()}</p>
                  <p className="text-xs">{msg.sender.role}</p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex p-2 items-center bg-stone-100 dark:bg-stone-700 rounded-b-lg">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            className="flex-grow p-2 border rounded-l-lg bg-white dark:border-stone-600 dark:bg-stone-700 dark:text-white"
            placeholder="Type a message..."
            disabled={isSending}
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600"
            disabled={isSending}
          >
            {isSending ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;