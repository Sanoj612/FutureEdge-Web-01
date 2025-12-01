import React, { useState } from 'react';

const faqs = [
  { q: 'How to apply?', a: 'Open a job, click Apply. Your profile and resume will be sent to the employer.' },
  { q: 'How to upload resume?', a: 'Go to Job Seeker Dashboard > Upload Resume.' },
  { q: 'How to post jobs?', a: 'Login as Employer and create a new job in your dashboard.' }
];

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ from: 'bot', text: 'Hi! Ask me about using FutureEdge.' }]);

  const onSend = () => {
    const text = input.trim();
    if (!text) return;
    const match = faqs.find((f) => text.toLowerCase().includes(f.q.split('?')[0].toLowerCase()));
    const reply = match ? match.a : "Sorry, I can help with basic FAQs only.";
    setMessages((m) => [...m, { from: 'user', text }, { from: 'bot', text: reply }]);
    setInput('');
  };

  if (!open) return (
    <button onClick={() => setOpen(true)} className="fixed right-6 bottom-6 btn btn-gradient rounded-full shadow-lg">Help</button>
  );

  return (
    <div className="fixed right-6 bottom-6 w-80 card">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <div className="font-semibold">FAQ Bot</div>
        <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
      </div>
      <div className="p-3 max-h-64 overflow-y-auto space-y-2">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <span className={`px-3 py-2 rounded-lg text-sm ${m.from === 'user' ? 'bg-primary-50 text-primary-900' : 'bg-gray-100 text-gray-800'}`}>{m.text}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2 p-3 border-t border-gray-100">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a question..." className="input flex-1" />
        <button onClick={onSend} className="btn btn-primary">Send</button>
      </div>
    </div>
  );
}
