import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io.connect("http://localhost:8000");

function App() {
  const [message, setMessage] = useState("");
  const [recievedMessage, setrecievedMessage] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", { message });
  };
  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setrecievedMessage(data);
    });
  }, [socket]);
  return (
    <div className="chat-container">
      <div className="chat-box">
        <input
          className="message-input"
          placeholder="Type your message ..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
        <p className="message-display">Message: {recievedMessage}</p>
      </div>
    </div>
  );
}

export default App;
