import { useState } from "react";
import "./App.css";
import ChatBot from "./Component/ChatBot";

function App() {
  const [active, setActive] = useState(true);

  return (
    <div className="App">
      Chatbot for E-commerce
      {active ? (
        <ChatBot />
      ) : (
        <div className="chatbot-activated" onClick={() => setActive(true)}>
          {/* <img
            src="https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg"
            alt="chat-bot-img"
          /> */}
        </div>
      )}
    </div>
  );
}

export default App;
