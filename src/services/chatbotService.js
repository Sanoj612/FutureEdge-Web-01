// src/services/chatbotService.js
import api from "../api/api";
export const askChatbot = (message) => api.post("/api/chatbot/chat", { message });
