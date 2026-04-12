import { useMemo } from 'react';
import { personalities, type PersonalityType } from '../data';
import { PersonalityAvatar } from './PersonalityAvatar';
import { DimensionFingerprint } from './DimensionFingerprint';
import { MbtiComparison } from './MbtiComparison';
import { SimilarPersonalities } from './SimilarPersonalities';

interface ResultPageProps {
  personalityId: string;
  scores: Record<string, number>;
  onBackHome: () => void;
  onViewGallery: () => void;
  onRetake: () => void;
  onViewPersonality?: (id: string) => void;
}

export function ResultPage({ personalityId, scores, onBackHome, onViewGallery, onRetake, onViewPersonality }: ResultPageProps) {
  const personality = useMemo(() =>
    personalities.find(p => p.id === personalityId) || personalities[0],
    [personalityId]
  );

  // Top 5 personality scores
  const topPersonalities = useMemo(() => {
    return Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([id, score]) => ({
        personality: personalities.find(p => p.id === id) || personalities[0],
        score,
      }));
  }, [scores]);

  const handleViewPersonality = (id: string) => {
    if (onViewPersonality) {
      onViewPersonality(id);
    }
  };

  return (
    <div className="min-h-screen px-8 sm:px-12 md:px-16 py-20 sm:py-24 md:py-28 relative">
      {/* 液态背景装饰 */}
      <div className="liquid-bg">
        <div className="liquid-blob" style={{ background: `linear-gradient(135deg, ${personality.color}, ${personality.color}cc)` }} />
        <div className="liquid-blob" style={{ background: `linear-gradient(135deg, ${personality.color}80, #6c5ce7)` }} />
        <div className="liquid-blob" style={{ background: 'linear-gradient(135deg, #6c5ce7, #fd79a8)' }} />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Back button */}
        <div className="flex justify-between items-center mb-16 sm:mb-20">
          <button
            onClick={onBackHome}
            className="text-black/30 hover:text-gray-800/60 transition-colors text-sm sm:text-base flex items-center gap-1" style={{ letterSpacing: '0.01em' }}
          >
            ← 返回首页
          </button>
          <button
            onClick={onRetake}
            className="text-gray-700/35 hover:text-purple-600 transition-colors text-sm sm:text-base" style={{ letterSpacing: '0.01em' }}
          >
            重新测试
          </button>
        </div>

        {/* Result Card — 液态玻璃主卡片（含分享功能） */}
        <div className="animate-fade-in">
          <div id="share-card-area" className="glass-card !p-10 sm:!p-16 md:!p-24 text-center relative overflow-hidden">
            {/* Background pattern — 淡化到不干扰 */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <div className="absolute top-0 left-0 text-[100px] sm:text-[180px] leading-none font-black" style={{ color: personality.color }}>
                {personality.code}
              </div>
            </div>

            {/* Liquid gradient overlay — 增强折射 */}
            <div
              className="absolute inset-0 pointer-events-none animate-refract"
              style={{
                background: `radial-gradient(ellipse at 50% 0%, ${personality.color}18, transparent 70%)`,
              }}
            />

            <div className="relative z-10">
              {/* Avatar */}
              <div className="flex justify-center mb-14 sm:mb-16 md:mb-18">
                <PersonalityAvatar
                  emoji={personality.emoji}
                  name={personality.name}
                  color={personality.color}
                  avatar={personality.avatar}
                  size="xl"
                />
              </div>

              {/* Code */}
              <div className="text-sm sm:text-base font-mono text-gray-700/25 mb-4 sm:mb-5" style={{ letterSpacing: '0.08em' }}>
                {personality.code}
              </div>

              {/* Name */}
              <h1 className="text-5xl sm:text-5xl md:text-7xl font-black text-gray-800 mb-8 sm:mb-8 md:mb-10" style={{ letterSpacing: '-0.03em' }}>
                {personality.name}
              </h1>

              {/* Slogan */}
              <p className="text-xl sm:text-xl md:text-2xl text-gray-700/40 italic mb-14 sm:mb-16 md:mb-20" style={{ letterSpacing: '0.01em' }}>
                "{personality.slogan}"
              </p>

              {/* Description */}
              <p className="text-lg sm:text-lg md:text-xl text-gray-700/50 leading-[1.85] max-w-lg mx-auto text-left indent" style={{ letterSpacing: '0.01em' }}>
                {personality.description}
              </p>

              {/* Traits — 液态玻璃标签 */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-12 sm:mt-12">
                {personality.traits.map((trait, i) => (
                  <span
                    key={i}
                    className="glass-tag px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-gray-700/50" style={{ letterSpacing: '0.02em', borderRadius: 'var(--radius-md)' }}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 分享操作按钮 — 在卡片外面，不参与截图 */}
          <div className="flex gap-5 mt-8 animate-card-enter" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={async () => {
                try {
                  const html2canvas = (await import('html2canvas')).default;
                  const cardEl = document.getElementById('share-card-area');
                  if (!cardEl) return;
                  const canvas = await html2canvas(cardEl, {
                    backgroundColor: '#ffffff',
                    scale: 2,
                    useCORS: true,
                    logging: true,
                  });
                  const dataUrl = canvas.toDataURL('image/png');
                  const link = document.createElement('a');
                  link.download = `SBTI_${personality.name}_${personality.code}.png`;
                  link.href = dataUrl;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                } catch (err) {
                  console.error('截图失败:', err);
                  alert('截图生成失败，请尝试复制文案分享');
                }
              }}
              className="flex-1 py-3.5 sm:py-4 btn-glass text-sm sm:text-base"
            >
              保存为图片
            </button>
            <button
              onClick={async () => {
                const text = `我的SBTI人格是 ${personality.emoji} ${personality.name}（${personality.code}）——"${personality.slogan}"\n\n快来测测你的！`;
                try {
                  await navigator.clipboard.writeText(text);
                } catch {
                  // fallback
                }
              }}
              className="flex-1 py-3.5 sm:py-4 btn-glass text-sm sm:text-base"
            >
              复制文案分享
            </button>
          </div>
        </div>

        {/* Dimension Fingerprint */}
        <div className="animate-slide-up mt-24 sm:mt-28" style={{ animationDelay: '0.3s' }}>
          <DimensionFingerprint personality={personality} />
        </div>

        {/* SBTI × MBTI Comparison */}
        <div className="animate-slide-up mt-24 sm:mt-28" style={{ animationDelay: '0.4s' }}>
          <MbtiComparison personality={personality} />
        </div>

        {/* Similar Personalities */}
        <div className="animate-slide-up mt-24 sm:mt-28" style={{ animationDelay: '0.5s' }}>
          <SimilarPersonalities personality={personality} onViewPersonality={handleViewPersonality} />
        </div>

        {/* Score Ranking — 液态玻璃卡片 */}
        <div className="animate-card-enter mt-32 sm:mt-36 md:mt-44 glass-card !p-8 sm:!p-14 md:!p-18" style={{ animationDelay: '0.6s' }}>
          <div className="relative z-10">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-6 sm:mb-8" style={{ letterSpacing: '-0.03em' }}>
              你的人格匹配度排行
            </h3>
            <div className="space-y-5 sm:space-y-6">
              {topPersonalities.map((item, index) => (
                <div key={item.personality.id} className="flex items-center gap-4 sm:gap-5">
                  <PersonalityAvatar
                    emoji={item.personality.emoji}
                    name={item.personality.name}
                    color={item.personality.color}
                    avatar={item.personality.avatar}
                    size="sm"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[13px] sm:text-sm font-medium text-gray-800 truncate" style={{ letterSpacing: '0.01em' }}>
                        {index === 0 ? (
                          <span className="text-purple-600">{item.personality.name}</span>
                        ) : (
                          item.personality.name
                        )}
                      </span>
                      <span className="text-[11px] sm:text-xs text-gray-700/30 shrink-0 ml-2" style={{ letterSpacing: '0.04em' }}>{item.score}分</span>
                    </div>
                    <div className="h-2 rounded-full bg-black/[0.05] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${(item.score / (topPersonalities[0]?.score || 1)) * 100}%`,
                          backgroundColor: index === 0 ? item.personality.color : `${item.personality.color}50`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="animate-slide-up mt-32 sm:mt-36 flex flex-col gap-6" style={{ animationDelay: '0.7s' }}>
          <button
            onClick={onViewGallery}
            className="btn-primary w-full py-5 sm:py-6 text-lg sm:text-xl"
          >
            查看全部 27 种人格图鉴
          </button>
          <button
            onClick={onRetake}
            className="btn-glass w-full py-5 sm:py-6 text-lg sm:text-xl"
          >
            重新测试
          </button>
        </div>

        {/* Disclaimer */}
        <div className="text-center mt-20 sm:mt-24 mb-12">
          <p className="text-xs sm:text-sm text-gray-700/20 leading-relaxed" style={{ letterSpacing: '0.04em' }}>
            本测试仅供娱乐，不构成任何心理学依据。<br />
            多测几次可能会得到不同结果哦~
          </p>
        </div>
      </div>
    </div>
  );
}
