// src/pages/chatbot/Chatbot.jsx
import React, { useState } from "react";
// FIX: Use TWO dots (../../) to go up to src/ and find the services folder
import { askChatbot } from "../../services/chatbotService"; 

export default function Chatbot() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");

  const send = async () => {
    try {
      const res = await askChatbot(msg);
      setReply(res.data.reply || res.data.answer);
    } catch (err) {
      console.error(err);
      alert("Chatbot error");
    }
  };

  return (
    <div>
      <h3>FutureEdge Assistant</h3>
      <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={4} cols={60} />
      <br />
      <button onClick={send}>Ask</button>

      {reply && (
        <div>
          <h4>Reply</h4>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
}