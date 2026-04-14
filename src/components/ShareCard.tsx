import { useRef, useCallback, useState } from 'react';
import { type PersonalityType } from '../data';

interface ShareCardProps {
  personality: PersonalityType;
}

export function ShareCard({ personality }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);

  // 使用 html2canvas（动态导入）生成图片
  const generateImage = useCallback(async () => {
    if (!cardRef.current) return;
    setGenerating(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: true,
      });
      const dataUrl = canvas.toDataURL('image/png');

      // 方式1: 尝试直接下载
      const link = document.createElement('a');
      link.download = `SBTI_${personality.name}_${personality.code}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('截图生成失败:', err);
      // fallback: 复制文字
      const text = `我的SBTI人格是 ${personality.emoji} ${personality.name}（${personality.code}）——"${personality.slogan}" 快来测测你的！`;
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // 最终 fallback
        alert('截图生成失败，请尝试复制文案分享');
      }
    }
    setGenerating(false);
  }, [personality]);

  // 复制文字分享
  const copyText = useCallback(async () => {
    const text = `我的SBTI人格是 ${personality.emoji} ${personality.name}（${personality.code}）——"${personality.slogan}"\n\n快来测测你的！→ https://sbti.dev`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }, [personality]);

  return (
    <div>
      {/* 分享卡片预览 - 这是会被截图的区域（截图友好：实底，不依赖 backdrop-filter） */}
      <div ref={cardRef} className="rounded-2xl overflow-hidden mb-4" style={{
        background: `linear-gradient(160deg, ${personality.color}18 0%, #f8f8f8 40%, #ffffff 100%)`,
        border: '1px solid rgba(255,255,255,0.50)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
      }}>
        <div className="relative p-6 sm:p-8">
          {/* 顶部标识 */}
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs font-bold tracking-widest" style={{ color: personality.color }}>
              SBTI
            </span>
            <span className="text-[10px] text-gray-400">Silly Big Personality Test</span>
          </div>

          {/* 人格信息 */}
          <div className="text-center mb-5">
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-3 rounded-full overflow-hidden"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.80), rgba(255,255,255,0.50))`,
                border: '2px solid rgba(255,255,255,0.60)',
                boxShadow: `0 4px 16px rgba(0,0,0,0.08), 0 0 24px ${personality.color}20`,
              }}
            >
              {personality.avatar ? (
                <img
                  src={personality.avatar}
                  alt={personality.name}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl sm:text-5xl">
                  {personality.emoji}
                </div>
              )}
            </div>
            <div className="text-2xl sm:text-3xl font-black text-gray-800 mb-1">{personality.name}</div>
            <div className="text-sm font-mono mb-2" style={{ color: personality.color }}>{personality.code}</div>
            <p className="text-sm sm:text-base text-gray-500 italic">"{personality.slogan}"</p>
          </div>

          {/* 特征标签 */}
          <div className="flex flex-wrap justify-center gap-1.5 mb-5">
            {personality.traits.map((trait, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium"
                style={{ backgroundColor: `${personality.color}15`, color: personality.color }}
              >
                {trait}
              </span>
            ))}
          </div>

          {/* 维度落点条 */}
          <div className="flex justify-center gap-0.5 mb-5">
            {Object.entries(personality.dimensions).map(([key, level]) => {
              const color = level === 'H' ? '#34d399' : level === 'M' ? '#fbbf24' : '#fb7185';
              return (
                <div key={key} className="flex flex-col items-center" style={{ width: '16px' }}>
                  <div
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm"
                    style={{ backgroundColor: color, opacity: 0.8 }}
                  />
                  <span className="text-[7px] text-gray-400 mt-0.5">{key}</span>
                </div>
              );
            })}
          </div>

          {/* 底部 */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-400">测测你的 → sbti.dev</span>
            <span className="text-[10px] text-gray-400">{personality.code}</span>
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex gap-2.5">
        <button
          onClick={generateImage}
          disabled={generating}
          className="flex-1 py-3.5 rounded-xl btn-glass text-sm sm:text-base disabled:opacity-50"
        >
          {generating ? '生成中...' : '保存为图片'}
        </button>
        <button
          onClick={copyText}
          className="flex-1 py-3.5 rounded-xl btn-glass text-sm sm:text-base"
        >
          {copied ? '已复制!' : '复制文案分享'}
        </button>
      </div>
    </div>
  );
}
