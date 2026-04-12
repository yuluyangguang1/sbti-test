import { personalities, type PersonalityType } from '../data';
import { PersonalityAvatar } from './PersonalityAvatar';

interface SimilarPersonalitiesProps {
  personality: PersonalityType;
  onViewPersonality: (id: string) => void;
}

export function SimilarPersonalities({ personality, onViewPersonality }: SimilarPersonalitiesProps) {
  const similarIds = personality.similar || [];
  if (similarIds.length === 0) return null;

  const similarTypes = similarIds
    .map(id => personalities.find(p => p.id === id))
    .filter((p): p is PersonalityType => !!p);

  if (similarTypes.length === 0) return null;

  return (
    <div className="glass-card" style={{ padding: '48px 44px' }}>
      <div className="relative z-10">
        <h3 className="text-base sm:text-lg font-bold text-black/80 mb-1">和你很像的人</h3>
        <p className="text-xs sm:text-sm text-black/40 mb-4 sm:mb-5">
          以下是气质上和你最接近的几种人格
        </p>

        <div className="space-y-5 sm:space-y-6">
          {similarTypes.map((p) => (
            <button
              key={p.id}
              onClick={() => onViewPersonality(p.id)}
              className="w-full flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-xl glass-tag hover:bg-white/40 transition-all duration-300 active:scale-[0.98] text-left"
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <PersonalityAvatar
                  emoji={p.emoji}
                  name={p.name}
                  color={p.color}
                  avatar={p.avatar}
                  size="sm"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-bold text-sm sm:text-base text-black/80 truncate">{p.name}</span>
                  <span className="text-[10px] sm:text-xs font-mono shrink-0" style={{ color: p.color }}>{p.code}</span>
                </div>
                <p className="text-[11px] sm:text-xs text-black/35 italic truncate">"{p.slogan}"</p>
              </div>

              {/* Arrow */}
              <span className="text-black/20 text-lg shrink-0">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
