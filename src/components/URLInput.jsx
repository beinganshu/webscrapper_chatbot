import React, { useState } from "react";
import axios from "axios";

const URLInput = ({ onScrapeComplete }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleScrape = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:8000/scrape", { url });
      onScrapeComplete();
    } catch (err) {
      alert("Scraping failed. Check console.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <label style={styles.label}>Enter Website URL</label>
      <div style={styles.inputGroup}>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          style={styles.input}
        />
        <button onClick={handleScrape} disabled={loading} style={styles.button}>
          {loading ? "Scraping..." : "Scrape"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  label: {
    fontWeight: 600,
    fontSize: "16px",
    marginBottom: "10px",
    display: "block",
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
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default URLInput;
