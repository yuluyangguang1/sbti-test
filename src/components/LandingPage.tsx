import { personalities, modelDescriptions, dimensionDefs } from '../data';
import { PersonalityAvatar } from './PersonalityAvatar';
import type { Page } from '../App';

interface LandingPageProps {
  onStartQuiz: () => void;
  onViewGallery: () => void;
  onViewFaq: () => void;
  onViewAbout: () => void;
  onViewRankings: () => void;
}

// 特殊人格（彩蛋）— 从 data.ts 读取，使用图鉴头像
const specialPersonalityIds = ['ctrl', 'mum', 'ohno'];
const specialPersonalities = specialPersonalityIds
  .map(id => personalities.find(p => p.id === id))
  .filter(Boolean) as typeof personalities;

const modelMeta: { key: string; icon: string; color: string; accent: string; gradient: string }[] = [
  { key: 'S',  icon: '🧠', color: '#6c5ce7', accent: 'text-purple-500',   gradient: 'from-purple-500/20 to-indigo-500/10' },
  { key: 'E',  icon: '💬', color: '#fd79a8', accent: 'text-pink-500',     gradient: 'from-pink-500/20 to-rose-500/10' },
  { key: 'A',  icon: '⚡', color: '#fdcb6e', accent: 'text-amber-500',    gradient: 'from-amber-500/20 to-orange-500/10' },
  { key: 'Ac', icon: '🎭', color: '#00cec9', accent: 'text-teal-500',     gradient: 'from-teal-500/20 to-emerald-500/10' },
  { key: 'So', icon: '🌊', color: '#74b9ff', accent: 'text-blue-500',     gradient: 'from-blue-500/20 to-cyan-500/10' },
];

