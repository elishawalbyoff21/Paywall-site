// components/UnlockModal.js
import { useState, useEffect } from 'react';

export default function UnlockModal({ post, onClose, formatPrice }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleUnlock = async () => {
    setLoading(true);
    setError(null);
    try {
      // Call your API to create a Stripe Checkout session
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: post.id, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Checkout failed');
      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="close-btn" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal-eyebrow">🔒 LOCKED CONTENT</div>
        <h2 className="modal-title">{post.title}</h2>
        <div className="modal-divider" />

        <div className="price-display">
          <span className="price-label">ONE-TIME ACCESS</span>
          <span className="price-value">{formatPrice(post.price, post.currency)}</span>
        </div>

        <ul className="perks">
          <li>⚡ Instant access after payment</li>
          <li>👤 No account required</li>
          <li>🔐 Secure Stripe checkout</li>
          <li>🌍 All major cards + Apple/Google Pay</li>
        </ul>

        {/* Optional email for receipt / access link */}
        <div className="email-field">
          <label>Email (optional — for re-access link)</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {error && <div className="error-msg">⚠ {error}</div>}

        <button
          className="pay-btn"
          onClick={handleUnlock}
          disabled={loading}
        >
          {loading ? (
            <span className="loading-dots">PROCESSING<span>.</span><span>.</span><span>.</span></span>
          ) : (
            <>PAY {formatPrice(post.price, post.currency)} — UNLOCK NOW</>
          )}
        </button>

        <p className="stripe-note">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          Powered by Stripe. We never store your payment details.
        </p>
      </div>

      <style jsx>{`
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.9);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        .modal {
          background: var(--surface);
          border: 1px solid var(--gold-dim);
          max-width: 420px;
          width: 100%;
          padding: 2.5rem 2rem;
          position: relative;
          box-shadow: 0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(201,168,76,0.1);
          animation: slideUp 0.3s ease;
        }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: none; opacity: 1 } }
        .close-btn {
          position: absolute;
          top: 1rem; right: 1rem;
          background: none;
          color: var(--white-dim);
          font-size: 0.9rem;
          padding: 0.5rem;
          transition: color 0.2s;
        }
        .close-btn:hover { color: var(--gold); }
        .modal-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.3em;
          color: var(--gold);
          margin-bottom: 0.75rem;
        }
        .modal-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.2rem;
          letter-spacing: 0.08em;
          color: var(--white);
          line-height: 1;
        }
        .modal-divider {
          height: 1px;
          background: linear-gradient(90deg, var(--gold-dim), transparent);
          margin: 1.25rem 0;
        }
        .price-display {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 1.5rem;
        }
        .price-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          color: var(--white-dim);
        }
        .price-value {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.5rem;
          color: var(--gold);
          letter-spacing: 0.05em;
        }
        .perks {
          list-style: none;
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .perks li {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.9rem;
          color: var(--white-dim);
          letter-spacing: 0.02em;
        }
        .email-field {
          margin-bottom: 1.25rem;
        }
        .email-field label {
          display: block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          color: var(--white-dim);
          margin-bottom: 0.5rem;
        }
        .email-field input {
          width: 100%;
          background: var(--surface-2);
          border: 1px solid var(--border);
          color: var(--white);
          padding: 0.75rem 1rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .email-field input:focus { border-color: var(--gold-dim); }
        .email-field input::placeholder { color: #333; }
        .error-msg {
          background: rgba(139,0,0,0.2);
          border: 1px solid var(--red);
          padding: 0.75rem 1rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          color: #ff6b6b;
          margin-bottom: 1rem;
        }
        .pay-btn {
          width: 100%;
          background: var(--gold);
          color: var(--black);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          padding: 1.1rem;
          transition: all 0.3s ease;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          margin-bottom: 1rem;
        }
        .pay-btn:hover:not(:disabled) {
          background: var(--gold-light);
          transform: translateY(-1px);
          box-shadow: 0 8px 30px rgba(201,168,76,0.3);
        }
        .pay-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .loading-dots span {
          animation: blink 1.2s infinite;
        }
        .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes blink { 0%,80%,100% { opacity: 0 } 40% { opacity: 1 } }
        .stripe-note {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.55rem;
          letter-spacing: 0.1em;
          color: #333;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
