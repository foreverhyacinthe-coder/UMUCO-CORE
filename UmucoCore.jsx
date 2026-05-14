import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UmucoLogo = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 78 Q72 55 48 28 Q38 16 42 8 Q46 2 52 6 Q58 12 62 22 Q74 50 88 68"
      stroke="#2D5A27" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
    <path d="M100 78 Q128 55 152 28 Q162 16 158 8 Q154 2 148 6 Q142 12 138 22 Q126 50 112 68"
      stroke="#2D5A27" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
    <path d="M54 10 Q60 18 66 30" stroke="#C9A84C" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.85"/>
    <path d="M146 10 Q140 18 134 30" stroke="#C9A84C" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.85"/>
    <path d="M78 70 Q68 80 66 95 Q64 110 70 120 Q76 130 86 136 Q93 140 100 141 Q107 140 114 136 Q124 130 130 120 Q136 110 134 95 Q132 80 122 70 L100 78 Z"
      stroke="#2D5A27" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M74 88 Q62 82 60 92 Q62 100 74 98" stroke="#2D5A27" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    <path d="M126 88 Q138 82 140 92 Q138 100 126 98" stroke="#2D5A27" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    <ellipse cx="88" cy="102" rx="5" ry="4" stroke="#2D5A27" strokeWidth="3" fill="none"/>
    <ellipse cx="112" cy="102" rx="5" ry="4" stroke="#2D5A27" strokeWidth="3" fill="none"/>
    <path d="M93 124 Q100 128 107 124" stroke="#2D5A27" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <circle cx="95" cy="121" r="2.5" stroke="#2D5A27" strokeWidth="2.5" fill="none"/>
    <circle cx="105" cy="121" r="2.5" stroke="#2D5A27" strokeWidth="2.5" fill="none"/>
    <path d="M92 88 Q96 84 100 83 Q104 84 108 88" stroke="#2D5A27" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
  </svg>
);

const IkigaPattern = () => (
  <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06 }}>
    {[0,1,2,3,4].map(row =>
      [0,1,2,3,4].map(col => (
        <g key={`${row}-${col}`} transform={`translate(${col*80},${row*80})`}>
          <polygon points="40,5 75,25 75,55 40,75 5,55 5,25" fill="none" stroke="#5C3A1E" strokeWidth="1.5"/>
          <polygon points="40,18 62,30 62,50 40,62 18,50 18,30" fill="none" stroke="#5C3A1E" strokeWidth="1"/>
          <circle cx="40" cy="40" r="6" fill="#5C3A1E"/>
        </g>
      ))
    )}
  </svg>
);

const EyeOpen = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const EyeOff = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

