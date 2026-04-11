import { useState, useCallback, useEffect, useMemo } from 'react';
import { questions, personalities } from '../data';

interface QuizPageProps {
  onFinish: (personalityId: string, scores: Record<string, number>) => void;
  onBackHome: () => void;
}

// 每次测试从题库抽取的题目数量
const QUIZ_LENGTH = 31;

// 每题的趣味提示语
const funHints = [
  '选第一感觉的答案，不要想太多',
  '没有对错，只有你',
  '诚实面对自己就好',
  '选最想选的那个！',
  '别纠结，冲就完了',
  '你的直觉比理性更懂你',
  '别分析，直接选',
  '想太多反而不准',
  '第一反应通常最真实',
  '随便选，反正不准（开玩笑的）',
  '认真选哦~',
  '答案没有好坏之分',
  '选最能代表你的那个',
  '你只需要对自己诚实',
  '别当自己生活的旁观者',
  '冲就完了',
  '这个测试只花2分钟，很值',
  '选最像你的，不是最想成为的',
  '你已经很棒了',
  '再坚持一下，马上出结果',
  '每道题都在缩小范围...',
  '算法正在疯狂计算中...',
  '你的人格画像越来越清晰了',
  '选完这道还有几道',
  '差点就猜到你是什么人了',
  '最后几道了，加油！',
  '你是E人还是I人？快出结果了',
  '就差一点点了',
  '再来两道！',
  '系统正在解码你的人格...',
  '最后一道了！冲！',
];

// 加载时的趣味文案
const loadingPhrases = [
  '正在分析你的精神状态...',
  '正在破译你的人格密码...',
  '正在匹配 27 种人格类型...',
  '正在统计 15 个维度的数据...',
  '正在读取你的灵魂频率...',
  '正在计算你的社交电量...',
  '正在扫描你的情感雷达...',
  '正在生成你的专属报告...',
];

