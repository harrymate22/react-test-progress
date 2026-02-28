import { useState, useEffect } from "react";
import { TopProgress, startProgress, finishProgress, withProgress } from "react-top-progress";
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
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleComplete = () => finishProgress();
  
  const handleSimulateRequest = async () => {
    await withProgress(
      new Promise(resolve => setTimeout(resolve, 2500))
    );
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
            maxWidth: '540px',
            width: '100%',
            background: cardBg,
            border: `1px solid ${border}`,
            borderRadius: '24px',
            padding: '2.5rem 1.5rem',
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
              margin: '0 0 0.75rem 0', 
              fontSize: '3rem', 
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
              fontSize: '1.1rem',
              lineHeight: 1.5,
              maxWidth: '90%'
            }}>
              A premium, ultra-smooth loading indicator with beautiful glow effects and intelligent state management.
            </p>

            {/* Installation Commands */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', alignItems: 'center', marginBottom: '3rem' }}>
              {(['npm i react-top-progress', 'yarn add react-top-progress'] as const).map((cmd, i) => (
                <div key={cmd} style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
                  <button
                    onClick={() => handleCopy(cmd)}
                    style={{
                      position: 'relative',
                      background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                      border: `1px solid ${border}`,
                      borderRadius: '999px',
                      padding: '1rem 2rem',
                      color: fg,
                      fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      width: '100%',
                      overflow: 'hidden'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = selectedColor;
                      e.currentTarget.style.boxShadow = `0 0 20px ${selectedColor}22`;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = border;
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <span style={{ 
                      opacity: copiedText === cmd ? 0 : 1, 
                      transition: 'opacity 0.2s',
                      display: 'block' 
                    }}>
                      {cmd}
                    </span>
                    <span style={{ 
                      position: 'absolute', 
                      top: '50%', 
                      left: '50%', 
                      transform: 'translate(-50%, -50%)', 
                      opacity: copiedText === cmd ? 1 : 0, 
                      color: selectedColor,
                      fontWeight: 'bold',
                      transition: 'opacity 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      pointerEvents: 'none'
                    }}>
                      Copied!
                    </span>
                  </button>
                  {i === 0 && (
                    <div style={{ 
                      position: 'absolute', 
                      bottom: '-1.15rem', 
                      left: '50%', 
                      transform: 'translateX(-50%)', 
                      fontSize: '0.8rem', 
                      color: textMuted 
                    }}>
                      or
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick API Snippet */}
            <div style={{
              width: '100%',
              background: isDark ? 'rgba(0,0,0,0.3)' : '#f8fafc',
              borderRadius: '16px',
              padding: '1.5rem',
              textAlign: 'left',
              fontFamily: 'Consolas, Monaco, "Courier New", monospace',
              fontSize: '0.9rem',
              border: `1px solid ${border}`,
              marginBottom: '3rem',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ color: isDark ? '#c678dd' : '#a626a4' }}>import</span> 
                {' { '}
                <span style={{ color: isDark ? '#61afef' : '#4078f2' }}>startProgress</span>, 
                <span style={{ color: isDark ? '#61afef' : '#4078f2' }}> finishProgress</span>
                {' } '}
                <span style={{ color: isDark ? '#c678dd' : '#a626a4' }}>from</span> 
                <span style={{ color: isDark ? '#98c379' : '#50a14f' }}> "react-top-progress"</span>;
              </div>
              
              <div>
                <span style={{ color: isDark ? '#c678dd' : '#a626a4' }}>&lt;</span>
                <span style={{ color: isDark ? '#e06c75' : '#e45649' }}>button</span> 
                <span style={{ color: isDark ? '#d19a66' : '#b76b01' }}> onClick</span>
                <span style={{ color: isDark ? '#56b6c2' : '#0184bc' }}>=</span>
                {'{() => '}
                <span style={{ color: isDark ? '#61afef' : '#4078f2' }}>startProgress</span>
                {'()}&gt;'}
              </div>
              <div style={{ paddingLeft: '1.5rem', color: isDark ? '#abb2bf' : '#383a42' }}>Start Progress</div>
              <div>
                <span style={{ color: isDark ? '#c678dd' : '#a626a4' }}>&lt;/</span>
                <span style={{ color: isDark ? '#e06c75' : '#e45649' }}>button</span>
                <span style={{ color: isDark ? '#c678dd' : '#a626a4' }}>&gt;</span>
              </div>
            </div>

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
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '480px' }}>
              <button 
                onClick={() => {
                  startProgress();
                  // Simulate continuous network loading by preventing it from reaching 100% until complete is called
                }}
                style={{
                  padding: '0.875rem 1.75rem',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: 'white',
                  backgroundColor: selectedColor,
                  border: 'none',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: `0 8px 16px -8px ${selectedColor}`,
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 12px 20px -8px ${selectedColor}, 0 0 15px ${selectedColor}66`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 8px 16px -8px ${selectedColor}`;
                }}
                onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(1px)'}
              >
                Start Continuous Loading Bar
              </button>

              <button 
                onClick={handleSimulateRequest}
                style={{
                  padding: '0.875rem 1.75rem',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: 'white',
                  backgroundColor: selectedColor,
                  border: 'none',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: `0 8px 16px -8px ${selectedColor}`,
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 12px 20px -8px ${selectedColor}, 0 0 15px ${selectedColor}66`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 8px 16px -8px ${selectedColor}`;
                }}
                onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(1px)'}
              >
                Start Static Loading Bar
              </button>

              <button 
                onClick={handleComplete}
                style={{
                  padding: '0.875rem 1.75rem',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: 'white',
                  backgroundColor: selectedColor,
                  border: 'none',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: `0 8px 16px -8px ${selectedColor}`,
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 12px 20px -8px ${selectedColor}, 0 0 15px ${selectedColor}66`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 8px 16px -8px ${selectedColor}`;
                }}
                onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(1px)'}
              >
                Complete
              </button>
              
              <button 
                onClick={() => {
                  const colors = PRESET_COLORS.map(c => c.value);
                  const currentIndex = colors.indexOf(selectedColor);
                  const nextIndex = (currentIndex + 1) % colors.length;
                  setSelectedColor(colors[nextIndex]);
                }}
                style={{
                  padding: '0.875rem 1.75rem',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: 'white',
                  backgroundColor: selectedColor,
                  border: 'none',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: `0 8px 16px -8px ${selectedColor}`,
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 12px 20px -8px ${selectedColor}, 0 0 15px ${selectedColor}66`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 8px 16px -8px ${selectedColor}`;
                }}
                onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(1px)'}
              >
                Change Color
              </button>

              <button 
                onClick={() => {
                  alert("react-top-progress uses pure functions, meaning there's no need to pass refs! Just call startProgress() anywhere.");
                }}
                style={{
                  padding: '0.875rem 1.75rem',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: 'white',
                  backgroundColor: selectedColor,
                  border: 'none',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: `0 8px 16px -8px ${selectedColor}`,
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 12px 20px -8px ${selectedColor}, 0 0 15px ${selectedColor}66`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 8px 16px -8px ${selectedColor}`;
                }}
                onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(1px)'}
              >
                Pure API / No Refs Needed
              </button>
            </div>
          </div>
        </main>

        {/* Footer Credits */}
        <footer style={{
          width: '100%',
          padding: '2rem',
          textAlign: 'center',
          color: textMuted,
          fontSize: '0.95rem',
          marginTop: 'auto',
          borderTop: `1px solid ${border}`,
        }}>
          Crafted with care by{' '}
          <a 
            href="https://github.com/harrymate22" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              color: selectedColor,
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.textShadow = `0 0 10px ${selectedColor}66`;
              e.currentTarget.style.textDecoration = 'underline';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.textShadow = 'none';
              e.currentTarget.style.textDecoration = 'none';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.699-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            @harrymate22
          </a>
        </footer>
      </div>
    </>
  );
}

export default App;
