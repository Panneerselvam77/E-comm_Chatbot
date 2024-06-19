import React, { useState } from "react";

export default function ChatBot() {
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState("");

  const handleSubmit = () => {};
  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <img
          src="https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg"
          alt="chat-bot-img"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type your query"
          wrap="soft"
        ></textarea>
        <button type="submit" disabled={input.length === 0}>
          Send
        </button>
      </form>
    </div>
  );
}
