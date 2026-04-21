import { useState, useEffect, useRef } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
}

function Confetti({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#ff4d6d", "#ff8e53", "#ffcc70", "#ff6b9d", "#c9184a", "#fff"];
    particlesRef.current = Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: -20,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 5,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 6,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
        ctx.restore();
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.vy += 0.05;
      });
      particlesRef.current = particlesRef.current.filter((p) => p.y < canvas.height + 30);
      if (particlesRef.current.length > 0) {
        animRef.current = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}

function CelebrationPopup({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(135deg, #fff0f5, #fff8f0)",
          borderRadius: "30px",
          padding: "50px 40px",
          textAlign: "center",
          boxShadow: "0 30px 80px rgba(255, 77, 109, 0.4)",
          maxWidth: "380px",
          width: "90%",
          animation: "popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <div style={{ fontSize: "70px", marginBottom: "10px", lineHeight: 1 }}>
          💍
        </div>
        <div style={{ fontSize: "36px", marginBottom: "12px" }}>
          🎉 Yaaaay! 🎉
        </div>
        <h2
          style={{
            fontSize: "26px",
            fontWeight: "bold",
            color: "#c9184a",
            marginBottom: "28px",
          }}
        >
          Ne as zanm bas toya znxe o dene o pise
        </h2>
        <button
          onClick={onClose}
          style={{
            padding: "12px 32px",
            fontSize: "16px",
            fontWeight: "bold",
            background: "linear-gradient(135deg, #ff4d6d, #c9184a)",
            color: "white",
            border: "none",
            borderRadius: "50px",
            cursor: "pointer",
            boxShadow: "0 6px 20px rgba(255, 77, 109, 0.4)",
          }}
        >
          Awww 🥰
        </button>
      </div>

      <style>{`
        @keyframes popIn {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function App() {
  const [naxerClicks, setNaxerClicks] = useState(0);
  const [naxerGone, setNaxerGone] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);

  const MAX_CLICKS = 6;

  const handleNaxer = () => {
    const next = naxerClicks + 1;
    if (next >= MAX_CLICKS) {
      setNaxerGone(true);
    } else {
      setNaxerClicks(next);
    }
  };

  const handleBale = () => {
    setShowPopup(true);
    setConfettiActive(true);
    setTimeout(() => setConfettiActive(false), 4000);
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
      <Confetti active={confettiActive} />

      {showPopup && <CelebrationPopup onClose={() => setShowPopup(false)} />}

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
          🐱‍👤
        </div>

        <div style={{ fontSize: "28px", marginBottom: "16px" }}>
          🙈😅
        </div>

        <h1
          style={{
            fontSize: "clamp(28px, 6vw, 48px)",
            color: "white",
            textShadow: "2px 2px 10px rgba(0,0,0,0.3)",
            fontWeight: "bold",
            marginBottom: "35px",
            letterSpacing: "1px",
          }}
        >
          Tu Hash Mn Dkay
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <button
            onClick={handleBale}
            style={{
              padding: "14px 36px",
              fontSize: "18px",
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
                backdropFilter: "blur(5px)",
              }}
            >
              Naxer 🙅
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
