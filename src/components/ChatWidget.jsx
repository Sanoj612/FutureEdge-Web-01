// src/components/ChatWidget.jsx
import React, { useEffect, useRef, useState } from "react";
import api from "../api/api"; // axios instance you created earlier
import "./ChatWidget.css";

export default function ChatWidget({ iconSrc = "/chat-icon.png", title = "Chat with FutureEdge" }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]); // {id, sender: 'user'|'bot', text}
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef(null);

  // Auto-scroll when messages change
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, open]);

  const toggleOpen = () => setOpen((v) => !v);

  // send message to backend chatbot endpoint
  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg = { id: Date.now(), sender: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // NOTE: api has baseURL = http://.../api (per your api.js). The final URL becomes /api/chatbot
      const res = await api.post("/chatbot", { message: trimmed });

      // try common response shapes:
      const reply =
        res?.data?.reply ??
        res?.data?.message ??
        (Array.isArray(res?.data?.choices) && res.data.choices[0]?.message?.content) ??
        JSON.stringify(res?.data) ??
        "Sorry, no reply";

      const botMsg = { id: Date.now() + 1, sender: "bot", text: reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chatbot API error:", err);
      const botMsg = { id: Date.now() + 2, sender: "bot", text: "Sorry — the chatbot failed. Try again later." };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) sendMessage(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) sendMessage(input);
    }
  };

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div className="chat-panel" role="dialog" aria-label="Chat with FutureEdge">
          <div className="chat-header">
            <div className="chat-title">{title}</div>
            <button className="chat-close" onClick={toggleOpen} aria-label="Close chat">✕</button>
          </div>

          <div className="chat-messages" ref={messagesRef}>
            {messages.length === 0 && (
              <div className="chat-empty">Hi — how can I help? Ask me about jobs, courses, or resumes.</div>
            )}

            {messages.map((m) => (
              <div key={m.id} className={`chat-message ${m.sender === "user" ? "user" : "bot"}`}>
                <div className="bubble">{m.text}</div>
              </div>
            ))}

            {loading && (
              <div className="chat-message bot">
                <div className="bubble typing">Bot is typing...</div>
              </div>
            )}
          </div>

          <form className="chat-input-area" onSubmit={handleSubmit}>
            <textarea
              className="chat-input"
              placeholder="Type your message and press Enter..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <button className="chat-send" type="submit" aria-label="Send message">Send</button>
          </form>
        </div>
      )}

      {/* Floating button */}
      <button className="chat-fab" onClick={toggleOpen} aria-label="Open chat">
        {iconSrc ? <img src={iconSrc} alt="chat" className="chat-fab-icon" /> : <span>💬</span>}
      </button>
    </>
  );
}
