// components/HeroSection.js
import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const canvasRef = useRef(null);

  // Subtle particle animation on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${p.opacity})`;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <header className="hero">
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="hero-content">
        <div className="eyebrow">✦ RESTRICTED ACCESS ✦</div>
        <h1 className="logo">THE VAULT</h1>
        <div className="divider-line" />
        <p className="tagline">Premium content. Pay once. No accounts.<br />No traces. Instant access.</p>
        <a href="#content" className="cta-btn">
          <span>VIEW LOCKED CONTENT</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </a>
      </div>
      <div className="hero-bottom-bar">
        <span>🔒 STRIPE SECURED</span>
        <span>⚡ INSTANT ACCESS</span>
        <span>👤 ANONYMOUS</span>
        <span>🌍 WORLDWIDE</span>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
          border-bottom: 1px solid var(--border);
        }
        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 70%);
        }
        .hero-canvas {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          pointer-events: none;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          padding: 2rem;
          animation: fadeInUp 1.2s ease both;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.4em;
          color: var(--gold);
          margin-bottom: 1.5rem;
          opacity: 0.8;
          animation: fadeInUp 1.2s ease 0.1s both;
        }
        .logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(5rem, 15vw, 11rem);
          letter-spacing: 0.12em;
          line-height: 0.9;
          color: var(--white);
          text-shadow: 0 0 80px rgba(201,168,76,0.15);
          animation: fadeInUp 1.2s ease 0.2s both;
        }
        .divider-line {
          width: 80px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          margin: 1.5rem auto;
          animation: fadeInUp 1.2s ease 0.3s both;
        }
        .tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1rem, 2.5vw, 1.3rem);
          font-style: italic;
          color: var(--white-dim);
          margin-bottom: 2.5rem;
          letter-spacing: 0.02em;
          animation: fadeInUp 1.2s ease 0.4s both;
        }
        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          letter-spacing: 0.2em;
          color: var(--black);
          background: var(--gold);
          padding: 1rem 2.5rem;
          border: none;
          text-decoration: none;
          transition: all 0.3s ease;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          animation: fadeInUp 1.2s ease 0.5s both;
        }
        .cta-btn:hover {
          background: var(--gold-light);
          color: var(--black);
          transform: translateY(-2px);
          box-shadow: 0 10px 40px rgba(201,168,76,0.3);
        }
        .hero-bottom-bar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          display: flex;
          justify-content: center;
          gap: 3rem;
          padding: 1rem 2rem;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(10px);
          border-top: 1px solid var(--border);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          color: var(--white-dim);
          z-index: 2;
        }
        @media (max-width: 600px) {
          .hero-bottom-bar { gap: 1rem; font-size: 0.5rem; flex-wrap: wrap; }
        }
      `}</style>
    </header>
  );
}
