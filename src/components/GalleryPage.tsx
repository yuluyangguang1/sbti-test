import { useState } from 'react';
import { personalities, dimensionDefs, modelDescriptions, type PersonalityType } from '../data';
import { PersonalityAvatar } from './PersonalityAvatar';
import { MbtiComparison } from './MbtiComparison';
import { useAvatarStyle } from './AvatarStyleContext';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const { style: avatarStyle, toggle: toggleAvatarStyle } = useAvatarStyle();

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

  return (
    <div className="min-h-screen px-8 sm:px-12 md:px-16 py-20 sm:py-24 relative">
      {/* 液态背景装饰 */}

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
          <button
            onClick={toggleAvatarStyle}
            className="text-xs sm:text-sm px-3 py-1.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 font-medium"
            style={{
              backgroundColor: avatarStyle === 'original' ? 'rgba(255,107,107,0.12)' : 'rgba(108,92,231,0.12)',
              color: avatarStyle === 'original' ? '#ff6b6bcc' : '#6c5ce7cc',
              border: avatarStyle === 'original' ? '1px solid rgba(255,107,107,0.25)' : '1px solid rgba(108,92,231,0.25)',
            }}
          >
            {avatarStyle === 'original' ? '原版' : '重制'}图鉴
          </button>
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
              className={avatarStyle === 'original' ? 'gallery-card-original relative overflow-hidden p-6 sm:p-8' : 'glass-card glass-card-hover'}
            >
              <div className="relative z-10">
                <div className="flex flex-col items-center text-center">
                  <div className={avatarStyle === 'original' ? 'avatar-3d-wrapper' : ''}>
                    <PersonalityAvatar
                      emoji={p.emoji}
                      name={p.name}
                      color={p.color}
                      avatar={p.avatar}
                      personalityId={p.id}
                      avatarStyle={avatarStyle}
                      size="lg"
                      noAnimation
                    />
                  </div>
                  <div className="mt-3 sm:mt-4">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="font-bold text-base sm:text-lg text-black/75" style={{ letterSpacing: '-0.01em' }}>{p.name}</span>
                      <span className="text-xs sm:text-sm font-mono text-black/20 shrink-0" style={{ letterSpacing: '0.04em' }}>{p.code}</span>
                    </div>
                    <p className="text-sm sm:text-base text-black/30 italic" style={{ letterSpacing: '0.01em' }}>
                      &ldquo;{p.slogan}&rdquo;
                    </p>
                    <DimensionBar personality={p} />
                  </div>
                  <button
                    onClick={() => onViewPersonality(p.id)}
                    className="mt-4 sm:mt-5 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{
                      backgroundColor: `${p.color}12`,
                      color: p.color,
                      border: `1px solid ${p.color}25`,
                    }}
                  >
                    查看完整报告
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
