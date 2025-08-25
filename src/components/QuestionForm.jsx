import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const QuestionForm = () => {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input };
    setChatLog((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await axios.post("https://anxhu2004-agentic-rag-backend.hf.space/ask", {
        question: input,
      });
      const botMessage = { type: "bot", text: res.data.answer };
      setChatLog((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = { type: "bot", text: "❌ Failed to fetch response" };
      setChatLog((prev) => [...prev, errorMessage]);
      console.error(err);
    }

    setInput("");
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      handleSend();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  return (
    <div style={styles.container}>
      <label style={styles.label}>Chat with AI</label>
      <div style={styles.chatBox}>
        {chatLog.map((msg, idx) => (
          <div
            key={idx}
            style={msg.type === "user" ? styles.userMsg : styles.botMsg}
          >
            {msg.type === "user" ? "🧠 You: " : "🤖 AI: "}
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div style={styles.inputGroup}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          style={styles.input}
        />
        <button onClick={handleSend} disabled={loading} style={styles.button}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: "30px",
    maxWidth: "800px",
    marginInline: "auto",
  },
  label: {
    fontWeight: 600,
    fontSize: "16px",
    marginBottom: "10px",
    display: "block",
    color: "#ffffff",
  },
  chatBox: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    padding: "20px",
    borderRadius: "10px",
    maxHeight: "400px",
    overflowY: "auto",
    marginBottom: "20px",
    color: "#fff",
    fontSize: "15px",
  },
  userMsg: {
    textAlign: "right",
    marginBottom: "12px",
    padding: "10px",
    backgroundColor: "#007bff33",
    borderRadius: "8px",
  },
  botMsg: {
    textAlign: "left",
    marginBottom: "12px",
    padding: "10px",
    backgroundColor: "#28a74533",
    borderRadius: "8px",
  },
  inputGroup: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
  },
  button: {
    padding: "10px 16px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default QuestionForm;
