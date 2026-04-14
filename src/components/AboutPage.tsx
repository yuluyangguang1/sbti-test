import type { Page } from '../App';

interface AboutPageProps {
  onBackHome: () => void;
}

const steps = [
  { num: 1, title: '走完答题', desc: '31 道题一题一题答，从 202 道题库中随机抽取，每次顺序不同', emoji: '✍️' },
  { num: 2, title: '落到十五个维度', desc: '系统自动计算 5 套模型 × 3 个维度的落点（H/M/L）', emoji: '📊' },
  { num: 3, title: '匹配 27 种人格', desc: '根据十五维画像与人格库匹配，找到最像你的那一种', emoji: '🎯' },
];

const models = [
  { key: 'S1·S2·S3', name: '自我模型', desc: '对自我评价是否稳定，是否认识自己，内心有无特别要紧的东西', emoji: '🧠', color: '#6c5ce7' },
  { key: 'E1·E2·E3', name: '情感模型', desc: '关系中焦虑还是安心，投入程度，是否需要独立空间', emoji: '💬', color: '#fd79a8' },
  { key: 'A1·A2·A3', name: '态度模型', desc: '看世界/规则/人生意义的方式，谨慎守序还是灵活冲动', emoji: '⚡', color: '#fdcb6e' },
  { key: 'Ac1·Ac2·Ac3', name: '行动驱力模型', desc: '做事偏进攻还是规避，决定果不果断，计划能否落地', emoji: '🎭', color: '#00cec9' },
  { key: 'So1·So2·So3', name: '社交模型', desc: '是否主动靠近人，边界感强弱，不同关系里的真实程度', emoji: '🌊', color: '#74b9ff' },
];

const mbtiCompare = [
  { dim: '语言风格', sbti: '口语、损、像朋友锐评', mbti: '经典、稳定、传统框架' },
  { dim: '观察重点', sbti: '日常行为、关系反应、互联网精神状态', mbti: '认知偏好、功能分工、长期类型倾向' },
  { dim: '适合场景', sbti: '快速看懂"我现在像什么人"', mbti: '用成熟框架讨论稳定偏好' },
  { dim: '镜头比喻', sbti: '贴脸特写（看现实生活）', mbti: '广角镜头（看长期结构）' },
];

