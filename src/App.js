import React, { useState } from "react";
import URLInput from "./components/URLInput";
import QuestionForm from "./components/QuestionForm";
import videoSource from "./bg_video_1.mp4";

const App = () => {
  const [scraped, setScraped] = useState(false);

  return (
    <div style={styles.wrapper}>
      {/* 🔁 Background Video */}
      <video autoPlay loop muted playsInline style={styles.bgVideo}>
        <source src={videoSource} type="video/mp4" />
      </video>

      {/* 🔲 Content Overlay */}
      <div style={styles.overlay}>
        <h1 style={styles.heading}>🌐 Agentic RAG Web Scraper</h1>
        <p style={styles.subtext}>
          Enter a website to extract knowledge and chat with it.
        </p>
        <div style={styles.card}>
          <URLInput onScrapeComplete={() => setScraped(true)} />
          {scraped && <QuestionForm />}
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
  position: "relative",
  minHeight: "100vh",             // ✅ Let content expand
  width: "100%",
  overflowX: "hidden",            // ✅ Only hide horizontal scroll
  fontFamily: "Segoe UI, sans-serif",
},
  bgVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    objectFit: "cover",
    width: "100%",
    height: "100%",
    zIndex: -1,
    filter: "contrast(1.3) saturate(0.7) brightness(1.4)",
  },
  overlay: {
  position: "relative",
  zIndex: 2,
  color: "white",
  padding: "40px",
  background: "rgba(47, 45, 45, 0.4)",
  minHeight: "100vh",             // ✅ Ensure it fills at least full screen
},
  heading: {
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "10px",
  },
  subtext: {
    textAlign: "center",
    color: "#ccc",
    fontSize: "16px",
    marginBottom: "30px",
  },
  card: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "30px",
    background: "rgba(90, 85, 85, 0.1)",
    borderRadius: "12px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 30px rgba(255, 255, 255, 0.2)",
  },
};

export default App;
