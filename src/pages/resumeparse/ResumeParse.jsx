import React, { useState } from "react";
import { parseResume, getUserResumes } from "../../services/resumeService";

export default function ResumeParse() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert("Please enter resume text before submitting!");
      return;
    }

    setLoading(true);
    try {
      const res = await parseResume({ text });
      setResult(res.data.parsed || res.data);
      alert("✅ Resume parsed successfully!");
    } catch (err) {
      console.error("❌ Resume parsing failed:", err);
      alert("Failed to parse resume. Please check your backend connection.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Optional: fetch previous parsed resumes
  const handleFetchMyResumes = async () => {
    try {
      const res = await getUserResumes();
      setResult(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch saved resumes:", err);
      alert("Failed to load your previous resumes.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f8",
        padding: "40px",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "700px",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
          🧠 Resume Parser
        </h2>

        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="10"
            placeholder="Paste your resume text here..."
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              resize: "vertical",
              marginBottom: "20px",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <button
              type="submit"
              disabled={loading}
              style={{
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "10px 18px",
                cursor: "pointer",
              }}
            >
              {loading ? "Parsing..." : "Parse & Save"}
            </button>

            <button
              type="button"
              onClick={handleFetchMyResumes}
              style={{
                background: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "10px 18px",
                cursor: "pointer",
              }}
            >
              My Resumes
            </button>
          </div>
        </form>

        {result && (
          <div
            style={{
              marginTop: "30px",
              background: "#f8f9fa",
              borderRadius: "8px",
              padding: "15px",
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            <h4 style={{ marginBottom: "10px" }}>📝 Parsed Result:</h4>
            <pre
              style={{
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                background: "#fff",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            >
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