export default function UmucoAuth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [remember, setRemember] = useState(false);
  const [animating, setAnimating] = useState(false);

  const switchMode = (newMode) => {
    if (newMode === mode) return;
    setAnimating(true);
    setTimeout(() => { setMode(newMode); setAnimating(false); }, 280);
  };

  return (
    <div className="uc-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Cormorant+Garamond:wght@500;600&family=Lato:wght@300;400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; overflow: hidden; }

        .uc-root {
          display: flex;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          font-family: 'Lato', sans-serif;
          background: #1A0E05;
        }

        /* ════════════ LEFT PANEL ════════════ */
        .uc-left {
          flex: 1;
          min-width: 0;
          position: relative;
          overflow: hidden;
          background: linear-gradient(160deg, #3D1F07 0%, #1F0D02 45%, #0D0602 100%);
          display: flex;
          flex-direction: column;
        }
        .uc-landscape {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          width: 100%;
          height: clamp(80px, 22%, 180px);
          z-index: 1;
        }
        .uc-left-content {
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(20px, 4vw, 56px) clamp(24px, 5vw, 56px);
          gap: clamp(10px, 1.8vh, 22px);
        }
        .uc-badge {
          display: inline-block;
          border: 1px solid #8B5E3C;
          color: #C9A96E;
          font-size: clamp(7px, 0.85vw, 10px);
          font-weight: 700;
          letter-spacing: 2.5px;
          padding: 5px 12px;
          border-radius: 3px;
          background: rgba(139,78,35,0.12);
          width: fit-content;
        }
        .uc-hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(20px, 3.2vw, 46px);
          font-weight: 600;
          color: #F5E6C8;
          line-height: 1.18;
        }
        .uc-hero-accent { color: #C9A96E; font-style: italic; }
        .uc-hero-sub {
          color: #A88B70;
          font-size: clamp(11px, 1.1vw, 14px);
          line-height: 1.7;
          font-weight: 300;
          max-width: 360px;
        }
        .uc-stats { display: flex; gap: clamp(16px, 2.5vw, 38px); flex-wrap: wrap; }
        .uc-stat-num {
          display: block;
          font-family: 'Playfair Display', serif;
          font-size: clamp(18px, 2.2vw, 28px);
          color: #C9A96E;
          font-weight: 700;
        }
        .uc-stat-label {
          display: block;
          font-size: clamp(7px, 0.8vw, 10px);
          font-weight: 700;
          letter-spacing: 2px;
          color: #7A5C3A;
          text-transform: uppercase;
        }
        .uc-left-footer {
          position: relative; z-index: 2;
          display: flex; align-items: center;
          padding: 12px clamp(24px, 5vw, 56px);
          font-size: clamp(7px, 0.75vw, 10px);
          color: #5C3D20;
          letter-spacing: 1.5px;
          font-weight: 700;
          border-top: 1px solid rgba(92,58,30,0.3);
        }
        .uc-lang { color: #7A5C3A; font-size: 11px; font-weight: 700; cursor: pointer; }
        .uc-lang-active { color: #C9A96E; font-size: 11px; font-weight: 700; cursor: pointer; }

        /* ════════════ RIGHT PANEL ════════════ */
        .uc-right {
          width: clamp(300px, 36vw, 440px);
          flex-shrink: 0;
          background: #FDFAF5;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: -8px 0 40px rgba(0,0,0,0.35);
        }

        /* scrollable form area - hidden scrollbar */
        .uc-form-scroll {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: clamp(14px, 2.5vh, 28px) clamp(18px, 3.5vw, 36px) 0;
          scrollbar-width: none;
        }
        .uc-form-scroll::-webkit-scrollbar { display: none; }

        .uc-form-card {
          width: 100%;
          max-width: 340px;
          transition: opacity 0.28s ease, transform 0.28s ease;
        }
        .uc-form-card.hidden { opacity: 0; transform: translateY(8px); }

        .uc-logo-block {
          display: flex; align-items: center; gap: 9px;
          justify-content: center;
          margin-bottom: clamp(8px, 1.3vh, 16px);
        }
        .uc-logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(17px, 1.8vw, 21px);
          font-weight: 600;
          color: #3B1F08;
        }
        .uc-greeting { text-align: center; margin-bottom: clamp(8px, 1.3vh, 16px); }
        .uc-greeting h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(17px, 1.8vw, 21px);
          color: #3B1F08;
          font-weight: 600;
          margin-bottom: 3px;
        }
        .uc-greeting p { font-size: clamp(9px, 0.9vw, 11px); color: #8B7355; letter-spacing: 1px; }

        .uc-tabs {
          display: flex;
          border-radius: 7px;
          overflow: hidden;
          border: 1.5px solid #E8D9C0;
          margin-bottom: clamp(10px, 1.6vh, 18px);
          background: #F5EFE4;
        }
        .uc-tab {
          flex: 1; padding: clamp(6px, 1vh, 9px);
          border: none; background: transparent; cursor: pointer;
          font-size: clamp(11px, 1vw, 13px); font-weight: 600;
          color: #A88B70; font-family: 'Lato', sans-serif;
          letter-spacing: 0.3px; transition: all 0.2s;
        }
        .uc-tab.active { background: #8B4513; color: #FDFAF5; border-radius: 5px; }

        .uc-fields {
          display: flex; flex-direction: column;
          gap: clamp(7px, 1.1vh, 12px);
          margin-bottom: clamp(7px, 1.1vh, 12px);
        }
        .uc-field { display: flex; flex-direction: column; gap: 4px; }
        .uc-field-head { display: flex; justify-content: space-between; align-items: center; }
        .uc-label { font-size: 9px; font-weight: 700; letter-spacing: 2px; color: #8B7355; text-transform: uppercase; }
        .uc-input-wrap { position: relative; display: flex; align-items: center; }
        .uc-input-icon { position: absolute; left: 10px; color: #A88B70; display: flex; align-items: center; }
        .uc-input {
          width: 100%;
          padding: clamp(7px, 1.1vh, 10px) 36px clamp(7px, 1.1vh, 10px) 34px;
          border: 1.5px solid #E8D9C0;
          border-radius: 7px;
          font-size: clamp(12px, 1vw, 13px);
          color: #3B1F08;
          background: #FDF8F0;
          font-family: 'Lato', sans-serif;
          transition: border-color 0.2s, background 0.2s;
        }
        .uc-input:focus { outline: none; border-color: #8B4513; background: #FFF9F2; }
        .uc-input::placeholder { color: #A88B70; }
        .uc-eye {
          position: absolute; right: 10px;
          background: none; border: none; cursor: pointer;
          color: #A88B70; display: flex; align-items: center; padding: 0;
        }
        .uc-forgot { font-size: 11px; color: #8B4513; font-weight: 600; cursor: pointer; text-decoration: none; }

        .uc-check-row {
          display: flex; align-items: flex-start; gap: 7px;
          margin-bottom: clamp(8px, 1.3vh, 14px); cursor: pointer;
        }
        .uc-check-row input { accent-color: #8B4513; margin-top: 2px; flex-shrink: 0; }
        .uc-check-row span { font-size: clamp(11px, 0.95vw, 12px); color: #5C3A1E; line-height: 1.4; }

        .uc-submit {
          width: 100%;
          padding: clamp(9px, 1.3vh, 12px);
          background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
          color: #FDF8F0; border: none; border-radius: 7px;
          font-size: clamp(12px, 1vw, 13px); font-weight: 700;
          font-family: 'Lato', sans-serif; letter-spacing: 0.4px;
          cursor: pointer;
          margin-bottom: clamp(10px, 1.5vh, 16px);
          box-shadow: 0 3px 14px rgba(139,69,19,0.32);
          transition: filter 0.2s;
        }
        .uc-submit:hover { filter: brightness(1.08); }

        .uc-divider { display: flex; align-items: center; gap: 8px; margin-bottom: clamp(8px, 1.3vh, 14px); }
        .uc-divider-line { flex: 1; height: 1px; background: #E8D9C0; }
        .uc-divider-text { font-size: 9px; font-weight: 700; letter-spacing: 1.5px; color: #C4A882; white-space: nowrap; }

        .uc-socials { display: flex; gap: 8px; margin-bottom: clamp(8px, 1.3vh, 14px); }
        .uc-social-btn {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: clamp(6px, 1vh, 9px);
          border: 1.5px solid #E8D9C0; border-radius: 7px;
          background: #FDFAF5; cursor: pointer;
          font-size: clamp(11px, 0.95vw, 13px); font-weight: 600;
          color: #3B1F08; font-family: 'Lato', sans-serif;
          transition: filter 0.2s;
        }
        .uc-social-btn:hover { filter: brightness(0.96); }

        .uc-switch {
          text-align: center;
          font-size: clamp(11px, 0.95vw, 12px);
          color: #8B7355;
          margin-bottom: clamp(8px, 1.2vh, 12px);
        }
        .uc-switch-btn {
          background: none; border: none; color: #8B4513; font-weight: 700;
          cursor: pointer; font-size: inherit; font-family: 'Lato', sans-serif; padding: 0;
        }

        .uc-secure {
          display: flex; align-items: center; justify-content: center; gap: 5px;
          font-size: 9px; font-weight: 700; letter-spacing: 2px; color: #B8A490;
          padding-bottom: clamp(10px, 1.5vh, 16px);
        }

        .uc-footer {
          flex-shrink: 0;
          display: flex; gap: 8px; align-items: center; justify-content: center;
          padding: clamp(8px, 1.1vh, 12px) 16px;
          font-size: clamp(9px, 0.85vw, 11px);
          border-top: 1px solid #EDE3D4;
        }
        .uc-footer a { color: #A88B70; font-weight: 600; text-decoration: none; }
        .uc-footer a:hover { color: #8B4513; }
        .uc-dot { color: #C4A882; }

        /* ════════════ MOBILE ════════════ */
        @media (max-width: 640px) {
          .uc-root { flex-direction: column; }
          .uc-left { flex: 0 0 36vh; }
          .uc-left-content { padding: 14px 18px; gap: 8px; }
          .uc-badge { display: none; }
          .uc-hero-sub { display: none; }
          .uc-left-footer { padding: 8px 18px; }
          .uc-right { width: 100%; flex: 1; }
          .uc-form-scroll { padding: 12px 18px 0; }
        }

        /* ════════════ TABLET ════════════ */
        @media (min-width: 641px) and (max-width: 960px) {
          .uc-right { width: clamp(280px, 44vw, 380px); }
        }
      `}</style>

      {/* ── LEFT ── */}
      <div className="uc-left">
        <IkigaPattern />
        <svg className="uc-landscape" viewBox="0 0 600 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,200 L0,120 Q50,90 100,110 Q150,130 200,100 Q250,70 300,85 Q350,100 400,75 Q450,50 500,70 Q550,60 600,80 L600,200 Z" fill="#3B2008" opacity="0.5"/>
          <path d="M0,200 L0,150 Q80,130 160,145 Q240,160 320,140 Q400,120 480,135 Q540,145 600,130 L600,200 Z" fill="#2A1505" opacity="0.7"/>
        </svg>

        <div className="uc-left-content">
          <div className="uc-badge">UBURINZI BW'UMUCO</div>
          <h1 className="uc-hero-title">
            Preserving heritage<br/>
            <span className="uc-hero-accent">for generations</span><br/>
            to come.
          </h1>
          <p className="uc-hero-sub">
            Rwanda's heart beats in its language, its stories, and its values.
            Journey with us through the digital preservation of our ancestors' wisdom.
          </p>
          <div className="uc-stats">
            {[["500+","Imigani"],["24/7","AI Assistance"],["10k+","Abanyamuryango"]].map(([n,l]) => (
              <div key={l}>
                <span className="uc-stat-num">{n}</span>
                <span className="uc-stat-label">{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="uc-left-footer">
          © 2026 UMUCO CORE. ALL RIGHTS RESERVED.
          <span style={{marginLeft:'auto',display:'flex',gap:'8px',alignItems:'center'}}>
            <span className="uc-lang">EN</span>
            <span style={{color:'#7A5C3A'}}>•</span>
            <span className="uc-lang-active">RW</span>
          </span>
        </div>
      </div>

      {/* ── RIGHT ── */}
      <div className="uc-right">
        <div className="uc-form-scroll">
          <div className={`uc-form-card${animating ? ' hidden' : ''}`}>

            <div className="uc-logo-block">
              <UmucoLogo size={40} />
              <span className="uc-logo-text">Umuco Core</span>
            </div>

            <div className="uc-greeting">
              <h2>{mode === 'login' ? 'Murakaza Neza' : 'Injira Umuryango'}</h2>
              <p>{mode === 'login' ? '✦ Welcome Back • Bienvenue' : '✦ Join Our Cultural Community'}</p>
            </div>

            <div className="uc-tabs">
              <button className={`uc-tab${mode==='login'?' active':''}`} onClick={()=>switchMode('login')}>Sign In</button>
              <button className={`uc-tab${mode==='signup'?' active':''}`} onClick={()=>switchMode('signup')}>Create Account</button>
            </div>

            <div className="uc-fields">
              {mode === 'signup' && (
                <div className="uc-field">
                  <label className="uc-label">Full Name</label>
                  <div className="uc-input-wrap">
                    <span className="uc-input-icon">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </span>
                    <input className="uc-input" type="text" placeholder="Amazina yawe yuzuye" value={name} onChange={e=>setName(e.target.value)}/>
                  </div>
                </div>
              )}

              <div className="uc-field">
                <label className="uc-label">Email Address</label>
                <div className="uc-input-wrap">
                  <span className="uc-input-icon">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </span>
                  <input className="uc-input" type="email" placeholder="name@umuco.rw" value={email} onChange={e=>setEmail(e.target.value)}/>
                </div>
              </div>

              <div className="uc-field">
                <div className="uc-field-head">
                  <label className="uc-label">Password</label>
                  {mode==='login' && <a href="#" className="uc-forgot">Forgot password?</a>}
                </div>
                <div className="uc-input-wrap">
                  <span className="uc-input-icon">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </span>
                  <input className="uc-input" type={showPass?"text":"password"} placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)}/>
                  <button className="uc-eye" onClick={()=>setShowPass(!showPass)}>{showPass?<EyeOff/>:<EyeOpen/>}</button>
                </div>
              </div>

              {mode === 'signup' && (
                <div className="uc-field">
                  <label className="uc-label">Confirm Password</label>
                  <div className="uc-input-wrap">
                    <span className="uc-input-icon">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </span>
                    <input className="uc-input" type={showConfirmPass?"text":"password"} placeholder="••••••••" value={confirmPass} onChange={e=>setConfirmPass(e.target.value)}/>
                    <button className="uc-eye" onClick={()=>setShowConfirmPass(!showConfirmPass)}>{showConfirmPass?<EyeOff/>:<EyeOpen/>}</button>
                  </div>
                </div>
              )}
            </div>

            {mode === 'login' ? (
              <label className="uc-check-row">
                <input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)}/>
                <span>Remember me for 30 days</span>
              </label>
            ) : (
              <label className="uc-check-row">
                <input type="checkbox"/>
                <span>I agree to the <a href="#" className="uc-forgot">Terms of Use</a> and <a href="#" className="uc-forgot">Privacy Policy</a></span>
              </label>
            )}

            <button className="uc-submit" onClick={() => navigate("/dashboard")}>
              {mode === 'login' ? 'Sign In / Injira →' : 'Create Account / Iyandikishe →'}
            </button>

            <div className="uc-divider">
              <div className="uc-divider-line"/>
              <span className="uc-divider-text">OR CONTINUE WITH</span>
              <div className="uc-divider-line"/>
            </div>

            <div className="uc-socials">
              <button className="uc-social-btn">
                <svg width="15" height="15" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google
              </button>
              <button className="uc-social-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#1D1D1F"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.42.07 2.41.74 3.24.8 1.23-.24 2.41-.93 3.72-.84 1.58.13 2.77.71 3.54 1.8-3.24 1.94-2.48 6.23.5 7.42-.59 1.53-1.36 3.03-3 3.7zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                Apple
              </button>
            </div>

            <p className="uc-switch">
              {mode === 'login'
                ? <>Don't have an account? <button className="uc-switch-btn" onClick={()=>switchMode('signup')}>Create an account</button></>
                : <>Already have an account? <button className="uc-switch-btn" onClick={()=>switchMode('login')}>Sign in</button></>
              }
            </p>

            <div className="uc-secure">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#8B7355" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              SECURE ENCRYPTED ACCESS
            </div>

          </div>
        </div>

        <div className="uc-footer">
          <a href="#">Privacy Policy</a>
          <span className="uc-dot">•</span>
          <a href="#">Terms of Use</a>
          <span className="uc-dot">•</span>
          <a href="#">Help Center</a>
        </div>
      </div>
    </div>
  );
}