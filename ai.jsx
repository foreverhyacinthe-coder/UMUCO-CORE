import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SUGGESTED_PROMPTS = [
  { icon: "📖", label: "Tell me a folk tale" },
  { icon: "🤝", label: "Common greetings" },
  { icon: "🌿", label: "Daily Proverb" },
  { icon: "🔊", label: "Voice translation" },
];

const HISTORY = [
  {
    id: 1,
    label: "Gihanga and the Cows",
    time: "2 hours ago",
    icon: "🐄",
    group: "TODAY",
  },
  { id: 2, label: "Wedding Traditions", time: "", icon: "💍", group: "TODAY" },
  {
    id: 3,
    label: "Simple Greetings",
    time: "",
    icon: "👋",
    group: "YESTERDAY",
  },
  {
    id: 4,
    label: "Imigongo Art Form",
    time: "",
    icon: "🎨",
    group: "YESTERDAY",
  },
  {
    id: 5,
    label: "Musinga's Legacy",
    time: "",
    icon: "👑",
    group: "YESTERDAY",
  },
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    role: "assistant",
    text: "Muraho! I am your Umuco Cultural Assistant. I can help you translate Kinyarwanda, tell you ancient stories of kings, or explain the deep meanings behind our traditions. What would you like to explore today?",
    time: "11:00 AM",
  },
  {
    id: 2,
    role: "user",
    text: "Can you tell me more about the story of Gihanga Ngomijana?",
    time: "11:02 AM",
  },
  {
    id: 3,
    role: "assistant",
    text: 'Ah, Gihanga Ngomijana, the legendary first King of Rwanda! Tradition says he descended from heaven to unify the clans. He is celebrated as the great architect of our culture, credited with introducing fire, the arts of ironworking, and the sacred relationship with cattle (Inyambo).\n\nHe founded the royal lineage that would shape Rwanda for centuries, and his name — Gihanga — literally means "the creator" or "the founder." Many oral traditions describe him as a figure of immense wisdom and divine favor.',
    time: "11:02 AM",
  },
];

