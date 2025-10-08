import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarLayout from "../components/NavbarLayout";
import ChatWidget from "../components/ChatWidget"; // ✅ Chatbot widget

// import local images
import wallpaper1 from "../assets/wallpaper1.jpg";
import wallpaper2 from "../assets/wallpaper2.jpeg";
import wallpaper3 from "../assets/wallpaper3.jpg";

export default function Home() {
  const wallpapers = [wallpaper1, wallpaper2, wallpaper3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % wallpapers.length);
    }, 10000);
    return () => clearInterval(id);
  }, [wallpapers.length]);

  return (
    <>
      {/* Fullscreen background */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -999,
          overflow: "hidden",
        }}
      >
        {wallpapers.map((img, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              transition: "opacity 1s ease-in-out, transform 8s linear",
              opacity: i === currentIndex ? 1 : 0,
              transform: i === currentIndex ? "scale(1)" : "scale(1.02)",
              filter: "blur(6px) brightness(0.6)",
            }}
          />
        ))}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.25)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Content */}
      <NavbarLayout>
        <div
          style={{
            minHeight: "calc(100vh - 60px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <div style={{ maxWidth: 900 }}>
            <h1 style={{ fontSize: "2.4rem", fontWeight: 700, marginBottom: 12 }}>
              Welcome to FutureEdge
            </h1>
            <p style={{ fontSize: "1.05rem", marginBottom: 20 }}>
              Find jobs, apply, learn new skills and grow your career with AI-assist.
            </p>

            {/* ✅ Buttons Section */}
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button as={Link} to="/jobs" variant="info">
                Explore Jobs
              </Button>
              <Button as={Link} to="/trainer/learning" variant="success">
                Learning
              </Button>
              <Button as={Link} to="/employer/dashboard" variant="warning">
                Employer
              </Button>

              {/* ✅ New Resume Parser Button (AI Glow) */}
              <Button
                as={Link}
                to="/resume-parse"
                style={{
                  background: "linear-gradient(90deg, #007bff, #00c6ff)",
                  border: "none",
                  color: "#fff",
                  boxShadow: "0 0 10px rgba(0, 198, 255, 0.7)",
                  animation: "glow 2s infinite alternate",
                }}
              >
                🚀 Resume Parser (AI)
              </Button>
            </div>
          </div>
        </div>

        {/* ✅ Floating Chatbot Widget */}
        <ChatWidget iconSrc="/src/assets/Chatbot.png" />
      </NavbarLayout>

      {/* Footer */}
      <footer
        style={{
          width: "100vw",
          padding: "10px 16px",
          background: "rgba(0,0,0,0.7)",
          color: "#fff",
          textAlign: "center",
          position: "fixed",
          bottom: 0,
          left: 0,
          zIndex: 10,
        }}
      >
        © {new Date().getFullYear()} FutureEdge - All rights reserved.
      </footer>

      {/* Inline glowing animation CSS */}
      <style>
        {`
          @keyframes glow {
            from { box-shadow: 0 0 8px rgba(0, 198, 255, 0.4); }
            to { box-shadow: 0 0 20px rgba(0, 198, 255, 1); }
          }
        `}
      </style>
    </>
  );
}
