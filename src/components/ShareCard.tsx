import { useRef, useCallback, useState } from 'react';
import { type PersonalityType, dimensionDefs } from '../data';

interface ShareCardProps {
  personality: PersonalityType;
}

// 用 Canvas 手绘分享卡片（比 html2canvas 稳定 100 倍）
export async function drawShareCard(personality: PersonalityType): Promise<Blob | null> {
  const W = 800, H = 1000;
  const canvas = document.createElement('canvas');
  canvas.width = W * 2;  // 2x 高清
  canvas.height = H * 2;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.scale(2, 2);

  const color = personality.color;

  // 背景
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, color + '20');
  bg.addColorStop(0.4, '#f8f8f8');
  bg.addColorStop(1, '#ffffff');
  ctx.fillStyle = bg;
  ctx.beginPath();
  ctx.roundRect(0, 0, W, H, 32);
  ctx.fill();

  // 中文字体
  const CN = '-apple-system, "PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif';

  // 顶部标识
  ctx.font = `bold 18px ${CN}`;
  ctx.fillStyle = color;
  ctx.textAlign = 'left';
  ctx.fillText('SBTI', 40, 52);
  ctx.font = `12px ${CN}`;
  ctx.fillStyle = '#9ca3af';
  ctx.textAlign = 'right';
  ctx.fillText('Silly Big Personality Test', W - 40, 52);

  // 头像区域 - 用 emoji 替代（避免跨域图片问题）
  const avatarY = 180;
  // 头像背景圆
  const grad = ctx.createRadialGradient(W / 2, avatarY, 0, W / 2, avatarY, 80);
  grad.addColorStop(0, color + '30');
  grad.addColorStop(1, color + '08');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(W / 2, avatarY, 80, 0, Math.PI * 2);
  ctx.fill();
  // emoji
  ctx.font = '72px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(personality.emoji, W / 2, avatarY);

  // 名称
  ctx.font = `bold 42px ${CN}`;
  ctx.fillStyle = '#1f2937';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(personality.name, W / 2, avatarY + 110);

  // Code
  ctx.font = 'bold 16px monospace';
  ctx.fillStyle = color;
  ctx.fillText(personality.code, W / 2, avatarY + 140);

  // Slogan
  ctx.font = `italic 18px ${CN}`;
  ctx.fillStyle = '#6b7280';
  ctx.fillText(`"${personality.slogan}"`, W / 2, avatarY + 175);

  // 特征标签
  let tagX = 40;
  let tagY = avatarY + 220;
  ctx.font = `13px ${CN}`;
  for (const trait of personality.traits) {
    const tw = ctx.measureText(trait).width + 24;
    if (tagX + tw > W - 40) { tagX = 40; tagY += 32; }
    // 背景
    ctx.fillStyle = color + '15';
    ctx.beginPath();
    ctx.roundRect(tagX, tagY - 16, tw, 24, 12);
    ctx.fill();
    // 文字
    ctx.fillStyle = color;
    ctx.textAlign = 'left';
    ctx.fillText(trait, tagX + 12, tagY);
    tagX += tw + 8;
  }

  // 维度落点条
  const dimY = tagY + 50;
  ctx.textAlign = 'center';
  const dimKeys = Object.keys(personality.dimensions);
  const barW = 28;
  const gap = (W - 80 - dimKeys.length * barW) / (dimKeys.length - 1);
  dimKeys.forEach((key, i) => {
    const x = 40 + i * (barW + gap);
    const level = personality.dimensions[key];
    const c = level === 'H' ? '#34d399' : level === 'M' ? '#fbbf24' : '#fb7185';
    ctx.fillStyle = c + 'cc';
    ctx.beginPath();
    ctx.roundRect(x, dimY, barW, barW, 4);
    ctx.fill();
    ctx.font = `9px ${CN}`;
    ctx.fillStyle = '#9ca3af';
    ctx.fillText(key, x + barW / 2, dimY + barW + 14);
  });

  // 底部
  ctx.font = `11px ${CN}`;
  ctx.fillStyle = '#9ca3af';
  ctx.textAlign = 'left';
  ctx.fillText('测测你的 → sbti.dev', 40, H - 30);
  ctx.textAlign = 'right';
  ctx.fillText(personality.code, W - 40, H - 30);

  return new Promise(resolve => canvas.toBlob(b => resolve(b), 'image/png', 0.95));
}