// Fisher-Yates 洗牌算法
function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function QuizPage({ onFinish, onBackHome }: QuizPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [shuffleKey, setShuffleKey] = useState(0);

  // 从题库随机抽取指定数量的题目
  const shuffledQuestions = useMemo(() => {
    const shuffled = shuffleArray(questions);
    return shuffled.slice(0, QUIZ_LENGTH);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shuffleKey]);

  // 重新随机题序
  const handleReshuffle = useCallback(() => {
    setShuffleKey(k => k + 1);
    setCurrentQuestion(0);
    setScores({});
    setSelectedOption(null);
    setIsTransitioning(false);
  }, []);

  // 加载动画文案轮播
  useEffect(() => {
    if (!showLoading) return;
    const timer = setInterval(() => {
      setLoadingStep(prev => prev + 1);
    }, 500);
    return () => clearInterval(timer);
  }, [showLoading]);

  // 加载完成后出结果
  useEffect(() => {
    if (!showLoading) return;
    if (loadingStep >= loadingPhrases.length + 1) {
      const sortedEntries = Object.entries(scores).sort((a, b) => b[1] - a[1]);
      const topId = sortedEntries[0]?.[0] || 'dead';
      const matchedPersonality = personalities.find(p => p.id === topId);
      onFinish(matchedPersonality?.id || 'dead', scores);
    }
  }, [loadingStep, showLoading, scores, onFinish]);

  const handleSelectOption = useCallback((optionIndex: number) => {
    if (isTransitioning) return;

    setSelectedOption(optionIndex);
    setIsTransitioning(true);

    // Accumulate scores
    const question = shuffledQuestions[currentQuestion];
    const option = question.options[optionIndex];
    const newScores = { ...scores };
    for (const [key, value] of Object.entries(option.scores)) {
      const cleanKey = key.replace(/\s/g, '');
      newScores[cleanKey] = (newScores[cleanKey] || 0) + value;
    }
    setScores(newScores);

    // Transition to next question or finish
    setTimeout(() => {
      if (currentQuestion < shuffledQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
        setIsTransitioning(false);
      } else {
        setShowLoading(true);
        setLoadingStep(0);
      }
    }, 500);
  }, [currentQuestion, isTransitioning, scores, onFinish, shuffledQuestions]);

  // 上一题
  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0 && !isTransitioning) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedOption(null);
    }
  }, [currentQuestion, isTransitioning]);

  const progress = ((currentQuestion + 1) / shuffledQuestions.length) * 100;
  const question = shuffledQuestions[currentQuestion];
  const hint = funHints[currentQuestion % funHints.length];

  if (showLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-8 sm:px-12 relative">
        {/* 液态背景 */}
        <div className="liquid-bg">
          <div className="liquid-blob" />
          <div className="liquid-blob" />
          <div className="liquid-blob" />
        </div>
        <div className="text-center animate-fade-in relative z-10">
          <div className="text-5xl sm:text-6xl mb-6 sm:mb-8 animate-liquid-float">🧠</div>
          <h2 className="text-xl sm:text-2xl font-bold gradient-text animate-shimmer mb-5 sm:mb-6">正在分析你的人格...</h2>
          <div className="space-y-3 text-gray-700/40 text-xs sm:text-sm min-h-[140px]">
            {loadingPhrases.slice(0, Math.min(loadingStep + 1, loadingPhrases.length)).map((phrase, i) => (
              <p
                key={i}
                className={`animate-fade-in ${i === Math.min(loadingStep, loadingPhrases.length - 1) ? 'text-gray-800' : 'text-gray-700/30'}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {phrase}
              </p>
            ))}
          </div>
          <div className="mt-10 w-48 mx-auto progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${Math.min((loadingStep / loadingPhrases.length) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col px-8 sm:px-12 py-16 sm:py-24 relative">
      {/* 液态背景 */}
      <div className="liquid-bg">
        <div className="liquid-blob" />
        <div className="liquid-blob" />
        <div className="liquid-blob" />
      </div>

      {/* 顶部导航：返回首页 + 重新随机 */}
      <div className="max-w-xl mx-auto w-full mb-10 relative z-10 flex justify-between items-center">
        <button
          onClick={onBackHome}
          className="text-sm text-gray-700/30 hover:text-gray-700/60 transition-colors"
          style={{ letterSpacing: '0.01em' }}
        >
          ← 返回首页
        </button>
        <button
          onClick={handleReshuffle}
          className="text-sm text-gray-700/30 hover:text-purple-500 transition-colors"
          style={{ letterSpacing: '0.01em' }}
        >
          🎲 重新随机题序
        </button>
      </div>

      {/* Progress */}
      <div className="max-w-xl mx-auto w-full mb-16 sm:mb-24 relative z-10">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm sm:text-base text-gray-700/40" style={{ letterSpacing: '0.01em' }}>
            第 {currentQuestion + 1} / {shuffledQuestions.length} 题
          </span>
          <span className="text-sm sm:text-base text-gray-700/40 font-medium" style={{ letterSpacing: '0.04em' }}>
            {Math.round(progress)}%
          </span>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div
          className={`max-w-xl mx-auto w-full transition-all duration-500 ${
            isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          {/* 题号装饰 — 液态玻璃标签 */}
          <div className="text-center mb-10 sm:mb-12">
            <span className="glass-tag inline-flex items-center justify-center px-5 py-2 text-sm sm:text-base font-bold text-purple-600" style={{ letterSpacing: '0.04em', borderRadius: 'var(--radius-md)' }}>
              Q{currentQuestion + 1}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-14 sm:mb-18 text-center leading-[1.5] px-2" style={{ letterSpacing: '-0.02em' }}>
            {question.text}
          </h2>

          <div className="space-y-7 sm:space-y-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectOption(index)}
                className={`quiz-option w-full text-left py-7 sm:py-8 active:scale-[0.99] ${
                  selectedOption === index ? 'selected scale-[1.01]' : ''
                }`}
                disabled={isTransitioning}
              >
                <span className="text-lg sm:text-xl text-gray-800 leading-[1.85] relative z-10" style={{ letterSpacing: '0.01em' }}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom nav: previous + hint */}
      <div className="max-w-xl mx-auto w-full mt-16 sm:mt-20 relative z-10 flex justify-between items-end">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0 || isTransitioning}
          className={`text-sm transition-colors ${
            currentQuestion === 0 || isTransitioning
              ? 'text-gray-700/10 cursor-not-allowed'
              : 'text-gray-700/30 hover:text-gray-700/60'
          }`}
          style={{ letterSpacing: '0.01em' }}
        >
          ← 上一题
        </button>
        <p className="text-sm sm:text-base text-gray-700/25 animate-fade-in" key={currentQuestion} style={{ letterSpacing: '0.01em' }}>
          💡 {hint}
        </p>
      </div>
    </div>
  );
}