export function LandingPage({ onStartQuiz, onViewGallery, onViewFaq, onViewAbout, onViewRankings }: LandingPageProps) {
  const randomPersonalities = [...personalities]
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* 液态背景装饰 */}
      <div className="liquid-bg">
        <div className="liquid-blob" />
        <div className="liquid-blob" />
        <div className="liquid-blob" />
      </div>

      {/* Hero Section — 宽松，无框 */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 sm:px-12 py-28 sm:py-40 relative z-10">
        <div className="text-center max-w-xl mx-auto">
          <h1 className="text-7xl sm:text-9xl md:text-[10rem] font-black gradient-text tracking-tighter animate-gentle-float mb-6 sm:mb-8">
            SBTI
          </h1>
          <p className="text-xl sm:text-2xl text-gray-800/60 font-light tracking-wide mb-1">
            Silly Big Personality Test
          </p>
          <p className="text-base sm:text-lg text-gray-700/30 mb-14 sm:mb-16 tracking-wider">
            傻乎乎的大人格测试
          </p>

          <p className="text-lg sm:text-xl text-gray-700/50 leading-[2.0] mb-16 sm:mb-20" style={{ letterSpacing: '0.01em' }}>
            MBTI 已经过时了，<span className="text-purple-500 font-semibold">SBTI</span> 来了。
            <br />
            <span className="text-base">测出你真实的<span className="text-pink-500">精神状态</span></span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xs sm:max-w-none mx-auto">
            <button
              onClick={onStartQuiz}
              className="btn-primary text-lg sm:text-xl px-12 py-5 animate-pulse-glow"
            >
              开始测试
            </button>
            <button
              onClick={onViewGallery}
              className="btn-glass text-lg sm:text-xl px-14 py-5 sm:py-6"
            >
              浏览图鉴
            </button>
          </div>

          {/* 数字指标 — 液态玻璃胶囊 */}
          <div className="mt-16 sm:mt-20 flex justify-center gap-5 sm:gap-8">
            <div className="px-8 py-5 sm:px-10 sm:py-6 text-center">
              <div className="text-3xl sm:text-4xl font-bold text-purple-500" style={{ letterSpacing: '-0.03em' }}>27</div>
              <div className="text-xs sm:text-sm text-gray-700/30 mt-1" style={{ letterSpacing: '0.04em' }}>种人格</div>
            </div>
            <div className="px-8 py-5 sm:px-10 sm:py-6 text-center">
              <div className="text-3xl sm:text-4xl font-bold text-pink-500" style={{ letterSpacing: '-0.03em' }}>31</div>
              <div className="text-xs sm:text-sm text-gray-700/30 mt-1" style={{ letterSpacing: '0.04em' }}>道题目</div>
            </div>
            <div className="px-8 py-5 sm:px-10 sm:py-6 text-center">
              <div className="text-3xl sm:text-4xl font-bold text-blue-500" style={{ letterSpacing: '-0.03em' }}>15</div>
              <div className="text-xs sm:text-sm text-gray-700/30 mt-1" style={{ letterSpacing: '0.04em' }}>个维度</div>
            </div>
          </div>

          {/* 快捷入口链接 */}
          <div className="mt-12 sm:mt-16 flex justify-center gap-8 text-sm text-gray-700/25">
            <button onClick={onViewAbout} className="hover:text-purple-500 transition-colors" style={{ letterSpacing: '0.02em' }}>了解测试说明</button>
            <button onClick={onViewRankings} className="hover:text-purple-500 transition-colors" style={{ letterSpacing: '0.02em' }}>查看排行榜</button>
            <button onClick={onViewFaq} className="hover:text-purple-500 transition-colors" style={{ letterSpacing: '0.02em' }}>常见问题</button>
          </div>
        </div>
      </div>

      {/* 特殊人格展示区 — 彩蛋 */}
      <div className="px-8 sm:px-12 pb-28 sm:pb-36 relative z-10">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-3" style={{ letterSpacing: '-0.03em' }}>隐藏人格</h3>
          <p className="text-center text-base text-gray-700/30 mb-12 sm:mb-14" style={{ letterSpacing: '0.01em' }}>有些人格，不是你想当就能当的</p>

          <div className="grid grid-cols-3 gap-5 sm:gap-6">
            {specialPersonalities.map((sp, idx) => (
              <div key={sp.id} className="glass-card glass-card-hover p-8 sm:p-10 text-center animate-card-enter" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="relative z-10">
                  <PersonalityAvatar
                    emoji={sp.emoji}
                    name={sp.name}
                    color={sp.color}
                    avatar={sp.avatar}
                    size="md"
                    className="mx-auto mb-4"
                  />
                  <div className="text-base sm:text-lg font-bold mb-1.5" style={{ color: sp.color, letterSpacing: '-0.01em' }}>{sp.name}</div>
                  <div className="text-xs sm:text-sm font-mono text-gray-700/20 mb-3" style={{ letterSpacing: '0.04em' }}>{sp.code}</div>
                  <p className="text-sm sm:text-base text-gray-700/35 italic leading-relaxed" style={{ letterSpacing: '0.01em' }}>"{sp.slogan}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 五套模型 — 轻量展示 */}
      <div className="px-8 sm:px-12 pb-24 sm:pb-32 relative z-10">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-center text-xl sm:text-2xl font-bold text-gray-800 mb-3" style={{ letterSpacing: '-0.03em' }}>五套人格模型</h3>
          <p className="text-center text-sm sm:text-base text-gray-700/30 mb-10 sm:mb-14" style={{ letterSpacing: '0.01em' }}>3 维度 × 3 落点，画出你的十五维人格指纹</p>

          <div className="space-y-8 sm:space-y-10">
            {modelMeta.map((meta) => {
              const model = modelDescriptions[meta.key];
              const dims = dimensionDefs.filter(d => d.modelKey === meta.key);
              return (
                <div key={meta.key} className="text-center">
                  <div className="inline-flex items-center gap-2.5 mb-4">
                    <span className="text-lg sm:text-xl">{meta.icon}</span>
                    <span className="text-base sm:text-lg font-bold text-gray-800" style={{ letterSpacing: '-0.01em' }}>{model.name}</span>
                  </div>
                  <div className="flex justify-center gap-3 sm:gap-4">
                    {dims.map(dim => (
                      <span
                        key={dim.key}
                        className="text-sm sm:text-base text-gray-700/40"
                        style={{ letterSpacing: '0.02em' }}
                      >
                        {dim.label}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 人格预览 — 单张大卡片 */}
      <div className="px-8 sm:px-12 pb-28 sm:pb-36 relative z-10">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-center text-sm text-gray-700/25 mb-10 sm:mb-12 tracking-widest" style={{ letterSpacing: '0.08em' }}>
            你可能是什么人格？
          </h3>
          <div className="glass-card p-10 sm:p-14">
            <div className="relative z-10 grid grid-cols-3 gap-5 sm:gap-6">
              {randomPersonalities.map((p, idx) => (
                <div key={p.id} className="text-center py-3 animate-card-enter" style={{ animationDelay: `${idx * 0.05 + 0.2}s` }}>
                  <PersonalityAvatar
                    emoji={p.emoji}
                    name={p.name}
                    color={p.color}
                    avatar={p.avatar}
                    size="sm"
                    className="mx-auto mb-3"
                  />
                  <div className="font-bold text-sm sm:text-base" style={{ color: p.color, letterSpacing: '-0.01em' }}>{p.name}</div>
                  <div className="text-xs text-gray-700/20 mt-1" style={{ letterSpacing: '0.04em' }}>{p.code}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA — 液态玻璃号召 */}
      <div className="px-8 sm:px-12 py-28 sm:py-40 text-center relative z-10">
        <h3 className="text-3xl sm:text-4xl font-bold gradient-text animate-shimmer mb-6" style={{ letterSpacing: '-0.03em' }}>准备好了吗？</h3>
        <p className="text-base sm:text-lg text-gray-700/30 mb-14" style={{ letterSpacing: '0.01em' }}>只需 2 分钟，测出你真实的互联网精神状态</p>
        <button
          onClick={onStartQuiz}
          className="btn-primary text-lg sm:text-xl px-14 py-5 sm:py-6 animate-pulse-glow"
        >
          开始测试
        </button>
      </div>

      {/* Footer */}
      <footer className="text-center py-12 sm:py-16 text-sm text-gray-700/20 relative z-10" style={{ letterSpacing: '0.04em' }}>
        <div className="flex justify-center gap-6 mb-4">
          <button onClick={() => window.location.hash = ''} className="hover:text-purple-500 transition-colors">首页</button>
          <button onClick={onStartQuiz} className="hover:text-purple-500 transition-colors">开始测试</button>
          <button onClick={onViewGallery} className="hover:text-purple-500 transition-colors">人格图鉴</button>
          <button onClick={onViewRankings} className="hover:text-purple-500 transition-colors">排行榜</button>
          <button onClick={onViewFaq} className="hover:text-purple-500 transition-colors">常见问题</button>
          <button onClick={onViewAbout} className="hover:text-purple-500 transition-colors">关于测试</button>
        </div>
        <p>本测试仅供娱乐，不构成任何心理学依据</p>
        <p className="mt-1.5">&copy; 2026 SBTI. Silly Big Personality Test.</p>
      </footer>
    </div>
  );
}