export function AboutPage({ onBackHome }: AboutPageProps) {
  return (
    <div className="min-h-screen px-8 sm:px-12 md:px-16 py-20 sm:py-24 relative">
      <div className="liquid-bg">
        <div className="liquid-blob" />
        <div className="liquid-blob" />
        <div className="liquid-blob" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <h1 className="text-3xl sm:text-4xl font-bold gradient-text animate-shimmer text-center mb-4" style={{ letterSpacing: '-0.03em' }}>
          SBTI 是什么？
        </h1>
        <p className="text-center text-base sm:text-lg text-gray-700/30 mb-5" style={{ letterSpacing: '0.01em' }}>
          Silly Big Personality Test — 带梗、但有结构的人格测试
        </p>
        <p className="text-center text-base sm:text-lg text-gray-700/35 mb-16 sm:mb-20 max-w-md mx-auto leading-relaxed" style={{ letterSpacing: '0.01em' }}>
          SBTI 从中文互联网整活文化中生长，不是心理诊断工具，是一面夸张的镜子。
        </p>

        {/* 三步判定流程 */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-10 sm:mb-14" style={{ letterSpacing: '-0.03em' }}>
          三步判定流程
        </h2>
        <div className="space-y-7 mb-24 sm:mb-28">
          {steps.map((step) => (
            <div key={step.num} className="glass-card p-10 sm:p-14">
              <div className="relative z-10 flex items-start gap-5">
                <div className="glass-step-number w-11 h-11 shrink-0 text-base">
                  {step.num}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{step.emoji}</span>
                    <h3 className="font-bold text-lg sm:text-xl text-gray-800" style={{ letterSpacing: '-0.02em' }}>{step.title}</h3>
                  </div>
                  <p className="text-base sm:text-lg text-gray-700/40 leading-relaxed" style={{ letterSpacing: '0.01em' }}>{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 15 维度 / 5 大模型 */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-10 sm:mb-14" style={{ letterSpacing: '-0.03em' }}>
          15 个维度 / 5 大模型
        </h2>
        <div className="space-y-7 mb-24 sm:mb-28">
          {models.map((model) => (
            <div key={model.key} className="glass-card p-10 sm:p-14">
              <div className="relative z-10 flex items-start gap-5">
                <div
                  className="w-14 h-14 shrink-0 flex items-center justify-center text-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${model.color}18, ${model.color}08)`,
                    border: `0.5px solid ${model.color}20`,
                    borderRadius: 'var(--radius-lg)',
                  }}
                >
                  {model.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg sm:text-xl text-gray-800" style={{ letterSpacing: '-0.02em' }}>{model.name}</h3>
                    <span className="text-sm font-mono text-gray-700/20" style={{ letterSpacing: '0.04em' }}>{model.key}</span>
                  </div>
                  <p className="text-base sm:text-lg text-gray-700/40 leading-relaxed" style={{ letterSpacing: '0.01em' }}>{model.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 结果输出机制 */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-8 sm:mb-10" style={{ letterSpacing: '-0.03em' }}>
          27 种人格结果
        </h2>
        <div className="glass-card p-10 sm:p-14 mb-20 sm:mb-24">
          <div className="relative z-10">
            <div className="space-y-5 text-base sm:text-lg text-gray-700/45 leading-relaxed" style={{ letterSpacing: '0.01em' }}>
              <p>27 种人格不是平铺随机池，而是分层判定出来的：</p>
              <div className="flex gap-5">
                <div className="flex-1 glass-tag p-6 text-center" style={{ borderRadius: 'var(--radius-lg)' }}>
                  <div className="text-3xl mb-3">👥</div>
                  <div className="font-bold text-lg text-gray-800 mb-2">25 种常规人格</div>
                  <div className="text-sm text-gray-700/35">通过十五维画像与常规人格库匹配得出</div>
                </div>
                <div className="flex-1 glass-tag p-6 text-center" style={{ borderRadius: 'var(--radius-lg)' }}>
                  <div className="text-3xl mb-3">🥚</div>
                  <div className="font-bold text-lg text-gray-800 mb-2">2 种特殊人格</div>
                  <div className="text-sm text-gray-700/35">命中隐藏条件或常规匹配度偏低时出现</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SBTI vs MBTI */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-8 sm:mb-10" style={{ letterSpacing: '-0.03em' }}>
          SBTI vs MBTI
        </h2>
        <div className="glass-card !p-0 overflow-hidden mb-20 sm:mb-24">
          <div className="relative z-10">
            <div className="grid grid-cols-3 px-8 sm:px-12 py-5 bg-purple-500/5">
              <span className="text-sm font-semibold text-gray-700/35" style={{ letterSpacing: '0.04em' }}>维度</span>
              <span className="text-sm font-semibold text-purple-500 text-center" style={{ letterSpacing: '0.04em' }}>SBTI</span>
              <span className="text-sm font-semibold text-gray-700/35 text-center" style={{ letterSpacing: '0.04em' }}>MBTI</span>
            </div>
            {mbtiCompare.map((row, i) => (
              <div key={i} className="grid grid-cols-3 px-7 sm:px-10 py-5 border-t border-black/[0.04]">
                <span className="text-sm sm:text-base font-medium text-gray-800" style={{ letterSpacing: '0.01em' }}>{row.dim}</span>
                <span className="text-sm sm:text-base text-purple-600/70 text-center" style={{ letterSpacing: '0.01em' }}>{row.sbti}</span>
                <span className="text-sm sm:text-base text-gray-700/35 text-center" style={{ letterSpacing: '0.01em' }}>{row.mbti}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 定位说明 */}
        <div className="glass-card p-10 sm:p-14 mb-16">
          <div className="relative z-10 text-center">
            <div className="text-4xl mb-5">🪞</div>
            <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-4" style={{ letterSpacing: '-0.02em' }}>定位说明</h3>
            <p className="text-base sm:text-lg text-gray-700/40 leading-relaxed max-w-md mx-auto" style={{ letterSpacing: '0.01em' }}>
              SBTI 更适合拿来娱乐、对照和自我观察，不适合作为严肃的心理诊断结果。你可以把它当成一个更好玩、更接近日常状态的人格测试。
            </p>
          </div>
        </div>

        <div className="text-center mt-16 mb-14">
          <button onClick={onBackHome} className="btn-glass px-10 py-4 text-base">
            返回首页
          </button>
        </div>
      </div>
    </div>
  );
}