export default function AiPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeHistory, setActiveHistory] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText) return;
    setInput("");

    const userMsg = {
      id: Date.now(),
      role: "user",
      text: userText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system:
            "You are Umuco, a knowledgeable and warm cultural assistant specializing in Rwandan heritage, history, language (Kinyarwanda), traditions, proverbs, folk tales, and royal history. Answer with depth, cultural respect, and storytelling flair. Keep responses concise but meaningful — 2 to 4 paragraphs max.",
          messages: [{ role: "user", content: userText }],
        }),
      });

      const data = await response.json();
      const replyText =
        data?.content?.[0]?.text ||
        "Mbabarira — I couldn't find an answer right now. Please try again.";

      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: replyText,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } catch {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: "Mbabarira — something went wrong. Please try again.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const grouped = HISTORY.reduce((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {});

  return (
    <div style={styles.root}>
      {/* Sidebar */}
      <aside
        style={{
          ...styles.sidebar,
          width: sidebarOpen ? 220 : 0,
          overflow: "hidden",
          transition: "width 0.3s",
        }}
      >
        <div style={styles.sidebarInner}>
          {/* Logo */}
          <div style={styles.logo}>
            <div style={styles.logoIcon}>
              <span style={{ fontSize: 18 }}>🏔️</span>
            </div>
            <div>
              <div style={styles.logoTitle}>Umuco</div>
              <div style={styles.logoSub}>Core</div>
            </div>
          </div>

          {/* History */}
          <div style={styles.historyScroll}>
            {Object.entries(grouped).map(([group, items]) => (
              <div key={group}>
                <div style={styles.groupLabel}>{group}</div>
                {items.map((item) => (
                  <button
                    key={item.id}
                    style={{
                      ...styles.historyItem,
                      background:
                        activeHistory === item.id ? "#7a1a1a22" : "transparent",
                      borderLeft:
                        activeHistory === item.id
                          ? "3px solid #8B1A1A"
                          : "3px solid transparent",
                    }}
                    onClick={() => setActiveHistory(item.id)}
                  >
                    <span style={styles.historyIcon}>{item.icon}</span>
                    <div style={styles.historyText}>
                      <span style={styles.historyLabel}>{item.label}</span>
                      {item.time && (
                        <span style={styles.historyTime}>{item.time}</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* New Story */}
          <button
            style={styles.newStoryBtn}
            onClick={() => setMessages([INITIAL_MESSAGES[0]])}
          >
            <span>✦</span> Start New Story
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={styles.main}>
        {/* Top bar */}
        <header style={styles.header}>
          <div style={styles.headerLeft}>
            <button
              style={styles.backBtn}
              onClick={() => navigate("/dashboard")}
              title="Back to Dashboard"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              <span>Dashboard</span>
            </button>
            <button
              style={styles.sidebarToggle}
              onClick={() => setSidebarOpen((o) => !o)}
              title="Toggle sidebar"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>

          {/* Assistant label */}
          <div style={styles.headerCenter}>
            <div style={styles.assistantAvatar}>
              <span>✦</span>
            </div>
            <div>
              <div style={styles.assistantName}>Umuco Assistant</div>
              <div style={styles.assistantSub}>
                Conversation Started: Rwanda Heritage
              </div>
            </div>
          </div>

          {/* Right icons */}
          <div style={styles.headerRight}>
            <button style={styles.iconBtn} title="Share">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </button>
            <button style={styles.iconBtn} title="Bookmark">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>
            <button style={styles.iconBtn} title="Notifications">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>
            <button style={styles.iconBtn} title="Settings">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>
            <div style={styles.avatar}>
              <span>👤</span>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div style={styles.messagesArea}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                ...styles.msgRow,
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              {msg.role === "assistant" && (
                <div style={styles.msgAvatar}>
                  <span style={{ fontSize: 14 }}>✦</span>
                </div>
              )}
              <div
                style={
                  msg.role === "user" ? styles.userBubble : styles.aiBubble
                }
              >
                {msg.text.split("\n").map((line, i) =>
                  line ? (
                    <p key={i} style={{ margin: "0 0 6px" }}>
                      {line}
                    </p>
                  ) : (
                    <br key={i} />
                  ),
                )}
                <div
                  style={{
                    ...styles.msgTime,
                    textAlign: msg.role === "user" ? "right" : "left",
                    color:
                      msg.role === "user" ? "rgba(255,255,255,0.6)" : "#aaa",
                  }}
                >
                  {msg.time}
                  {msg.role === "assistant" && (
                    <span style={{ marginLeft: 4 }}>↩</span>
                  )}
                </div>
              </div>
              {msg.role === "user" && (
                <div style={styles.userAvatar}>
                  <span style={{ fontSize: 14 }}>👤</span>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div style={{ ...styles.msgRow, justifyContent: "flex-start" }}>
              <div style={styles.msgAvatar}>
                <span style={{ fontSize: 14 }}>✦</span>
              </div>
              <div style={styles.aiBubble}>
                <div style={styles.typingDots}>
                  <span style={{ ...styles.dot, animationDelay: "0s" }} />
                  <span style={{ ...styles.dot, animationDelay: "0.2s" }} />
                  <span style={{ ...styles.dot, animationDelay: "0.4s" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggested prompts */}
        <div style={styles.suggestions}>
          {SUGGESTED_PROMPTS.map((p) => (
            <button
              key={p.label}
              style={styles.suggestion}
              onClick={() => sendMessage(p.label)}
            >
              <span>{p.icon}</span> {p.label}
            </button>
          ))}
        </div>

        {/* Input */}
        <div style={styles.inputArea}>
          <button style={styles.micBtn} title="Voice input">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </button>
          <input
            ref={inputRef}
            style={styles.input}
            placeholder="Ask Umuco about history, language, or traditions..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button style={styles.attachBtn} title="Attach file">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
          </button>
          <button
            style={styles.sendBtn}
            onClick={() => sendMessage()}
            title="Send"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>

        <div style={styles.disclaimer}>
          Umuco AI Assistant can provide insights into traditional history, but
          always verify oral lineage with local elders.
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  root: {
    display: "flex",
    height: "100vh",
    background: "#FAF7F2",
    fontFamily: "'DM Sans', sans-serif",
    color: "#2c1a0e",
    overflow: "hidden",
  },

  // Sidebar
  sidebar: {
    background: "#fff",
    borderRight: "1px solid #e8ddd0",
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
  },
  sidebarInner: {
    width: 220,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "20px 0",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "0 18px 20px",
    borderBottom: "1px solid #f0e8dd",
  },
  logoIcon: {
    width: 36,
    height: 36,
    background: "#8B1A1A",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoTitle: {
    fontFamily: "'Lora', serif",
    fontSize: 16,
    fontWeight: 600,
    color: "#8B1A1A",
    lineHeight: 1.1,
  },
  logoSub: {
    fontSize: 11,
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  historyScroll: {
    flex: 1,
    overflowY: "auto",
    padding: "12px 0",
  },
  groupLabel: {
    fontSize: 10,
    fontWeight: 600,
    color: "#bbb",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    padding: "10px 18px 4px",
  },
  historyItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    width: "100%",
    padding: "8px 16px",
    cursor: "pointer",
    border: "none",
    textAlign: "left",
    transition: "background 0.15s",
    borderRadius: 0,
  },
  historyIcon: {
    fontSize: 15,
    flexShrink: 0,
  },
  historyText: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  historyLabel: {
    fontSize: 13,
    color: "#2c1a0e",
    fontWeight: 500,
    lineHeight: 1.2,
  },
  historyTime: {
    fontSize: 11,
    color: "#bbb",
  },
  newStoryBtn: {
    margin: "12px 14px 0",
    padding: "10px 14px",
    background: "#8B1A1A",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
    letterSpacing: 0.3,
  },

  // Main
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },

  // Header
  header: {
    display: "flex",
    alignItems: "center",
    padding: "12px 20px",
    background: "#fff",
    borderBottom: "1px solid #e8ddd0",
    gap: 12,
    flexShrink: 0,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "7px 14px",
    background: "#FAF7F2",
    border: "1px solid #e0d4c4",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
    color: "#2c1a0e",
    cursor: "pointer",
    transition: "background 0.15s",
  },
  sidebarToggle: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 6,
    color: "#888",
    borderRadius: 6,
  },
  headerCenter: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  assistantAvatar: {
    width: 40,
    height: 40,
    background: "#8B1A1A",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 16,
    flexShrink: 0,
  },
  assistantName: {
    fontFamily: "'Lora', serif",
    fontSize: 16,
    fontWeight: 600,
    color: "#1a0a00",
  },
  assistantSub: {
    fontSize: 12,
    color: "#999",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    marginLeft: "auto",
  },
  iconBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 8,
    color: "#888",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.15s",
  },
  avatar: {
    width: 34,
    height: 34,
    background: "#e8ddd0",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    cursor: "pointer",
    marginLeft: 4,
  },

  // Messages
  messagesArea: {
    flex: 1,
    overflowY: "auto",
    padding: "24px 28px",
    display: "flex",
    flexDirection: "column",
    gap: 20,
    background: "#FAF7F2",
  },
  msgRow: {
    display: "flex",
    alignItems: "flex-end",
    gap: 10,
    animation: "fadeIn 0.3s ease",
  },
  msgAvatar: {
    width: 36,
    height: 36,
    background: "#8B1A1A",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    flexShrink: 0,
    fontSize: 14,
  },
  userAvatar: {
    width: 36,
    height: 36,
    background: "#d4c4b0",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: 16,
  },
  aiBubble: {
    background: "#fff",
    border: "1px solid #e8ddd0",
    borderRadius: "18px 18px 18px 4px",
    padding: "14px 18px",
    maxWidth: "65%",
    fontSize: 14,
    lineHeight: 1.65,
    color: "#2c1a0e",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  },
  userBubble: {
    background: "#8B1A1A",
    borderRadius: "18px 18px 4px 18px",
    padding: "14px 18px",
    maxWidth: "60%",
    fontSize: 14,
    lineHeight: 1.65,
    color: "#fff",
    boxShadow: "0 2px 8px rgba(139,26,26,0.25)",
  },
  msgTime: {
    fontSize: 11,
    marginTop: 6,
    opacity: 0.6,
  },

  // Typing
  typingDots: {
    display: "flex",
    gap: 5,
    padding: "2px 4px",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#8B1A1A",
    display: "inline-block",
    animation: "bounce 1.2s infinite",
    opacity: 0.7,
  },

  // Suggestions
  suggestions: {
    display: "flex",
    gap: 8,
    padding: "10px 24px",
    background: "#fff",
    borderTop: "1px solid #f0e8dd",
    flexWrap: "wrap",
  },
  suggestion: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 14px",
    background: "#FAF7F2",
    border: "1px solid #e0d4c4",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 500,
    color: "#2c1a0e",
    cursor: "pointer",
    transition: "all 0.15s",
    whiteSpace: "nowrap",
  },

  // Input
  inputArea: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 20px",
    background: "#fff",
    borderTop: "1px solid #f0e8dd",
  },
  micBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 8,
    color: "#888",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  input: {
    flex: 1,
    padding: "12px 16px",
    border: "1px solid #e0d4c4",
    borderRadius: 12,
    fontSize: 14,
    background: "#FAF7F2",
    color: "#2c1a0e",
    outline: "none",
    fontFamily: "'DM Sans', sans-serif",
  },
  attachBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 8,
    color: "#888",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  sendBtn: {
    background: "#8B1A1A",
    border: "none",
    cursor: "pointer",
    padding: "10px 12px",
    color: "#fff",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "background 0.15s",
  },
  disclaimer: {
    textAlign: "center",
    fontSize: 11,
    color: "#bbb",
    padding: "6px 20px 10px",
    background: "#fff",
  },
};
