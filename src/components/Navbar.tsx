import { useState } from 'react';
import type { Page } from '../App';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onStartQuiz: () => void;
}

export function Navbar({ currentPage, onNavigate, onStartQuiz }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems: { key: Page; label: string }[] = [
    { key: 'landing', label: '首页' },
    { key: 'gallery', label: '人格图鉴' },
    { key: 'rankings', label: '排行榜' },
    { key: 'faq', label: '常见问题' },
    { key: 'about', label: '关于测试' },
  ];

  return (
    <>
      {/* 占位元素，防止 fixed 导航栏遮挡内容 */}
      <div className="h-14 sm:h-16" />
      <nav className="fixed top-0 left-0 right-0 z-40" style={{
        background: 'rgba(238, 240, 247, 0.68)',
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
      }}>
        <div className="max-w-5xl mx-auto px-5 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          {/* Logo */}
        <button
          onClick={() => onNavigate('landing')}
          className="font-black text-lg sm:text-xl gradient-text tracking-tighter hover:opacity-80 transition-opacity animate-shimmer"
          style={{ letterSpacing: '-0.03em' }}
        >
          SBTI
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-5">
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`relative text-sm transition-all duration-200 ${
                currentPage === item.key
                  ? 'text-purple-600 font-semibold'
                  : 'text-gray-700/45 hover:text-gray-800'
              }`}
              style={{ letterSpacing: '0.01em' }}
            >
              {item.label}
              {currentPage === item.key && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-purple-500" />
              )}
            </button>
          ))}
        </div>

        {/* Start quiz button (desktop) */}
        <button
          onClick={onStartQuiz}
          className="hidden md:block btn-primary !py-2 !px-5 !text-sm"
        >
          开始测试
        </button>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center text-gray-700/50 hover:text-gray-800 transition-colors"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/30" style={{
          background: 'rgba(238, 240, 247, 0.92)',
          backdropFilter: 'blur(24px) saturate(150%)',
          WebkitBackdropFilter: 'blur(24px) saturate(150%)',
        }}>
          <div className="px-5 py-3 space-y-1">
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => { onNavigate(item.key); setMenuOpen(false); }}
                className={`block w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${
                  currentPage === item.key
                    ? 'text-purple-600 font-semibold bg-purple-500/10'
                    : 'text-gray-700/50 hover:text-gray-800 hover:bg-white/40'
                }`}
                style={{ letterSpacing: '0.01em' }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { onStartQuiz(); setMenuOpen(false); }}
              className="btn-primary w-full !py-3 !text-sm mt-2"
            >
              开始测试
            </button>
          </div>
        </div>
      )}
    </nav>
    </>
  );
}
