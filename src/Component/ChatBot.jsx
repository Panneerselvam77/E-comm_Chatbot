import React, { useEffect, useState } from "react";
import { inputIntents, model } from "../Training Data/Data";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedIntent, setSelectedIntent] = useState("");

  useEffect(() => {
    // Initial greeting message from the bot
    setMessages([
      { author: "bot", text: "Hello! How can I assist you today?" },
    ]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prevMessages) => [
      ...prevMessages,
      { author: "user", text: input },
    ]);
    setTimeout(() => {
      processInput(input);
    }, 1000);
    setInput("");
  };

  function normalizeString(input) {
    return input.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
  }

  const generateResponse = (intent) => {
    if (model.responses && model.responses[intent]) {
      const responses = model.responses[intent];
      const randomIndex = Math.floor(Math.random() * responses.length);
      return responses[randomIndex].answer;
    }
    return "I am sorry, I don't understand. Can you rephrase the question?";
  };

  const proceedResponse = () => {
    switch (selectedIntent) {
      case "orderTracking":
        return "Your order has been delivered.";
      case "shippingInformation":
        return "Your order has been shipped. It will be delivered in 3 days.";
      default:
        return "";
    }
  };
  const processInput = (input) => {
    const normalizedString = normalizeString(input);
    if (selectedIntent) {
      const response = proceedResponse();
      setMessages((prevMessages) => [
        ...prevMessages,
        { author: "bot", text: response },
      ]);
      setSelectedIntent(""); // Reset after responding
      return;
    }
    const intent = matchIntent(normalizedString);
    if (intent) {
      const response = generateResponse(intent);
      setMessages((prevMessages) => [
        ...prevMessages,
        { author: "bot", text: response },
      ]);
      if (inputIntents.includes(intent)) {
        setSelectedIntent(intent); // Set intent for follow-up responses
      }
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          author: "bot",
          text: "I am sorry, I don't understand. Can you rephrase the question?",
        },
      ]);
    }
  };

  const arrayIncludesString = (arr, string) => {
    return arr.some((word) => string.includes(word));
  };

  const matchIntent = (input) => {
    for (const [intent, patterns] of Object.entries(model.intents)) {
      if (arrayIncludesString(patterns, input)) {
        return intent;
      }
    }
    return null;
  };
  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <img
          src="https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg"
          alt="chat-bot-img"
        />
      </div>
      <div className="messages">
        {messages.map((message, index) => (
          <div
            key={message.text + index}
            className={`message ${message.author}`}
          >
            {message.text}
          </div>
        ))}
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