export function ShareCard({ personality }: ShareCardProps) {
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);

  const generateImage = useCallback(async () => {
    setGenerating(true);
    try {
      const blob = await drawShareCard(personality);
      if (!blob) throw new Error('Canvas failed');

      const file = new File([blob], `SBTI_${personality.code}.png`, { type: 'image/png' });
      const url = URL.createObjectURL(blob);

      // 优先用 Web Share API（移动端原生分享）
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `SBTI ${personality.name}`,
          text: `我的SBTI人格是 ${personality.emoji} ${personality.name}（${personality.code}）`,
        });
      } else {
        // 降级：下载
        const a = document.createElement('a');
        a.href = url;
        a.download = `SBTI_${personality.code}.png`;
        a.click();
      }
      URL.revokeObjectURL(url);
    } catch (err: any) {
      // 用户取消分享不算错误
      if (err?.name === 'AbortError') {
        setGenerating(false);
        return;
      }
      console.error('分享失败:', err);
      // 最终 fallback：复制文案
      try {
        await navigator.clipboard.writeText(
          `我的SBTI人格是 ${personality.emoji} ${personality.name}（${personality.code}）——"${personality.slogan}"`
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        alert('分享失败，请截图保存');
      }
    }
    setGenerating(false);
  }, [personality]);

  const copyText = useCallback(async () => {
    const text = `我的SBTI人格是 ${personality.emoji} ${personality.name}（${personality.code}）——"${personality.slogan}"\n\n快来测测你的！→ https://sbti.dev`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { }
  }, [personality]);

  return (
    <div>
      {/* 分享卡片预览 */}
      <div className="rounded-2xl overflow-hidden mb-4" style={{
        background: `linear-gradient(160deg, ${personality.color}18 0%, #f8f8f8 40%, #ffffff 100%)`,
        border: '1px solid rgba(255,255,255,0.50)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
      }}>
        <div className="relative p-6 sm:p-8">
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs font-bold tracking-widest" style={{ color: personality.color }}>SBTI</span>
            <span className="text-[10px] text-gray-400">Silly Big Personality Test</span>
          </div>
          <div className="text-center mb-5">
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-3 rounded-full flex items-center justify-center text-5xl sm:text-6xl"
              style={{ background: `linear-gradient(135deg, ${personality.color}20, ${personality.color}08)`, border: '2px solid rgba(255,255,255,0.60)' }}>
              {personality.emoji}
            </div>
            <div className="text-2xl sm:text-3xl font-black text-gray-800 mb-1">{personality.name}</div>
            <div className="text-sm font-mono mb-2" style={{ color: personality.color }}>{personality.code}</div>
            <p className="text-sm sm:text-base text-gray-500 italic">&ldquo;{personality.slogan}&rdquo;</p>
          </div>
          <div className="flex flex-wrap justify-center gap-1.5 mb-5">
            {personality.traits.map((trait, i) => (
              <span key={i} className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium"
                style={{ backgroundColor: `${personality.color}15`, color: personality.color }}>
                {trait}
              </span>
            ))}
          </div>
          <div className="flex justify-center gap-0.5 mb-5">
            {Object.entries(personality.dimensions).map(([key, level]) => {
              const c = level === 'H' ? '#34d399' : level === 'M' ? '#fbbf24' : '#fb7185';
              return (
                <div key={key} className="flex flex-col items-center" style={{ width: '16px' }}>
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm" style={{ backgroundColor: c, opacity: 0.8 }} />
                  <span className="text-[7px] text-gray-400 mt-0.5">{key}</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-400">测测你的 → sbti.dev</span>
            <span className="text-[10px] text-gray-400">{personality.code}</span>
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex gap-2.5">
        <button onClick={generateImage} disabled={generating}
          className="flex-1 py-3.5 rounded-xl btn-glass text-sm sm:text-base disabled:opacity-50">
          {generating ? '生成中...' : '保存为图片'}
        </button>
        <button onClick={copyText}
          className="flex-1 py-3.5 rounded-xl btn-glass text-sm sm:text-base">
          {copied ? '已复制!' : '复制文案分享'}
        </button>
      </div>
    </div>
  );
}
