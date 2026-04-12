import { useState } from 'react';
import { personalities, dimensionDefs, modelDescriptions, type PersonalityType } from '../data';
import { PersonalityAvatar } from './PersonalityAvatar';
import { MbtiComparison } from './MbtiComparison';

interface GalleryPageProps {
  onBackHome: () => void;
  onViewPersonality: (personalityId: string) => void;
}

// 维度落点小条
function DimensionBar({ personality }: { personality: PersonalityType }) {
  return (
    <div className="flex gap-[2px] mt-2">
      {Object.entries(personality.dimensions).map(([key, level]) => {
        const color = level === 'H' ? '#34d399' : level === 'M' ? '#fbbf24' : '#fb7185';
        return (
          <div key={key} title={`${key}: ${level}`} className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: color, opacity: 0.7 }} />
        );
      })}
    </div>
  );
}

export function GalleryPage({ onBackHome, onViewPersonality }: GalleryPageProps) {
  const [selectedPersonality, setSelectedPersonality] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // 按模型筛选
  const filters = [
    { key: null, label: '全部' },
    ...Object.entries(modelDescriptions).map(([key, model]) => ({
      key,
      label: model.name.replace('模型', ''),
    })),
  ];

  const filteredPersonalities = personalities.filter(p => {
    const matchSearch = !searchTerm ||
      p.name.includes(searchTerm) ||
      p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.traits.some(t => t.includes(searchTerm));

    const matchFilter = !activeFilter || Object.entries(p.dimensions).some(([dimKey]) => {
      const dim = dimensionDefs.find(d => d.key === dimKey);
      return dim?.modelKey === activeFilter;
    });

    return matchSearch && matchFilter;
  });

  const displayPersonality = selectedPersonality
    ? personalities.find(p => p.id === selectedPersonality)
    : null;

  return (
    <div className="min-h-screen px-8 sm:px-12 md:px-16 py-20 sm:py-24 relative">
      {/* 液态背景装饰 */}
      <div className="liquid-bg">
        <div className="liquid-blob" />
        <div className="liquid-blob" />
        <div className="liquid-blob" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-12 sm:mb-14">
          <button
            onClick={onBackHome}
            className="text-black/30 hover:text-black/60 transition-colors text-sm sm:text-base flex items-center gap-1" style={{ letterSpacing: '0.01em' }}
          >
            ← 返回首页
          </button>
          <h2 className="text-xl sm:text-2xl font-bold gradient-text" style={{ letterSpacing: '-0.03em' }}>SBTI 人格图鉴</h2>
          <div className="w-16 sm:w-20" />
        </div>

        {/* Search — 液态玻璃输入框 */}
        <div className="mb-8 sm:mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索人格名称、代号或特征..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-input w-full px-6 py-4 sm:py-4.5 text-black/60 text-base sm:text-lg placeholder-black/20" style={{ letterSpacing: '0.01em', borderRadius: 'var(--radius-xl)' }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black/25 hover:text-black/50"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Count */}
        <p className="text-sm text-black/20 mb-6" style={{ letterSpacing: '0.04em' }}>{personalities.length} 种人格</p>

        {/* Personality Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-10 lg:gap-12">
          {personalities.map((p, i) => (
            <div
              key={p.id}
              onClick={() => setSelectedPersonality(p.id)}
              className={`glass-card glass-card-hover cursor-pointer animate-card-enter ${
                selectedPersonality === p.id ? 'ring-1 ring-purple-400/50' : ''
              }`}
              style={{
                animationDelay: `${i * 0.04}s`,
                animationFillMode: 'both',
              }}
            >
              <div className="relative z-10">
                <div className="flex items-start gap-4 sm:gap-5">
                  <PersonalityAvatar
                    emoji={p.emoji}
                    name={p.name}
                    color={p.color}
                    avatar={p.avatar}
                    size="sm"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-bold text-base sm:text-lg text-black/75 truncate" style={{ letterSpacing: '-0.01em' }}>{p.name}</span>
                      <span className="text-xs sm:text-sm font-mono text-black/20 shrink-0" style={{ letterSpacing: '0.04em' }}>{p.code}</span>
                    </div>
                    <p className="text-sm sm:text-base text-black/30 italic truncate" style={{ letterSpacing: '0.01em' }}>
                      "{p.slogan}"
                    </p>
                    <DimensionBar personality={p} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Personality Detail Modal — 液态玻璃弹窗 */}
        {displayPersonality && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedPersonality(null)}
          >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-md" />

            {/* 弹窗主体 — 固定居中、不形变 */}
            <div
              className="relative w-full max-w-lg max-h-[85vh] flex flex-col animate-slide-up overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'rgba(255, 255, 255, 0.60)',
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                border: '0.5px solid rgba(255,255,255,0.60)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 0 0 0.5px rgba(255,255,255,0.20) inset, 0 1px 0 rgba(255,255,255,0.50) inset',
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedPersonality(null)}
                className="absolute top-3 right-4 z-30 w-9 h-9 rounded-full flex items-center justify-center text-black/25 hover:text-black/55 text-sm transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.45)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
              >
                ✕
              </button>

              {/* 可滚动内容区 */}
              <div className="flex-1 overflow-y-auto min-h-0">
                <div className="p-8 sm:p-10 space-y-8">
                  {/* 头像区 */}
                  <div className="text-center pt-2 pb-2">
                    <PersonalityAvatar
                      emoji={displayPersonality.emoji}
                      name={displayPersonality.name}
                      color={displayPersonality.color}
                      avatar={displayPersonality.avatar}
                      size="lg"
                    />
                    <div className="text-sm font-mono text-black/20 mt-4 mb-2" style={{ letterSpacing: '0.08em' }}>{displayPersonality.code}</div>
                    <h3 className="text-3xl sm:text-4xl font-black text-black/75 mb-3" style={{ letterSpacing: '-0.03em' }}>{displayPersonality.name}</h3>
                    <p className="text-base sm:text-lg text-black/40 italic" style={{ letterSpacing: '0.01em' }}>"{displayPersonality.slogan}"</p>
                  </div>

                  {/* Description */}
                  <p className="text-base sm:text-lg text-black/45 leading-[1.85] indent" style={{ letterSpacing: '0.01em' }}>
                    {displayPersonality.description}
                  </p>

                  {/* Traits — 液态玻璃标签 */}
                  <div className="flex flex-wrap gap-3">
                    {displayPersonality.traits.map((trait, i) => (
                      <span
                        key={i}
                        className="glass-tag px-4 py-2 text-sm sm:text-base font-medium"
                        style={{ color: displayPersonality.color, borderRadius: 'var(--radius-md)', letterSpacing: '0.02em' }}
                      >
                        {trait}
                      </span>
                    ))}
                  </div>

                  {/* Dimension bar in modal */}
                  <div>
                    <p className="text-xs text-black/25 mb-3" style={{ letterSpacing: '0.04em' }}>维度落点总览</p>
                    <div className="flex gap-1.5">
                      {Object.entries(displayPersonality.dimensions).map(([key, level]) => {
                        const color = level === 'H' ? '#34d399' : level === 'M' ? '#fbbf24' : '#fb7185';
                        const dim = dimensionDefs.find(d => d.key === key);
                        return (
                          <div key={key} className="flex flex-col items-center flex-1" title={`${dim?.label}: ${level}`}>
                            <div className="w-full h-2 rounded-full" style={{ backgroundColor: color, opacity: 0.75 }} />
                            <span className="text-[9px] text-black/20 mt-1.5" style={{ letterSpacing: '0.04em' }}>{key}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* MBTI */}
                  {displayPersonality.mbti && (
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-black/25" style={{ letterSpacing: '0.04em' }}>MBTI:</span>
                      {displayPersonality.mbti.map(t => (
                        <span
                          key={t}
                          className="glass-tag px-3.5 py-1.5 text-sm font-bold"
                          style={{ color: displayPersonality.color, borderRadius: 'var(--radius-md)', letterSpacing: '0.04em' }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action button */}
                  <button
                    onClick={() => {
                      onViewPersonality(displayPersonality.id);
                      setSelectedPersonality(null);
                    }}
                    className="btn-primary w-full py-4 text-base"
                  >
                    查看完整报告
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
