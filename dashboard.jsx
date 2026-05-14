import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UmucoLogo = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 78 Q72 55 48 28 Q38 16 42 8 Q46 2 52 6 Q58 12 62 22 Q74 50 88 68" stroke="#2D5A27" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
    <path d="M100 78 Q128 55 152 28 Q162 16 158 8 Q154 2 148 6 Q142 12 138 22 Q126 50 112 68" stroke="#2D5A27" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
    <path d="M54 10 Q60 18 66 30" stroke="#C9A84C" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.85"/>
    <path d="M146 10 Q140 18 134 30" stroke="#C9A84C" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.85"/>
    <path d="M78 70 Q68 80 66 95 Q64 110 70 120 Q76 130 86 136 Q93 140 100 141 Q107 140 114 136 Q124 130 130 120 Q136 110 134 95 Q132 80 122 70 L100 78 Z" stroke="#2D5A27" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
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

const navItems = [
  { icon: "grid", label: "Dashboard", active: true },
  { icon: "globe", label: "Learn Kinyarwanda" },
  { icon: "book", label: "Imigani & Ibisakuzo" },
  { icon: "cpu", label: "AI Assistant" },
  { icon: "flag", label: "History of Rwanda" },
  { icon: "rss", label: "Discovery Feed" },
];

const recentItems = [
  { icon: "clock", label: "Kingdom Era Politics" },
  { icon: "settings", label: "Settings" },
];

const recommendations = [
  { title: "The King's Residence Architecture", category: "History", time: "8 min read", color: "#8B3A1A" },
  { title: "Names of the Thousand Hills", category: "Geography", time: "5 min read", color: "#4A7C3F" },
  { title: "Symbolism in Agaseke Weaving", category: "Tradition", time: "12 min read", color: "#7A5C2E" },
];

const stories = [
  { tag: "LITERATURE", title: "The Evolution of Kinyarwanda Poetry", desc: "Discover how traditional oral poetry transitioned into modern...", img: "📖" },
  { tag: "DANCE", title: "Intore: The Dance of the Heroes", desc: "Exploring the martial roots and symbolic gestures of Rwanda's...", img: "🦅" },
  { tag: "CUISINE", title: "Flavors of the Ancestors", desc: "How ancient agricultural practices shaped the unique...", img: "🍲" },
];

const IconSvg = ({ name, size = 16, color = "currentColor" }) => {
  const icons = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    globe: <><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></>,
    cpu: <><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></>,
    flag: <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></>,
    rss: <><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
    search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    share: <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></>,
    play: <><polygon points="5 3 19 12 5 21 5 3"/></>,
    music: <><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></>,
    bookmark: <><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></>,
    chevronRight: <><polyline points="9 18 15 12 9 6"/></>,
    menu: <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  );
};

