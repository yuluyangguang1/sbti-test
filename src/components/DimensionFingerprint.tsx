import { useMemo } from 'react';
import { type PersonalityType, type DimensionLevel, dimensionDefs, dimensionInterpretations, modelDescriptions } from '../data';

interface DimensionFingerprintProps {
  personality: PersonalityType;
  userDimensionLevels?: Record<string, DimensionLevel>; // 用户的实际维度落点
}

// 模型顺序
const MODEL_ORDER = ['S', 'E', 'A', 'Ac', 'So'];

export function DimensionFingerprint({ personality, userDimensionLevels }: DimensionFingerprintProps) {
  // 按模型分组
  const groupedDimensions = useMemo(() => {
    const groups: { modelKey: string; modelName: string; modelDesc: string; dims: typeof dimensionDefs }[] = [];
    for (const modelKey of MODEL_ORDER) {
      const dims = dimensionDefs.filter(d => d.modelKey === modelKey);
      const modelInfo = modelDescriptions[modelKey];
      groups.push({
        modelKey,
        modelName: modelInfo.name,
        modelDesc: modelInfo.description,
        dims,
      });
    }
    return groups;
  }, []);

  // 获取落点颜色
  const getLevelStyle = (level: 'H' | 'M' | 'L') => {
    switch (level) {
      case 'H': return {
        bg: 'bg-emerald-500/15',
        text: 'text-emerald-500',
        border: 'border-emerald-500/25',
        dot: 'bg-emerald-400',
        label: '高',
      };
      case 'M': return {
        bg: 'bg-amber-500/15',
        text: 'text-amber-500',
        border: 'border-amber-500/25',
        dot: 'bg-amber-400',
        label: '中',
      };
      case 'L': return {
        bg: 'bg-rose-500/15',
        text: 'text-rose-500',
        border: 'border-rose-500/25',
        dot: 'bg-rose-400',
        label: '低',
      };
    }
  };

  // 显示用户的维度落点，如果没有则显示人格模板的
  const getDimension = (dimKey: string): DimensionLevel => {
    if (userDimensionLevels && userDimensionLevels[dimKey]) {
      return userDimensionLevels[dimKey];
    }
    return personality.dimensions[dimKey] as DimensionLevel;
  };

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* 标题 */}
      <div className="text-center mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-bold text-black/80 mb-1">
          十五维指纹
        </h3>
        <p className="text-xs text-black/35">
          5 套模型 × 3 维度，你的落点在哪？
        </p>
      </div>

      {/* 图例 */}
      <div className="flex justify-center gap-4 sm:gap-6 mb-2 sm:mb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-[11px] sm:text-xs text-black/35">H 高位</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="text-[11px] sm:text-xs text-black/35">M 中位</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-400" />
          <span className="text-[11px] sm:text-xs text-black/35">L 低位</span>
        </div>
      </div>

      {/* 总览条 */}
      <div className="flex justify-center gap-2 sm:gap-3 flex-wrap py-4">
        {dimensionDefs.map((dim) => {
          const level = getDimension(dim.key);
          const style = getLevelStyle(level);
          return (
            <div
              key={dim.key}
              className="flex flex-col items-center"
              title={`${dim.label}: ${style.label} - ${dimensionInterpretations[dim.key]?.[level] || ''}`}
            >
              <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md ${style.dot} opacity-80`} />
              <span className="text-[8px] sm:text-[9px] text-black/25 mt-1">{dim.key}</span>
            </div>
          );
        })}
      </div>

      {/* 每个模型 */}
      {groupedDimensions.map((group) => (
        <div key={group.modelKey} className="py-2">
          {/* 模型头部 */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-0.5">
              <span
                className="inline-flex items-center justify-center w-6 h-6 rounded-md text-[10px] sm:text-xs font-bold"
                style={{ backgroundColor: `${personality.color}20`, color: personality.color }}
              >
                {group.modelKey}
              </span>
              <span className="font-bold text-sm sm:text-base text-black/80">{group.modelName}</span>
            </div>
            <p className="text-[10px] sm:text-xs text-black/30 pl-8">{group.modelDesc}</p>
          </div>

          {/* 维度行 */}
          <div className="space-y-3 sm:space-y-4 pl-1 sm:pl-2">
            {group.dims.map((dim) => {
              const level = getDimension(dim.key);
              const style = getLevelStyle(level);
              const interpretation = dimensionInterpretations[dim.key]?.[level] || '';

              return (
                <div key={dim.key} className="group">
                  {/* 维度名称 + 落点标签 */}
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] sm:text-xs font-mono text-black/30 w-6 shrink-0">{dim.key}</span>
                    <span className="text-xs sm:text-sm text-black/60 flex-1">{dim.label}</span>
                    <span
                      className={`inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-bold border ${style.bg} ${style.text} ${style.border}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                      {style.label}
                    </span>
                  </div>
                  {/* 解读文案 */}
                  <p className="text-[10px] sm:text-xs text-black/30 pl-8 leading-relaxed group-hover:text-black/45 transition-colors">
                    {interpretation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
