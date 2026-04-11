import { useState } from 'react';

interface FaqPageProps {
  onBackHome: () => void;
}

const faqSections = [
  {
    title: '基础问题',
    items: [
      { q: 'SBTI 是什么？', a: 'SBTI 全称 Silly Big Personality Test，可以理解成"抽象互联网人格测试"。它保留了人格分类的乐趣，但语气比传统量表更松弛、更损，也更贴近日常社交、拖延、恋爱脑和精神状态。' },
      { q: 'SBTI 测试怎么测？入口在哪里？', a: '最直接的入口就是首页的"开始测试"按钮。整套流程会按步骤出题，不需要自己记分。答完主线题后，系统会自动计算十五维落点，再把你送到对应人格页，属于"做完立刻出片"的那种测试。' },
      { q: 'SBTI 和 MBTI 有什么区别？', a: 'MBTI 更像经典人格框架，SBTI 更像中文互联网版本的精神切片。前者讲类型理论，后者讲你现实里怎么嘴硬、怎么内耗、怎么拖到最后一秒再动。一个偏正经，一个偏写实又带梗。' },
      { q: 'SBTI 测试免费吗？需要注册吗？', a: '免费，不需要注册，也不用先交邮箱换结果。你可以直接开始答题，测完就看完整结果页、十五维分析和人格解读。' },
      { q: 'SBTI 测试有多少道题？需要多长时间？', a: '每次测试从 202 道题库中随机抽取 31 道，正常认真答，3 到 6 分钟能做完。' },
      { q: 'SBTI 有多少种人格类型？', a: '目前一共有 27 种结果，其中 25 种是常规人格，另外 2 种是特殊人格（拿捏者 CTRL 和哦不人 OH-NO）。普通情况下系统会按十五维匹配常规类型；只有命中隐藏条件或常规匹配整体过低，才会走特殊结果。' },
      { q: 'SBTI 测试结果准吗？有科学依据吗？', a: 'SBTI 更适合娱乐、自我观察和朋友互相锐评，不适合拿来替代心理诊断。它有一套明确的题目、分维和匹配逻辑，但不是医学量表。你可以把它当成一面夸张的镜子，不要当病历本。' },
      { q: 'SBTI 测试可以多次做吗？为什么每次结果不一样？', a: '可以反复做。题目顺序会打乱，但只要答案完全一样，结果逻辑应当一致；如果结果变了，通常是因为你当天状态不同、题目理解变了。' },
      { q: 'SBTI 测试是谁做的？', a: '原版 SBTI 的传播语境里，很多人会提到 B站UP主蛆肉儿串儿。本站是在保留原始题库与结果逻辑的基础上，做成了更稳定、可分享、带液态玻璃 UI 的在线版本。' },
    ],
  },
  {
    title: '人格解读',
    items: [
      { q: 'SBTI 最稀有的人格是哪个？', a: '从机制看，最难"正常撞上"的是两个特殊人格：拿捏者（CTRL）和哦不人（OH-NO）。至于 25 个常规人格，系统并没有预设谁天生最稀有，全看你的十五维落点怎么分布。' },
      { q: 'SBTI DEAD 人格是什么意思？', a: 'DEAD 不是说你人没了，而是"欲望电量见底"的那种精神状态。通常表现为对很多热闹和目标失去激情，像通关人生支线 999 次后突然觉得：算了，先躺一下也行。' },
      { q: 'SBTI IMSB 人格是什么意思？', a: 'IMSB 可以理解成"想冲又想骂自己"的内耗型人格。核心不是笨，而是脑内同时住着一个热血主角和一个刻薄黑粉：前者催你上，后者当场拆台，所以人还没行动，内心戏已经上映三季。' },
      { q: 'SBTI MALO 人格是什么意思？', a: 'MALO 的气质接近"文明社会里的快乐野猴子"。不是单纯幼稚，而是对很多一本正经的规则天然没那么服。别人把人生当 KPI，MALO 更像把人生当副本，能翻跟头就不愿意老老实实走楼梯。' },
      { q: '怎么查看 SBTI 所有 27 种人格？', a: '最省事的方式是直接去人格图鉴页，那里收录了全部 27 种人格的名称、简介和详情入口。你也可以先做测试，再从结果页继续点进其他人格，按"我像不像这个"一路串着看。' },
    ],
  },
  {
    title: 'MBTI 对比',
    items: [
      { q: 'SBTI 和 MBTI 哪个更准？', a: '没有绝对统一的答案。若你想要更经典、更像传统人格分类的表达，MBTI 会更熟悉；若你想看更接近日常行为、社交状态和互联网精神面貌的结果，SBTI 反而更有代入感。它们更像两种镜头，不是同一把尺子。' },
      { q: '为什么说 MBTI 过时了 SBTI 来了？', a: '这更像一句梗，不是正式学术裁决。大家爱这么说，是因为 MBTI 的互联网表达已经被玩到很熟，而 SBTI 用更新、更损、更贴近中文语境的方式重新讲人格，所以看起来像"新版本更新了"。' },
    ],
  },
];

export function FaqPage({ onBackHome }: FaqPageProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (key: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="min-h-screen px-8 sm:px-12 py-16 sm:py-24 relative">
      <div className="liquid-bg">
        <div className="liquid-blob" />
        <div className="liquid-blob" />
        <div className="liquid-blob" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <h1 className="text-3xl sm:text-4xl font-bold gradient-text animate-shimmer text-center mb-4" style={{ letterSpacing: '-0.03em' }}>
          常见问题
        </h1>
        <p className="text-center text-base sm:text-lg text-gray-700/30 mb-16 sm:mb-20" style={{ letterSpacing: '0.01em' }}>
          关于 SBTI 你可能想知道的一切
        </p>

        {faqSections.map((section, si) => (
          <div key={si} className="mb-14 sm:mb-20">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-5 sm:mb-6" style={{ letterSpacing: '-0.03em' }}>
              {section.title}
            </h2>
            <div className="glass-card !p-0 overflow-hidden">
              <div className="relative z-10">
                {section.items.map((item, ii) => {
                  const key = `${si}-${ii}`;
                  const isOpen = openItems.has(key);
                  return (
                    <div key={ii}>
                      <div
                        className="flex items-center justify-between px-8 sm:px-12 py-6 sm:py-7 cursor-pointer hover:bg-white/[0.08] transition-colors"
                        onClick={() => toggleItem(key)}
                      >
                        <span className="text-base sm:text-lg font-medium text-gray-800 pr-4" style={{ letterSpacing: '0.01em' }}>{item.q}</span>
                        <span className={`text-xl font-light text-gray-700/35 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-45' : ''}`}>+</span>
                      </div>
                      <div
                        className="overflow-hidden transition-all duration-300 ease-in-out"
                        style={{ maxHeight: isOpen ? '300px' : '0' }}
                      >
                        <p className="px-8 sm:px-12 pb-6 sm:pb-7 text-base sm:text-lg text-gray-700/45 leading-[2.0]" style={{ letterSpacing: '0.01em' }}>{item.a}</p>
                      </div>
                      {ii < section.items.length - 1 && (
                        <div className="mx-7 sm:mx-10 border-b border-black/[0.04]" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        <div className="text-center mt-16 mb-12">
          <button onClick={onBackHome} className="btn-glass px-10 py-4 text-base">
            返回首页
          </button>
        </div>
      </div>
    </div>
  );
}
