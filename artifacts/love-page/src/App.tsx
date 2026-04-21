import { useState } from "react";

function App() {
  const [naxerClicks, setNaxerClicks] = useState(0);
  const [naxerGone, setNaxerGone] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  const MAX_CLICKS = 6;

  const handleNaxer = () => {
    const next = naxerClicks + 1;
    if (next >= MAX_CLICKS) {
      setNaxerGone(true);
      setShowHeart(true);
    } else {
      setNaxerClicks(next);
    }
  };

  const baleScale = Math.pow(2, naxerClicks);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ff6b9d 0%, #ff8e53 50%, #ffcc70 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "20px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
          borderRadius: "30px",
          padding: "40px",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <div style={{ fontSize: "100px", marginBottom: "10px", lineHeight: 1 }}>
          {showHeart ? "💍" : "🐱‍👤"}
        </div>

        <div style={{ fontSize: "28px", marginBottom: "5px" }}>
          {showHeart ? "😍🌹" : "🙈😅"}
        </div>

        {!showHeart && (
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", marginBottom: "8px" }}>
            {naxerClicks === 0
              ? "Yaar seriously agar na kaha toh..."
              : naxerClicks === 1
              ? "Teri galti hai yeh 🤦"
              : naxerClicks === 2
              ? "Ab tu khud apni problem hai 😤"
              : naxerClicks === 3
              ? "Bhai soch le dobara... 🧐"
              : naxerClicks === 4
              ? "Main nahi maanoonga teri naa! 😠"
              : "Last chance hai yaar!! 😤"}
          </p>
        )}

        <h1
          style={{
            fontSize: "clamp(28px, 6vw, 48px)",
            color: "white",
            textShadow: "2px 2px 10px rgba(0,0,0,0.3)",
            fontWeight: "bold",
            marginBottom: "12px",
            letterSpacing: "1px",
          }}
        >
          Tu Hash Mn Dkay
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "rgba(255,255,255,0.9)",
            marginBottom: "35px",
          }}
        >
          {showHeart
            ? "Mujhe pata tha tu maan jayega! ❤️"
            : "Haan ya nahi? Soch samajh ke jawab de! 😏"}
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <button
            onClick={() => setShowHeart(true)}
            style={{
              padding: "14px 36px",
              fontSize: `${Math.max(16, 16 * baleScale * 0.5)}px`,
              fontWeight: "bold",
              background: "linear-gradient(135deg, #ff4d6d, #c9184a)",
              color: "white",
              border: "none",
              borderRadius: "50px",
              cursor: "pointer",
              transform: `scale(${Math.min(baleScale, 4)})`,
              transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
              boxShadow: "0 6px 20px rgba(255, 77, 109, 0.5)",
              whiteSpace: "nowrap",
            }}
          >
            Bale Bale! 💘
          </button>

          {!naxerGone && (
            <button
              onClick={handleNaxer}
              style={{
                padding: "10px 24px",
                fontSize: "14px",
                fontWeight: "600",
                background: "rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.8)",
                border: "2px solid rgba(255,255,255,0.4)",
                borderRadius: "50px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                backdropFilter: "blur(5px)",
              }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget;
                const x = Math.random() * 200 - 100;
                const y = Math.random() * 100 - 50;
                btn.style.transform = `translate(${x}px, ${y}px)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0,0)";
              }}
            >
              Naxer 🙅
            </button>
          )}

          {showHeart && (
            <div
              style={{
                fontSize: "40px",
                animation: "bounce 0.6s infinite alternate",
              }}
            >
              🎉💕🥳💕🎉
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          from { transform: translateY(0px); }
          to   { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
}

export default App;
