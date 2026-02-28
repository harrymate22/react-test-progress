import { useState, useEffect } from "react";
import { TopProgress, startProgress, finishProgress } from "react-top-progress";
import "./App.css";

// SVG Icons
const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const PRESET_COLORS = [
  { name: "Blue", value: "#0070F3" },
  { name: "Cyan", value: "#06B6D4" },
  { name: "Emerald", value: "#10B981" },
  { name: "Violet", value: "#8B5CF6" },
  { name: "Rose", value: "#F43F5E" },
];

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0].value);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleReload = () => {
    startProgress();
    setTimeout(() => {
      finishProgress();
    }, 2000);
  };

  const isDark = theme === "dark";
  const bg = isDark ? "#0f1115" : "#f8fafc";
  const fg = isDark ? "#ffffff" : "#0f172a";
  const cardBg = isDark ? "rgba(255, 255, 255, 0.03)" : "#ffffff";
  const border = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const textMuted = isDark ? "#94a3b8" : "#64748b";

  useEffect(() => {
    document.body.style.backgroundColor = bg;
  }, [bg]);

  return (
    <>
      <TopProgress
        color={selectedColor}
        height={4}
        showGlow={true}
      />
      
      <div style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: bg,
        color: fg,
        fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
        transition: 'background-color 0.4s ease, color 0.4s ease',
      }}>
        {/* Header Navigation */}
        <header style={{
          width: '100%',
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `1px solid ${border}`,
          backdropFilter: 'blur(10px)',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div style={{ fontWeight: 700, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: selectedColor, transition: 'background-color 0.4s ease' }} />
            App.Studio
          </div>
          
          <button 
            onClick={toggleTheme}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.5rem',
              borderRadius: '50%',
              border: `1px solid ${border}`,
              background: isDark ? 'rgba(255,255,255,0.05)' : '#ffffff',
              color: fg,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: isDark ? 'none' : '0 2px 4px rgba(0,0,0,0.05)'
            }}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </header>

        {/* Main Content Area */}
        <main style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}>
          <div style={{
            maxWidth: '640px',
            width: '100%',
            background: cardBg,
            border: `1px solid ${border}`,
            borderRadius: '24px',
            padding: '3rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: isDark 
              ? '0 20px 40px rgba(0,0,0,0.4)' 
              : '0 20px 40px rgba(0,0,0,0.05)',
            transition: 'all 0.4s ease'
          }}>
            <h1 style={{ 
              margin: '0 0 1rem 0', 
              fontSize: '4rem', 
              fontWeight: 800, 
              letterSpacing: '-0.02em',
              background: 'linear-gradient(90deg, #FF4B2B 0%, #FF416C 50%, #8A2387 100%)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.1
            }}>
              Top Progress
            </h1>
            
            <p style={{ 
              margin: '0 0 2rem 0', 
              color: textMuted, 
              fontSize: '1.25rem',
              lineHeight: 1.6,
              maxWidth: '90%'
            }}>
              A premium, ultra-smooth loading indicator with beautiful glow effects and intelligent state management.
            </p>

            {/* Feature List */}
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 3rem 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              textAlign: 'left',
              width: '100%',
              maxWidth: '480px'
            }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', fontSize: '1.1rem', color: isDark ? '#e2e8f0' : '#334155', lineHeight: 1.5 }}>
                <span style={{ color: selectedColor, transition: 'color 0.4s ease', marginTop: '0.15rem' }}><CheckIcon /></span>
                <div>
                  <strong style={{ color: fg }}>Gradient & Glow:</strong> Custom colors, beautiful gradients, & shadow pegs that feel premium.
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', fontSize: '1.1rem', color: isDark ? '#e2e8f0' : '#334155', lineHeight: 1.5 }}>
                <span style={{ color: selectedColor, transition: 'color 0.4s ease', marginTop: '0.15rem' }}><CheckIcon /></span>
                <div>
                  <strong style={{ color: fg }}>Performant:</strong> Off-main-thread hardware acceleration via CSS cubic-bezier transitions.
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', fontSize: '1.1rem', color: isDark ? '#e2e8f0' : '#334155', lineHeight: 1.5 }}>
                <span style={{ color: selectedColor, transition: 'color 0.4s ease', marginTop: '0.15rem' }}><CheckIcon /></span>
                <div>
                  <strong style={{ color: fg }}>Framework Agnostic:</strong> Pure singleton store state prevents messy context or prop drilling.
                </div>
              </li>
            </ul>

            {/* Color Selector */}
            <div style={{ marginBottom: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {PRESET_COLORS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.value)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: c.value,
                    border: selectedColor === c.value ? `2px solid ${fg}` : '2px solid transparent',
                    cursor: 'pointer',
                    outlineOffset: '2px',
                    outline: selectedColor === c.value ? `2px solid ${c.value}` : 'none',
                    transition: 'all 0.2s',
                    padding: 0
                  }}
                  title={c.name}
                  aria-label={`Select ${c.name} color`}
                />
              ))}
            </div>
            
            <button 
              onClick={handleReload}
              style={{
                position: 'relative',
                padding: '1rem 2.5rem',
                fontSize: '1.125rem',
                fontWeight: 600,
                color: 'white',
                backgroundColor: selectedColor,
                border: 'none',
                borderRadius: '999px',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: `0 10px 20px -10px ${selectedColor}`,
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                e.currentTarget.style.boxShadow = `0 15px 25px -10px ${selectedColor}`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = `0 10px 20px -10px ${selectedColor}`;
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translateY(1px) scale(0.98)';
              }}
            >
              Trigger Animation
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