export default function Dashboard({ onLogout }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [playing, setPlaying] = useState(false);
  const [progress] = useState(38);

  return (
    <div className="db-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Cormorant+Garamond:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; overflow: hidden; }

        .db-root {
          display: flex;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          font-family: 'Lato', sans-serif;
          background: #F5EFE4;
        }

        /* ══════════ SIDEBAR ══════════ */
        .db-sidebar {
          width: 168px;
          flex-shrink: 0;
          background: #FDFAF5;
          border-right: 1px solid #EDE3D4;
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow: hidden;
          z-index: 100;
          transition: transform 0.3s ease;
        }
        .db-sidebar-brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 18px 12px 14px;
          border-bottom: 1px solid #EDE3D4;
          gap: 4px;
        }
        .db-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px;
          font-weight: 600;
          color: #3B1F08;
          letter-spacing: 0.3px;
          text-align: center;
          line-height: 1.2;
        }
        .db-brand-sub {
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #A88B70;
          text-transform: uppercase;
        }

        .db-nav { flex: 1; padding: 10px 0; overflow-y: auto; scrollbar-width: none; }
        .db-nav::-webkit-scrollbar { display: none; }

        .db-nav-item {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 9px 14px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 400;
          color: #7A5C3A;
          border-radius: 0;
          transition: all 0.18s;
          border-left: 3px solid transparent;
          text-decoration: none;
        }
        .db-nav-item:hover { background: #F5EFE4; color: #3B1F08; }
        .db-nav-item.active {
          background: #FDF0E6;
          color: #8B3A1A;
          font-weight: 700;
          border-left: 3px solid #8B3A1A;
        }

        .db-nav-section {
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #C4A882;
          padding: 14px 14px 4px;
          text-transform: uppercase;
        }

        .db-sidebar-bottom { padding: 12px; border-top: 1px solid #EDE3D4; }
        .db-share-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 9px 12px;
          background: #8B3A1A;
          color: #FDF8F0;
          border: none;
          border-radius: 7px;
          font-size: 11px;
          font-weight: 700;
          font-family: 'Lato', sans-serif;
          cursor: pointer;
          letter-spacing: 0.4px;
          transition: filter 0.2s;
        }
        .db-share-btn:hover { filter: brightness(1.1); }

        /* ══════════ MAIN AREA ══════════ */
        .db-main {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow: hidden;
        }

        /* ══════════ TOPBAR ══════════ */
        .db-topbar {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 20px;
          height: 56px;
          background: #FDFAF5;
          border-bottom: 1px solid #EDE3D4;
        }
        .db-topbar-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 600;
          color: #3B1F08;
          flex-shrink: 0;
        }
        .db-search-wrap {
          flex: 1;
          max-width: 340px;
          position: relative;
          margin-left: 8px;
        }
        .db-search-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: #A88B70; }
        .db-search {
          width: 100%;
          padding: 7px 14px 7px 34px;
          border: 1.5px solid #E8D9C0;
          border-radius: 20px;
          font-size: 12px;
          color: #3B1F08;
          background: #F5EFE4;
          font-family: 'Lato', sans-serif;
          transition: border-color 0.2s;
        }
        .db-search:focus { outline: none; border-color: #8B3A1A; background: #FFF9F2; }
        .db-search::placeholder { color: #A88B70; }

        .db-topbar-actions { display: flex; align-items: center; gap: 10px; margin-left: auto; }
        .db-icon-btn {
          width: 34px; height: 34px;
          border-radius: 50%;
          border: none;
          background: #F5EFE4;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #7A5C3A;
          transition: background 0.18s;
          position: relative;
        }
        .db-icon-btn:hover { background: #EDE3D4; }
        .db-notif-dot {
          position: absolute; top: 6px; right: 6px;
          width: 7px; height: 7px;
          background: #C0392B; border-radius: 50%;
          border: 1.5px solid #FDFAF5;
        }
        .db-avatar {
          width: 34px; height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8B3A1A, #C9A96E);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 700; color: #FDF8F0;
          cursor: pointer;
          font-family: 'Lato', sans-serif;
          border: 2px solid #E8D9C0;
        }
        .db-hamburger {
          display: none;
          background: none; border: none; cursor: pointer;
          color: #7A5C3A; padding: 4px;
        }

        /* ══════════ CONTENT ══════════ */
        .db-content {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 18px 20px 24px;
          scrollbar-width: thin;
          scrollbar-color: #E8D9C0 transparent;
        }
        .db-content::-webkit-scrollbar { width: 5px; }
        .db-content::-webkit-scrollbar-track { background: transparent; }
        .db-content::-webkit-scrollbar-thumb { background: #E8D9C0; border-radius: 10px; }

        /* ══════════ HERO BANNER ══════════ */
        .db-hero {
          background: #8B3A1A;
          border-radius: 12px;
          padding: 28px 28px 28px 32px;
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 24px;
          position: relative;
          overflow: hidden;
          min-height: 160px;
        }
        .db-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 18px,
            rgba(255,255,255,0.03) 18px,
            rgba(255,255,255,0.03) 36px
          );
        }
        .db-hero-left { flex: 1; min-width: 0; position: relative; z-index: 1; }
        .db-hero-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 9px; font-weight: 700; letter-spacing: 2px;
          color: #F0C87A; text-transform: uppercase; margin-bottom: 10px;
        }
        .db-hero-badge::before { content: '◇'; font-size: 8px; }
        .db-hero-quote {
          font-family: 'Playfair Display', serif;
          font-size: clamp(17px, 2.4vw, 26px);
          font-style: italic;
          font-weight: 500;
          color: #F5E6C8;
          line-height: 1.35;
          margin-bottom: 10px;
        }
        .db-hero-translation {
          font-size: 12px;
          color: rgba(245,230,200,0.65);
          line-height: 1.6;
          font-weight: 300;
          max-width: 340px;
        }
        .db-hero-btn {
          margin-top: 18px;
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 22px;
          background: rgba(245,230,200,0.15);
          border: 1.5px solid rgba(245,230,200,0.4);
          color: #F5E6C8;
          border-radius: 7px;
          font-size: 12px; font-weight: 700;
          font-family: 'Lato', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.5px;
        }
        .db-hero-btn:hover { background: rgba(245,230,200,0.25); border-color: rgba(245,230,200,0.7); }
        .db-hero-img {
          width: clamp(100px, 18vw, 170px);
          height: clamp(100px, 18vw, 170px);
          border-radius: 10px;
          flex-shrink: 0;
          position: relative; z-index: 1;
          background: #6B2A10;
          overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .db-hero-pattern {
          width: 100%; height: 100%;
        }

        /* ══════════ TWO-COL LAYOUT ══════════ */
        .db-two-col {
          display: grid;
          grid-template-columns: 1fr 240px;
          gap: 20px;
          margin-bottom: 24px;
        }

        /* ══════════ SECTION HEADER ══════════ */
        .db-section-head {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 12px;
        }
        .db-section-title {
          font-family: 'Playfair Display', serif;
          font-size: 16px; font-weight: 600; color: #3B1F08;
        }
        .db-explore-link {
          font-size: 11px; font-weight: 700; color: #8B3A1A;
          cursor: pointer; text-decoration: none;
          display: flex; align-items: center; gap: 2px;
        }

        /* ══════════ MUSIC CARD ══════════ */
        .db-music-card {
          background: #FDFAF5;
          border-radius: 10px;
          border: 1px solid #EDE3D4;
          overflow: hidden;
        }
        .db-music-main {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 16px;
          border-bottom: 1px solid #F0E8D8;
        }
        .db-music-thumb {
          width: 52px; height: 52px;
          border-radius: 7px;
          background: linear-gradient(135deg, #3B1F08, #8B3A1A);
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }
        .db-music-info { flex: 1; min-width: 0; }
        .db-music-title {
          font-family: 'Playfair Display', serif;
          font-size: 13px; font-weight: 600; color: #3B1F08;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .db-music-sub { font-size: 11px; color: #A88B70; margin-top: 2px; }
        .db-play-btn {
          width: 38px; height: 38px;
          border-radius: 50%;
          background: #8B3A1A;
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #FDF8F0;
          transition: filter 0.2s;
          flex-shrink: 0;
        }
        .db-play-btn:hover { filter: brightness(1.15); }
        .db-progress-wrap { padding: 0 16px 4px; }
        .db-progress-bar {
          width: 100%; height: 3px;
          background: #EDE3D4; border-radius: 2px;
          margin: 8px 0 4px;
          cursor: pointer;
        }
        .db-progress-fill {
          height: 100%; border-radius: 2px;
          background: linear-gradient(90deg, #8B3A1A, #C9A96E);
          transition: width 0.2s;
        }
        .db-progress-times {
          display: flex; justify-content: space-between;
          font-size: 10px; color: #A88B70;
        }
        .db-music-tracks {
          display: grid; grid-template-columns: 1fr 1fr;
          padding: 10px 16px 12px;
          gap: 6px;
        }
        .db-track {
          display: flex; align-items: center; gap: 7px;
          padding: 6px 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.15s;
        }
        .db-track:hover { background: #F5EFE4; }
        .db-track-name { font-size: 11px; font-weight: 700; color: #3B1F08; }
        .db-track-sub { font-size: 9px; color: #A88B70; text-transform: uppercase; letter-spacing: 1px; }
        .db-track-time { margin-left: auto; font-size: 10px; color: #A88B70; }

        /* ══════════ RECOMMENDATIONS ══════════ */
        .db-reco-card {
          background: #FDFAF5;
          border-radius: 10px;
          border: 1px solid #EDE3D4;
          overflow: hidden;
        }
        .db-reco-head { padding: 12px 14px; border-bottom: 1px solid #F0E8D8; }
        .db-reco-title { font-family: 'Playfair Display', serif; font-size: 14px; font-weight: 600; color: #3B1F08; }
        .db-reco-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px;
          border-bottom: 1px solid #F5EFE4;
          cursor: pointer;
          transition: background 0.15s;
        }
        .db-reco-item:last-of-type { border-bottom: none; }
        .db-reco-item:hover { background: #F5EFE4; }
        .db-reco-thumb {
          width: 38px; height: 38px; border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; flex-shrink: 0;
        }
        .db-reco-info { flex: 1; min-width: 0; }
        .db-reco-name { font-size: 11px; font-weight: 700; color: #3B1F08; line-height: 1.3; }
        .db-reco-meta { font-size: 10px; color: #A88B70; margin-top: 1px; }
        .db-bookmark { color: #C4A882; cursor: pointer; flex-shrink: 0; transition: color 0.15s; }
        .db-bookmark:hover { color: #8B3A1A; }
        .db-reco-nav {
          display: flex; justify-content: flex-end; gap: 6px;
          padding: 8px 14px;
          border-top: 1px solid #F0E8D8;
        }
        .db-nav-arrow {
          width: 28px; height: 28px; border-radius: 50%;
          border: 1.5px solid #E8D9C0;
          background: #FDFAF5;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #7A5C3A;
          transition: all 0.15s;
        }
        .db-nav-arrow:hover { background: #8B3A1A; color: #FDF8F0; border-color: #8B3A1A; }
        .db-view-all {
          display: block; text-align: center; padding: 6px;
          font-size: 10px; font-weight: 700; color: #8B3A1A;
          cursor: pointer; letter-spacing: 0.5px;
          text-decoration: none;
        }

        /* ══════════ STORIES GRID ══════════ */
        .db-stories-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .db-story-card {
          background: #FDFAF5;
          border-radius: 10px;
          border: 1px solid #EDE3D4;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .db-story-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(139,58,26,0.12);
        }
        .db-story-img {
          height: 120px;
          display: flex; align-items: center; justify-content: center;
          font-size: 40px;
          position: relative; overflow: hidden;
        }
        .db-story-body { padding: 12px 14px 14px; }
        .db-story-tag {
          display: inline-block;
          font-size: 8px; font-weight: 700; letter-spacing: 2px;
          padding: 3px 7px; border-radius: 3px;
          margin-bottom: 7px;
          text-transform: uppercase;
        }
        .db-story-title {
          font-family: 'Playfair Display', serif;
          font-size: 13px; font-weight: 600; color: #3B1F08;
          line-height: 1.35; margin-bottom: 6px;
        }
        .db-story-desc { font-size: 11px; color: #8B7355; line-height: 1.5; margin-bottom: 10px; }
        .db-read-link {
          font-size: 11px; font-weight: 700; color: #8B3A1A;
          display: flex; align-items: center; gap: 3px;
          cursor: pointer;
        }

        /* Story tag colors */
        .tag-lit { background: #FDF0E6; color: #8B3A1A; }
        .tag-dance { background: #E8F0E8; color: #2D5A27; }
        .tag-cuisine { background: #FDF5E0; color: #7A5C2E; }

        /* Story bg colors */
        .bg-lit { background: linear-gradient(135deg, #3B1F08 0%, #8B3A1A 100%); }
        .bg-dance { background: linear-gradient(135deg, #1A2E1A 0%, #2D5A27 100%); }
        .bg-cuisine { background: linear-gradient(135deg, #2E1F00 0%, #7A5C2E 100%); }

        /* ══════════ MOBILE OVERLAY ══════════ */
        .db-overlay {
          display: none;
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.4);
          z-index: 99;
        }

        /* ══════════ RESPONSIVE ══════════ */
        @media (max-width: 900px) {
          .db-two-col { grid-template-columns: 1fr; }
          .db-reco-card { display: none; }
        }
        @media (max-width: 700px) {
          .db-sidebar {
            position: fixed; top: 0; left: 0; bottom: 0;
            transform: translateX(-100%);
          }
          .db-sidebar.open { transform: translateX(0); box-shadow: 4px 0 20px rgba(0,0,0,0.2); }
          .db-overlay.open { display: block; }
          .db-hamburger { display: flex; }
          .db-topbar-title { font-size: 17px; }
          .db-stories-grid { grid-template-columns: 1fr; }
          .db-hero { flex-direction: column; align-items: flex-start; }
          .db-hero-img { width: 100%; height: 100px; }
        }
        @media (min-width: 701px) and (max-width: 1000px) {
          .db-stories-grid { grid-template-columns: repeat(2, 1fr); }
          .db-sidebar { width: 148px; }
        }
      `}</style>

      {/* SIDEBAR */}
      <aside className={`db-sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="db-sidebar-brand">
          <UmucoLogo size={34} />
          <span className="db-brand-name">Umuco Core</span>
          <span className="db-brand-sub">Contemporary Wisdom</span>
        </div>

        <nav className="db-nav">
          {navItems.map(item => (
            <div
              key={item.label}
              className={`db-nav-item${activeNav === item.label ? ' active' : ''}`}
              onClick={() => { setActiveNav(item.label); setSidebarOpen(false); }}
            >
              <IconSvg name={item.icon} size={14} color={activeNav === item.label ? '#8B3A1A' : '#A88B70'}/>
              {item.label}
            </div>
          ))}

          <div className="db-nav-section">Recently Visited</div>
          {recentItems.map(item => (
            <div key={item.label} className="db-nav-item" onClick={() => setSidebarOpen(false)}>
              <IconSvg name={item.icon} size={14} color="#A88B70"/>
              {item.label}
            </div>
          ))}
        </nav>

        <div className="db-sidebar-bottom">
          <button className="db-share-btn">
            <IconSvg name="share" size={13} color="#FDF8F0"/>
            Share a Story
          </button>
        </div>
      </aside>

      {/* OVERLAY */}
      <div className={`db-overlay${sidebarOpen ? ' open' : ''}`} onClick={() => setSidebarOpen(false)}/>

      {/* MAIN */}
      <div className="db-main">
        {/* TOPBAR */}
        <header className="db-topbar">
          <button className="db-hamburger" onClick={() => setSidebarOpen(true)}>
            <IconSvg name="menu" size={20}/>
          </button>
          <span className="db-topbar-title">Dashboard</span>
          <div className="db-search-wrap">
            <span className="db-search-icon"><IconSvg name="search" size={13}/></span>
            <input className="db-search" type="text" placeholder="Search heritage archive..."/>
          </div>
          <div className="db-topbar-actions">
            <button className="db-icon-btn">
              <IconSvg name="bell" size={16}/>
              <span className="db-notif-dot"/>
            </button>
            <button className="db-icon-btn">
              <IconSvg name="settings" size={16}/>
            </button>
            <div className="db-avatar" onClick={() => navigate("/login")} title="Click to logout">MN</div>
            <div className="db-avatar" title="Profile">MN</div>
     <button className="db-logout-btn-top" onClick={() => navigate("/login")}>
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
             <polyline points="16 17 21 12 16 7"/>
             <line x1="21" y1="12" x2="9" y2="12"/>
           </svg>
         Logout
     </button>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <main className="db-content">

          {/* HERO */}
          <div className="db-hero">
            <div className="db-hero-left">
              <div className="db-hero-badge">Umugani w'Umunsi</div>
              <div className="db-hero-quote">"Utazi iyo ava, ntamenya iyo ajya."</div>
              <div className="db-hero-translation">"He who does not know where he came from, cannot know where he is going."</div>
              <button className="db-hero-btn">Reveal Meaning</button>
            </div>
            <div className="db-hero-img">
              <svg className="db-hero-pattern" viewBox="0 0 170 170" xmlns="http://www.w3.org/2000/svg">
                <rect width="170" height="170" fill="#5C2010"/>
                {/* Imigongo-style chevron pattern */}
                {[0,1,2,3,4,5].map(i => (
                  <g key={i} transform={`translate(0, ${i * 28 - 14})`}>
                    <polyline points="0,28 42,0 85,28 128,0 170,28" fill="none" stroke="#C9A96E" strokeWidth="3.5" opacity="0.9"/>
                    <polyline points="0,38 42,10 85,38 128,10 170,38" fill="none" stroke="#8B3A1A" strokeWidth="5" opacity="0.5"/>
                  </g>
                ))}
                <rect width="170" height="170" fill="url(#vignette)"/>
                <defs>
                  <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
                    <stop offset="40%" stopColor="transparent"/>
                    <stop offset="100%" stopColor="#3B1A08" stopOpacity="0.6"/>
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* TWO COL: MUSIC + RECO */}
          <div className="db-two-col">
            {/* MUSIC */}
            <div>
              <div className="db-section-head">
                <span className="db-section-title">Cultural Melodies</span>
                <a className="db-explore-link">Explore Library <IconSvg name="chevronRight" size={11}/></a>
              </div>
              <div className="db-music-card">
                <div className="db-music-main">
                  <div className="db-music-thumb">🎵</div>
                  <div className="db-music-info">
                    <div className="db-music-title">Inanga za Kinyarwanda</div>
                    <div className="db-music-sub">Traditional Trough-Zither Medleys</div>
                    <div className="db-progress-wrap" style={{padding:'6px 0 0'}}>
                      <div className="db-progress-bar">
                        <div className="db-progress-fill" style={{width: `${progress}%`}}/>
                      </div>
                      <div className="db-progress-times">
                        <span>03:45</span><span>12:20</span>
                      </div>
                    </div>
                  </div>
                  <button className="db-play-btn" onClick={() => setPlaying(!playing)}>
                    {playing
                      ? <svg width="14" height="14" viewBox="0 0 24 24" fill="#FDF8F0" stroke="none"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                      : <IconSvg name="play" size={14} color="#FDF8F0"/>
                    }
                  </button>
                </div>
                <div className="db-music-tracks">
                  {[["Urukerereza Drums","RITUAL RHYTHMS","4:12"],["Royal Court Songs","HISTORICAL ARCHIVE","6:50"]].map(([n,s,t]) => (
                    <div className="db-track" key={n}>
                      <IconSvg name="music" size={13} color="#C9A96E"/>
                      <div>
                        <div className="db-track-name">{n}</div>
                        <div className="db-track-sub">{s}</div>
                      </div>
                      <span className="db-track-time">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RECOMMENDATIONS */}
            <div>
              <div className="db-section-head">
                <span className="db-section-title" style={{fontSize:'14px'}}>Recommended for You</span>
              </div>
              <div className="db-reco-card">
                {recommendations.map((r, i) => (
                  <div className="db-reco-item" key={i}>
                    <div className="db-reco-thumb" style={{background: r.color + '22'}}>
                      <span style={{fontSize:'18px'}}>{['🏛️','⛰️','🧺'][i]}</span>
                    </div>
                    <div className="db-reco-info">
                      <div className="db-reco-name">{r.title}</div>
                      <div className="db-reco-meta">{r.category} • {r.time}</div>
                    </div>
                    <div className="db-bookmark"><IconSvg name="bookmark" size={14}/></div>
                  </div>
                ))}
                <div className="db-reco-nav">
                  <div className="db-nav-arrow"><IconSvg name="chevronRight" size={13} color="currentColor" style={{transform:'rotate(180deg)'}}/></div>
                  <div className="db-nav-arrow"><IconSvg name="chevronRight" size={13}/></div>
                </div>
                <a className="db-view-all">View All Recommendations ›</a>
              </div>
            </div>
          </div>

          {/* FEATURED STORIES */}
          <div className="db-section-head">
            <span className="db-section-title">Featured Stories</span>
          </div>
          <div className="db-stories-grid">
            {stories.map((s, i) => (
              <div className="db-story-card" key={i}>
                <div className={`db-story-img ${['bg-lit','bg-dance','bg-cuisine'][i]}`}>
                  <span>{s.img}</span>
                </div>
                <div className="db-story-body">
                  <span className={`db-story-tag ${['tag-lit','tag-dance','tag-cuisine'][i]}`}>{s.tag}</span>
                  <div className="db-story-title">{s.title}</div>
                  <div className="db-story-desc">{s.desc}</div>
                  <div className="db-read-link">Read Story <IconSvg name="chevronRight" size={11}/></div>
                </div>
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}