// components/ContentCard.js
import { useState } from 'react';
import UnlockModal from './UnlockModal';

const TYPE_ICONS = {
  image: '🖼',
  video: '▶',
  text: '📄',
};

// Format price from cents to display string
function formatPrice(cents, currency = 'usd') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

export default function ContentCard({ post }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <article className="card" onClick={() => setShowModal(true)}>
        {/* Blurred preview area */}
        <div className="preview">
          <div className="blur-overlay" />
          <div className="lock-center">
            <div className="lock-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div className="lock-price">{formatPrice(post.price, post.currency)}</div>
            <button className="unlock-btn">UNLOCK</button>
          </div>
          <div className="type-badge">{TYPE_ICONS[post.type]} {post.type.toUpperCase()}</div>
        </div>

        {/* Card footer */}
        <div className="card-footer">
          <span className="card-title">{post.title}</span>
          <span className="card-price">{formatPrice(post.price, post.currency)}</span>
        </div>
      </article>

      {showModal && (
        <UnlockModal
          post={post}
          onClose={() => setShowModal(false)}
          formatPrice={formatPrice}
        />
      )}

      <style jsx>{`
        .card {
          background: var(--surface);
          border: 1px solid var(--border);
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .card:hover {
          border-color: var(--gold-dim);
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.2);
        }
        .card:hover .unlock-btn {
          background: var(--gold-light);
        }
        .preview {
          position: relative;
          aspect-ratio: 4/5;
          background: linear-gradient(135deg, #0d0d0d 0%, #1a1208 50%, #0d0d0d 100%);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        /* Abstract locked content visualization */
        .preview::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(201,168,76,0.03) 10px,
              rgba(201,168,76,0.03) 20px
            );
        }
        .blur-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 70%);
        }
        .lock-center {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
        .lock-icon {
          color: var(--gold);
          opacity: 0.9;
          filter: drop-shadow(0 0 12px rgba(201,168,76,0.5));
        }
        .lock-price {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.8rem;
          letter-spacing: 0.1em;
          color: var(--white);
          text-shadow: 0 2px 20px rgba(0,0,0,0.8);
        }
        .unlock-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          color: var(--black);
          background: var(--gold);
          padding: 0.5rem 1.5rem;
          transition: all 0.2s ease;
          clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
        }
        .type-badge {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.55rem;
          letter-spacing: 0.15em;
          color: var(--gold);
          background: rgba(0,0,0,0.8);
          border: 1px solid var(--border);
          padding: 0.3rem 0.6rem;
        }
        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.9rem 1rem;
          border-top: 1px solid var(--border);
        }
        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.95rem;
          letter-spacing: 0.05em;
          color: var(--white-dim);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .card-price {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          color: var(--gold);
          flex-shrink: 0;
          margin-left: 0.5rem;
        }
      `}</style>
    </>
  );
}
