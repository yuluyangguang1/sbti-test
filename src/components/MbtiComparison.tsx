import { type PersonalityType } from '../data';

interface MbtiComparisonProps {
  personality: PersonalityType;
}

// MBTI 类型关键词
const mbtiKeywords: Record<string, { traits: string; vibe: string }> = {
  ENTJ: { traits: '结构感、掌控欲和目标推进能力', vibe: '天生领导型，目标清晰、执行力强' },
  INTJ: { traits: '战略远见、独立思考和系统规划力', vibe: '幕后操盘型，全局在握、不声不响就把事办了' },
  ENTP: { traits: '脑洞大、反骨、好奇心拉满', vibe: '点子王，不按套路出牌但总能整出新东西' },
  ENFP: { traits: '情感丰富、想象力无边、自由不羁', vibe: '灵感型选手，靠直觉和热情活着' },
  ESFP: { traits: '活在当下、喜欢刺激、社交永动机', vibe: '现场型选手，哪里有嗨哪里就有 ta' },
  ESTP: { traits: '行动快、反应快、不走寻常路', vibe: '即兴型选手，先做了再说' },
  ESTJ: { traits: '秩序感、执行力和"我来安排"的气场', vibe: '组织型选手，规矩和效率是信仰' },
  ENFJ: { traits: '感染力、理想主义和"我来带领"的使命感', vibe: '精神领袖型，点燃别人比点燃自己更在行' },
  ESFJ: { traits: '关系型、温暖可靠、细心周到', vibe: '氛围守护者，别人的事比自己的还上心' },
  ISFJ: { traits: '安静付出、细心、可靠', vibe: '隐形守护者，默默把一切安排妥当' },
  INFJ: { traits: '直觉共情、洞察深层、神秘', vibe: '灵魂型选手，看得比谁都远但不太说' },
  INFP: { traits: '浪漫、理想主义、内心世界丰富', vibe: '精神花园常驻居民，用感受丈量世界' },
  ISFP: { traits: '随性、审美在线、感受力强', vibe: '活在美感里的人，不强求但很讲究' },
  INTP: { traits: '逻辑推演、好奇心拉满、沉浸式思考', vibe: '脑子里永远在跑马拉松的思维者' },
  ISTP: { traits: '动手能力强、专注当下、讲究质感', vibe: '实干型选手，能做就不废话' },
  ISTJ: { traits: '严谨、靠谱、长远规划', vibe: '守序型选手，规则和责任是底线' },
};

// 动态生成"为什么像"的文案
function generateWhyText(personality: PersonalityType): string {
  const types = personality.mbti || [];
  if (types.length === 0) return '';

  const descriptions = types.map(t => mbtiKeywords[t]).filter(Boolean);
  if (descriptions.length === 0) return '';

  const typeNames = types.join(' 和 ');
  const traitParts = descriptions.map(d => d.traits).join('，同时也有');
  const vibeParts = descriptions.map(d => d.vibe).join('，');

  return `${typeNames}都带${traitParts}，而${personality.name}像是把这份气质直接焊在了出厂设置上——${vibeParts}。`;
}

// MBTI 字母含义
const letterMeanings: Record<string, string> = {
  E: '外向', I: '内向', S: '感觉', N: '直觉',
  T: '思考', F: '情感', J: '判断', P: '知觉',
};

export function MbtiComparison({ personality }: MbtiComparisonProps) {
  const mbtiTypes = personality.mbti;
  if (!mbtiTypes || mbtiTypes.length === 0) return null;

  const whyText = generateWhyText(personality);

  return (
    <div className="glass-card !p-8 sm:!p-10">
      <div className="relative z-10">
      {/* Title */}
      <h3 className="text-base sm:text-lg font-bold text-black/80 mb-1">
        SBTI <span className="text-purple-500">×</span> MBTI
      </h3>
      <p className="text-xs sm:text-sm text-black/45 mb-5 sm:mb-7">
        {personality.name} 放到 MBTI 语境里，更像哪几型？
      </p>

      {/* MBTI Type Badges */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-5 mb-5 sm:mb-7">
        {mbtiTypes.map((type) => (
          <div key={type} className="group relative">
            <div
              className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl text-lg sm:text-xl font-black tracking-wider border-2 transition-all duration-300 cursor-default"
              style={{
                borderColor: personality.color,
                color: personality.color,
                backgroundColor: `${personality.color}10`,
              }}
            >
              {type}
            </div>
            {/* Letter meaning tooltip */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 pointer-events-none">
              <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-lg px-3 py-2 shadow-xl whitespace-nowrap">
                <div className="flex gap-2.5 text-xs">
                  {type.split('').map((l, i) => (
                    <span key={i} className="text-black/50">
                      <span className="font-bold text-black/80">{l}</span>
                      <span className="text-black/40 ml-0.5">{letterMeanings[l] || ''}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Why explanation */}
      {whyText && (
        <p className="text-sm sm:text-base text-black/60 leading-relaxed mb-5 sm:mb-7">
          如果你是 {personality.name}，MBTI 里最容易让人想到{' '}
          {mbtiTypes.join(' 或 ')}。{whyText}
        </p>
      )}

      {/* Bridge reading - dual column */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl glass-tag p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-bold"
              style={{ backgroundColor: `${personality.color}20`, color: personality.color }}
            >
              MBTI
            </span>
            <span className="text-[10px] sm:text-xs text-black/35">怎么读这组对照</span>
          </div>
          <p className="text-xs sm:text-sm text-black/45 leading-relaxed">
            这不是官方一一对应，也不是科学换算，而是把相近的人格气质换成 MBTI 更熟悉的表达，方便你快速理解这页结果大概落在哪条路线上。
          </p>
        </div>
        <div className="rounded-xl glass-tag p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-bold"
              style={{ backgroundColor: `${personality.color}20`, color: personality.color }}
            >
              SBTI
            </span>
            <span className="text-[10px] sm:text-xs text-black/35">更贴脸的表达</span>
          </div>
          <p className="text-xs sm:text-sm text-black/45 leading-relaxed">
            把 MBTI 当成阅读抓手就够了，不要当成裁判结论。真要看日常行为、关系反应和互联网精神状态，SBTI 这套语言会更贴脸。
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
