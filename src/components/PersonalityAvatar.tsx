import { useMemo } from 'react';
import { getAvatarPath, type AvatarStyle } from '../data';

interface PersonalityAvatarProps {
  emoji: string;
  name: string;
  color: string;
  avatar: string;
  personalityId: string;
  avatarStyle?: 'original' | 'remastered';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  noAnimation?: boolean;
}

const sizeMap = {
  xs: { container: 'w-8 h-8', emoji: 'text-sm' },
  sm: { container: 'w-11 h-11 sm:w-13 sm:h-13', emoji: 'text-xl sm:text-2xl' },
  md: { container: 'w-18 h-18 sm:w-22 sm:h-22', emoji: 'text-3xl sm:text-4xl' },
  lg: { container: 'w-28 h-28 sm:w-36 sm:h-36', emoji: 'text-5xl sm:text-6xl' },
  xl: { container: 'w-40 h-40 sm:w-48 sm:h-48', emoji: 'text-7xl sm:text-8xl' },
};

export function PersonalityAvatar({ emoji, name, color, avatar, personalityId, avatarStyle = 'remastered', size = 'md', className = '', noAnimation = false }: PersonalityAvatarProps) {
  const s = sizeMap[size];
  const isLarge = size === 'lg' || size === 'xl';

  // 根据图鉴风格计算实际头像路径
  const resolvedAvatar = useMemo(() => {
    if (avatarStyle === 'original' && personalityId) {
      const origPath = getAvatarPath(personalityId, 'original');
      if (origPath) return origPath;
    }
    return avatar;
  }, [avatarStyle, personalityId, avatar]);

  // 液态玻璃头像框样式
  const glassStyle = {
    background: `linear-gradient(135deg, rgba(255,255,255,0.60), rgba(255,255,255,0.35))`,
    backdropFilter: 'blur(40px) saturate(150%)',
    WebkitBackdropFilter: 'blur(40px) saturate(150%)',
    border: `2px solid rgba(255, 255, 255, 0.50)`,
    boxShadow: `0 4px 16px rgba(0,0,0,0.08), inset 0 1px 2px rgba(255,255,255,0.60), 0 0 20px ${color}25`,
    borderRadius: '50%',
  };

  // 如果有头像图片
  if (resolvedAvatar) {
    return (
      <div className={`relative inline-flex items-center justify-center ${s.container} ${className}`}>
        {/* 大头像的液态光晕 */}
        {isLarge && (
          <>
            <div
              className={`absolute -inset-6 rounded-full opacity-40 blur-2xl ${noAnimation ? '' : 'animate-liquid-float'}`}
              style={{ backgroundColor: color, animationDuration: '5s' }}
            />
            <div className="liquid-avatar-ring-2" style={{ borderColor: `${color}15` }} />
            <div className="liquid-avatar-ring" style={{ borderColor: `${color}25` }} />
          </>
        )}

        {/* 头像图片 — 直接展示，无玻璃框 */}
        <div
          className={`relative w-full h-full overflow-hidden ${isLarge ? 'liquid-avatar' : ''}`}
          style={{ borderRadius: '50%' }}
        >
          <img
            src={resolvedAvatar}
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  // Emoji fallback — 液态玻璃头像
  return (
    <div className={`relative inline-flex items-center justify-center ${s.container} ${className}`}>
      {/* 大头像的液态光晕 */}
      {isLarge && (
        <>
          <div
            className={`absolute -inset-8 rounded-full opacity-30 blur-2xl ${noAnimation ? '' : 'animate-liquid-float'}`}
            style={{ backgroundColor: color, animationDuration: '6s' }}
          />
          <div className="liquid-avatar-ring-2" style={{ borderColor: `${color}12` }} />
          <div className="liquid-avatar-ring" style={{ borderColor: `${color}20` }} />
        </>
      )}

      {/* 液态玻璃头像框 */}
      <div
        className={`relative w-full h-full flex items-center justify-center ${isLarge ? 'liquid-avatar' : ''}`}
        style={{
          ...glassStyle,
          background: `linear-gradient(135deg, ${color}18, ${color}08, rgba(255,255,255,0.20))`,
        }}
      >
        {/* 顶部光泽条 */}
        {isLarge && (
          <div
            className="absolute top-[2px] left-[15%] right-[15%] h-3 rounded-full"
            style={{ background: 'rgba(255,255,255,0.20)' }}
          />
        )}

        {/* 玻璃高光 */}
        <div
          className="absolute inset-0 rounded-[inherit]"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)',
            pointerEvents: 'none',
          }}
        />

        {/* 内部虚线装饰环 */}
        <div
          className="absolute inset-2 rounded-[inherit] border border-dashed opacity-15"
          style={{ borderColor: color }}
        />

        {/* 径向渐变叠加 */}
        <div
          className="absolute inset-0 rounded-[inherit]"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${color}20, ${color}08 60%, transparent 80%)`,
          }}
        />

        {/* Emoji */}
        <span className={`relative z-10 ${s.emoji} drop-shadow-lg ${noAnimation ? '' : 'animate-gentle-float'}`}>
          {emoji}
        </span>
      </div>
    </div>
  );
}
