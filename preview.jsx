import { useState } from "react";

const POSTS = [
  { id: "1", title: "Secret Garden", price: 999, type: "image" },
  { id: "2", title: "Private Diary", price: 1999, type: "video" },
  { id: "3", title: "Love Letters", price: 2999, type: "text" },
  { id: "4", title: "Inner Circle", price: 4999, type: "image" },
  { id: "5", title: "Cherry Blossom", price: 1499, type: "image" },
  { id: "6", title: "After Dark", price: 3499, type: "video" },
];

const fmt = (cents) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(cents / 100);

const TYPE_ICON = { image: "🌸", video: "✨", text: "💌" };

const gradients = [
  "linear-gradient(135deg,#fbc2eb 0%,#c77dff 100%)",
  "linear-gradient(135deg,#fda4ba 0%,#f472b6 100%)",
  "linear-gradient(135deg,#fecdd3 0%,#fb7185 100%)",
  "linear-gradient(135deg,#e0aaff 0%,#9d4edd 100%)",
  "linear-gradient(135deg,#ffb3c6 0%,#ff6b9d 100%)",
  "linear-gradient(135deg,#ffd6e0 0%,#c77dff 100%)",
];

const G = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:wght@300;400;500;600&family=Pinyon+Script&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
:root{
  --blush:#fdf0f5;--rose:#e8a0b8;--deep:#c4607e;--mauve:#9b4f6e;
  --pale:#fff5f9;--text:#3d1f2d;--muted:#a0788a;--border:#f0cdd9;
}
body{background:var(--blush);color:var(--text);font-family:'DM Sans',sans-serif;user-select:none;overflow-x:hidden;}
.bg-dots{position:fixed;inset:0;pointer-events:none;z-index:0;
  background-image:radial-gradient(circle,#e8a0b825 1px,transparent 1px);background-size:28px 28px;}
/* HERO */
.hero{position:relative;z-index:1;min-height:100vh;display:flex;flex-direction:column;
  align-items:center;justify-content:center;text-align:center;padding:3rem 2rem 7rem;
  border-bottom:1px solid var(--border);
  background:linear-gradient(180deg,#fff0f7 0%,#fde8f1 60%,#f9dded 100%);}
.hero::before{content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 70% 60% at 50% 40%,rgba(232,160,184,0.18) 0%,transparent 70%);pointer-events:none;}
.deco{font-family:'Pinyon Script',cursive;font-size:1.1rem;color:var(--rose);margin-bottom:1.5rem;opacity:.85;}
.logo{font-family:'Playfair Display',serif;font-size:clamp(3.5rem,13vw,9rem);font-weight:500;
  font-style:italic;line-height:.95;color:var(--mauve);
  text-shadow:2px 4px 30px rgba(196,96,126,.15);margin-bottom:.5rem;}
.logo-sub{font-family:'Pinyon Script',cursive;font-size:clamp(1.8rem,5vw,3rem);color:var(--rose);margin-bottom:.25rem;}
.divrow{display:flex;align-items:center;gap:1rem;margin:1.5rem auto;color:var(--rose);}
.divrow::before,.divrow::after{content:'';display:block;height:1px;width:60px;}
.divrow::before{background:linear-gradient(90deg,transparent,var(--rose));}
.divrow::after{background:linear-gradient(90deg,var(--rose),transparent);}
.tagline{font-family:'Playfair Display',serif;font-style:italic;font-size:clamp(.9rem,2.5vw,1.15rem);
  color:var(--muted);margin-bottom:2.5rem;line-height:1.7;}
.cta{display:inline-flex;align-items:center;gap:.6rem;
  background:linear-gradient(135deg,var(--deep),var(--mauve));color:#fff;
  font-family:'DM Sans',sans-serif;font-size:.78rem;font-weight:600;letter-spacing:.15em;text-transform:uppercase;
  padding:1rem 2.5rem;border-radius:50px;border:none;cursor:pointer;
  box-shadow:0 8px 30px rgba(196,96,126,.35);transition:all .3s;}
.cta:hover{transform:translateY(-3px);box-shadow:0 15px 40px rgba(196,96,126,.45);}
.trust{position:absolute;bottom:0;left:0;right:0;
  display:flex;justify-content:center;gap:2.5rem;flex-wrap:wrap;
  padding:1rem 2rem;background:rgba(255,255,255,.75);backdrop-filter:blur(10px);
  border-top:1px solid var(--border);font-size:.6rem;font-weight:600;
  letter-spacing:.12em;text-transform:uppercase;color:var(--muted);}
/* SECTION */
.section{position:relative;z-index:1;max-width:1200px;margin:0 auto;padding:4rem 2rem 6rem;}
.sec-eyebrow{font-family:'Playfair Display',serif;font-style:italic;font-size:.75rem;
  letter-spacing:.2em;color:var(--rose);margin-bottom:.4rem;}
.sec-title{font-family:'Playfair Display',serif;font-size:2rem;font-weight:400;
  color:var(--mauve);margin-bottom:2.5rem;}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(265px,1fr));gap:1.5rem;}
/* CARD */
.card{background:#fff;border:1px solid var(--border);border-radius:16px;overflow:hidden;
  cursor:pointer;transition:all .3s;box-shadow:0 2px 12px rgba(196,96,126,.06);}
.card:hover{transform:translateY(-6px);box-shadow:0 20px 50px rgba(196,96,126,.18);border-color:var(--rose);}
.card-prev{position:relative;aspect-ratio:4/5;display:flex;align-items:center;justify-content:center;overflow:hidden;}
.card-lock{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;gap:.8rem;}
.lock-circle{width:60px;height:60px;background:rgba(255,255,255,.9);border-radius:50%;
  display:flex;align-items:center;justify-content:center;font-size:1.4rem;
  box-shadow:0 4px 20px rgba(196,96,126,.25);}
.lock-price{font-family:'Playfair Display',serif;font-size:1.8rem;font-style:italic;
  color:#fff;text-shadow:0 2px 12px rgba(0,0,0,.25);}
.lock-btn{background:#fff;color:var(--deep);font-family:'DM Sans',sans-serif;
  font-size:.65rem;font-weight:600;letter-spacing:.2em;text-transform:uppercase;
  padding:.45rem 1.4rem;border-radius:50px;border:none;cursor:pointer;
  box-shadow:0 2px 10px rgba(0,0,0,.1);transition:all .2s;}
.card:hover .lock-btn{background:var(--deep);color:#fff;}
.type-badge{position:absolute;top:.75rem;right:.75rem;
  background:rgba(255,255,255,.88);backdrop-filter:blur(6px);color:var(--mauve);
  font-size:.55rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;
  padding:.3rem .7rem;border-radius:50px;}
.card-foot{display:flex;justify-content:space-between;align-items:center;
  padding:.9rem 1.1rem;border-top:1px solid var(--border);}
.card-title{font-family:'Playfair Display',serif;font-style:italic;font-size:.95rem;color:var(--text);}
.card-price{font-size:.8rem;font-weight:600;color:var(--deep);}
/* MODAL */
.overlay{position:fixed;inset:0;background:rgba(61,31,45,.6);backdrop-filter:blur(12px);
  z-index:1000;display:flex;align-items:center;justify-content:center;padding:1rem;
  animation:fadeIn .2s ease;}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.modal{background:#fff;border-radius:24px;max-width:420px;width:100%;
  padding:2.5rem 2rem;position:relative;
  box-shadow:0 40px 100px rgba(61,31,45,.25);animation:slideUp .3s ease;}
@keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:none;opacity:1}}
.m-close{position:absolute;top:1.1rem;right:1.1rem;background:var(--blush);border:none;
  width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;
  cursor:pointer;color:var(--muted);font-size:.85rem;transition:all .2s;}
.m-close:hover{background:var(--rose);color:#fff;}
.m-eyebrow{font-size:.65rem;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:var(--rose);margin-bottom:.5rem;}
.m-title{font-family:'Playfair Display',serif;font-size:2rem;font-style:italic;color:var(--mauve);}
.m-div{height:1px;background:linear-gradient(90deg,var(--rose),transparent);margin:1.25rem 0;}
.m-price-row{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:1.5rem;}
.m-price-label{font-size:.65rem;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:var(--muted);}
.m-price-val{font-family:'Playfair Display',serif;font-size:2.5rem;font-style:italic;color:var(--deep);}
.perks{list-style:none;margin-bottom:1.5rem;display:flex;flex-direction:column;gap:.5rem;}
.perks li{font-size:.88rem;color:var(--muted);}
.e-label{display:block;font-size:.6rem;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:var(--muted);margin-bottom:.5rem;}
.e-input{width:100%;border:1.5px solid var(--border);border-radius:12px;padding:.8rem 1rem;
  font-family:'DM Sans',sans-serif;font-size:.85rem;color:var(--text);margin-bottom:1.25rem;outline:none;transition:border-color .2s;}
.e-input:focus{border-color:var(--rose);}
.pay-btn{width:100%;background:linear-gradient(135deg,var(--deep),var(--mauve));color:#fff;
  font-family:'DM Sans',sans-serif;font-size:.78rem;font-weight:600;letter-spacing:.15em;text-transform:uppercase;
  padding:1.1rem;border-radius:50px;border:none;cursor:pointer;
  box-shadow:0 8px 25px rgba(196,96,126,.4);margin-bottom:1rem;transition:all .3s;}
.pay-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 12px 35px rgba(196,96,126,.5);}
.pay-btn:disabled{opacity:.7;cursor:not-allowed;}
.stripe-note{display:flex;align-items:center;justify-content:center;gap:.4rem;
  font-size:.6rem;color:#ccc;letter-spacing:.05em;}
/* SUCCESS */
.success-modal{text-align:center;padding:3rem 2rem;}
.success-icon{width:70px;height:70px;background:linear-gradient(135deg,var(--rose),var(--deep));
  border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.8rem;
  margin:0 auto 1.5rem;box-shadow:0 8px 30px rgba(196,96,126,.4);}
/* ADMIN */
.admin-wrap{width:100%;max-width:880px;background:#fff;border-radius:20px;overflow:hidden;
  display:flex;max-height:85vh;box-shadow:0 40px 100px rgba(61,31,45,.25);animation:slideUp .3s ease;}
.a-side{width:190px;flex-shrink:0;background:linear-gradient(180deg,var(--mauve),#7a3b57);
  display:flex;flex-direction:column;padding:1.5rem 0;}
.a-logo{font-family:'Playfair Display',serif;font-style:italic;font-size:1rem;
  color:rgba(255,255,255,.9);padding:0 1.25rem;margin-bottom:2rem;}
.a-nav{background:none;border:none;color:rgba(255,255,255,.55);font-family:'DM Sans',sans-serif;
  font-size:.7rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;
  padding:.8rem 1.25rem;text-align:left;cursor:pointer;transition:all .2s;border-left:3px solid transparent;}
.a-nav.on{background:rgba(255,255,255,.1);color:#fff;border-left-color:var(--rose);}
.a-nav:hover{color:#fff;background:rgba(255,255,255,.07);}
.a-exit{margin-top:auto;border-top:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.3)!important;}
.a-main{flex:1;padding:2rem;overflow-y:auto;}
.a-head{font-family:'Playfair Display',serif;font-size:1.8rem;font-style:italic;color:var(--mauve);margin-bottom:1.5rem;}
.stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:2rem;}
.stat-card{background:var(--blush);border:1px solid var(--border);border-radius:12px;padding:1.25rem;text-align:center;}
.stat-l{font-size:.6rem;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:var(--muted);margin-bottom:.4rem;}
.stat-v{font-family:'Playfair Display',serif;font-size:2rem;font-style:italic;color:var(--deep);}
.p-row{display:flex;justify-content:space-between;align-items:center;
  padding:.85rem 1rem;border:1px solid var(--border);border-radius:10px;margin-bottom:.5rem;background:var(--pale);}
.p-title{font-family:'Playfair Display',serif;font-style:italic;color:var(--text);}
.p-price{font-size:.85rem;font-weight:600;color:var(--deep);}
.live{font-size:.55rem;font-weight:600;letter-spacing:.1em;color:#2e7d52;background:#d4f0e2;padding:.25rem .6rem;border-radius:50px;}
/* FOOTER */
.footer{position:relative;z-index:1;border-top:1px solid var(--border);padding:2rem;
  text-align:center;color:var(--muted);font-size:.72rem;}
.a-link{background:none;border:none;color:var(--border);font-size:.55rem;cursor:pointer;margin-top:.75rem;display:block;width:100%;}
`;

function Card({ post, onClick }) {
  return (
    <article className="card" onClick={onClick}>
      <div className="card-prev">
        <div style={{ position:"absolute", inset:0, background: gradients[parseInt(post.id)-1] }} />
        <div className="card-lock">
          <div className="lock-circle">🔒</div>
          <div className="lock-price">{fmt(post.price)}</div>
          <button className="lock-btn">Unlock</button>
        </div>
        <div className="type-badge">{TYPE_ICON[post.type]} {post.type}</div>
      </div>
      <div className="card-foot">
        <span className="card-title">{post.title}</span>
        <span className="card-price">{fmt(post.price)}</span>
      </div>
    </article>
  );
}

function PayModal({ post, onClose }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  const pay = () => { setLoading(true); setTimeout(() => { setLoading(false); setPaid(true); }, 1800); };

  if (paid) return (
    <div className="overlay" onClick={e => e.target===e.currentTarget && onClose()}>
      <div className="modal success-modal">
        <div className="success-icon">✓</div>
        <div className="m-eyebrow">Payment Verified</div>
        <h2 className="m-title">Access Granted ✨</h2>
        <p style={{color:"var(--muted)",fontSize:".9rem",margin:"1rem 0 2rem",fontStyle:"italic"}}>Your content is unlocked, darling.</p>
        <button className="pay-btn" style={{width:"auto",padding:".9rem 2.5rem"}} onClick={onClose}>View Content →</button>
      </div>
    </div>
  );

  return (
    <div className="overlay" onClick={e => e.target===e.currentTarget && onClose()}>
      <div className="modal">
        <button className="m-close" onClick={onClose}>✕</button>
        <div className="m-eyebrow">🌸 Locked Content</div>
        <h2 className="m-title">{post.title}</h2>
        <div className="m-div" />
        <div className="m-price-row">
          <span className="m-price-label">One-Time Access</span>
          <span className="m-price-val">{fmt(post.price)}</span>
        </div>
        <ul className="perks">
          {["⚡ Instant access after payment","👤 No account required","🔐 Secure Stripe checkout","💳 All cards + Apple/Google Pay"].map(i=><li key={i}>{i}</li>)}
        </ul>
        <label className="e-label">Email (optional — for re-access link)</label>
        <input className="e-input" type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} />
        <button className="pay-btn" onClick={pay} disabled={loading}>
          {loading ? "Processing..." : `Pay ${fmt(post.price)} — Unlock Now 🌸`}
        </button>
        <p className="stripe-note">🔒 Powered by Stripe · We never store your payment details</p>
      </div>
    </div>
  );
}

function AdminPanel({ onClose }) {
  const [tab, setTab] = useState("content");
  return (
    <div className="overlay" onClick={e => e.target===e.currentTarget && onClose()}>
      <div className="admin-wrap">
        <div className="a-side">
          <div className="a-logo">✦ The Vault</div>
          {[["content","📁 Content"],["analytics","📊 Analytics"],["links","🔗 Links"]].map(([t,l])=>(
            <button key={t} className={`a-nav${tab===t?" on":""}`} onClick={()=>setTab(t)}>{l}</button>
          ))}
          <button className="a-nav a-exit" onClick={onClose}>← Exit</button>
        </div>
        <div className="a-main">
          {tab==="content" && <>
            <h2 className="a-head">My Content</h2>
            {POSTS.map(p=>(
              <div className="p-row" key={p.id}>
                <span className="p-title">{p.title}</span>
                <div style={{display:"flex",gap:".75rem",alignItems:"center"}}>
                  <span className="p-price">{fmt(p.price)}</span>
                  <span className="live">Live</span>
                  <span style={{color:"#ddd",cursor:"pointer"}}>✕</span>
                </div>
              </div>
            ))}
            <button className="pay-btn" style={{marginTop:"1.5rem",padding:".85rem"}}>+ Add New Content</button>
          </>}
          {tab==="analytics" && <>
            <h2 className="a-head">Analytics</h2>
            <div className="stat-grid">
              {[["Total Revenue","$1,287"],["Purchases","47"],["This Month","$432"],["Avg. Sale","$27"]].map(([l,v])=>(
                <div className="stat-card" key={l}><div className="stat-l">{l}</div><div className="stat-v">{v}</div></div>
              ))}
            </div>
            <div style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",color:"var(--rose)",fontSize:".85rem",marginBottom:"1rem"}}>Top Performing</div>
            {[["Inner Circle",14,"$699"],["After Dark",11,"$384"],["Private Diary",10,"$199"]].map(([t,s,r])=>(
              <div className="p-row" key={t}>
                <span className="p-title">{t}</span>
                <div style={{display:"flex",gap:"1rem"}}>
                  <span style={{fontSize:".75rem",color:"var(--muted)"}}>{s} sales</span>
                  <span className="p-price">{r}</span>
                </div>
              </div>
            ))}
          </>}
          {tab==="links" && <>
            <h2 className="a-head">Unique Links</h2>
            <p style={{color:"var(--muted)",fontStyle:"italic",fontSize:".9rem",marginBottom:"1.5rem"}}>Generate shareable unlock links for DMs & socials.</p>
            <select style={{width:"100%",border:"1.5px solid var(--border)",borderRadius:"12px",padding:".8rem 1rem",fontFamily:"'DM Sans',sans-serif",fontSize:".85rem",color:"var(--text)",marginBottom:"1rem",outline:"none"}}>
              <option>Select content...</option>
              {POSTS.map(p=><option key={p.id}>{p.title}</option>)}
            </select>
            <button className="pay-btn">Generate Link 🔗</button>
            <div style={{marginTop:"1rem",background:"var(--blush)",border:"1px solid var(--border)",borderRadius:"12px",padding:"1rem",fontFamily:"monospace",fontSize:".7rem",color:"var(--deep)"}}>
              https://thevault.co/checkout/sess_1Pxxxx...
            </div>
          </>}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [modal, setModal] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminEntry, setAdminEntry] = useState(false);
  const [pw, setPw] = useState("");

  return (
    <>
      <style>{G}</style>
      <div className="bg-dots" />

      {/* Hero */}
      <header className="hero">
        <div className="deco">✦ exclusive · private · premium ✦</div>
        <h1 className="logo">The Vault</h1>
        <div className="logo-sub">by invitation only</div>
        <div className="divrow">🌸</div>
        <p className="tagline">Premium content. Pay once. No accounts.<br/>No traces. Instant access.</p>
        <button className="cta" onClick={()=>document.getElementById("content").scrollIntoView({behavior:"smooth"})}>
          View Locked Content ✨
        </button>
        <div className="trust">
          <span>🔒 Stripe Secured</span><span>⚡ Instant Access</span>
          <span>👤 Anonymous</span><span>🌍 Worldwide</span>
        </div>
      </header>

      {/* Grid */}
      <section id="content" className="section">
        <div className="sec-eyebrow">✦ Locked Content</div>
        <div className="sec-title">Pay to Unlock</div>
        <div className="grid">
          {POSTS.map(p=><Card key={p.id} post={p} onClick={()=>setModal(p)} />)}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} The Vault · All rights reserved</p>
        <p style={{marginTop:".4rem",fontSize:".65rem"}}>All transactions processed securely via Stripe · No data stored</p>
        <button className="a-link" onClick={()=>setAdminEntry(true)}>admin</button>
      </footer>

      {/* Modals */}
      {modal && <PayModal post={modal} onClose={()=>setModal(null)} />}

      {adminEntry && (
        <div className="overlay" onClick={e=>e.target===e.currentTarget&&setAdminEntry(false)}>
          <div className="modal" style={{textAlign:"center",padding:"2.5rem"}}>
            <div style={{fontSize:"2rem",marginBottom:"1rem"}}>🌸</div>
            <h2 className="m-title" style={{marginBottom:"1.5rem"}}>Admin Access</h2>
            <input className="e-input" type="password" placeholder="Enter password" value={pw}
              onChange={e=>setPw(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter"){setShowAdmin(true);setAdminEntry(false);}}} autoFocus />
            <button className="pay-btn" onClick={()=>{setShowAdmin(true);setAdminEntry(false);}}>Enter</button>
            <button onClick={()=>setAdminEntry(false)} style={{background:"none",border:"none",color:"var(--muted)",fontSize:".75rem",cursor:"pointer",marginTop:".5rem",display:"block",width:"100%",padding:".5rem"}}>Cancel</button>
          </div>
        </div>
      )}

      {showAdmin && <AdminPanel onClose={()=>setShowAdmin(false)} />}
    </>
  );
}
