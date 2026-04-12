import { useState, useCallback, useEffect, useMemo } from 'react';
import {
  originalQuestions,
  hobbyGate,
  drinkTrigger,
  calculateDimensions,
  matchPersonality,
  dimensionDefs,
  type DimensionLevel,
} from '../data';

interface QuizPageProps {
  onFinish: (personalityId: string, dimensionLevels: Record<string, DimensionLevel>, matchScore: number) => void;
  onBackHome: () => void;
}

// 选项字母前缀
const optionLetters = ['A', 'B', 'C', 'D'];

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
  '认真选哦~',
  '答案没有好坏之分',
  '选最能代表你的那个',
  '你只需要对自己诚实',
  '冲就完了',
  '这个测试只花2分钟，很值',
  '选最像你的，不是最想成为的',
  '你已经很棒了',
  '再坚持一下，马上出结果',
  '每道题都在缩小范围...',
  '算法正在疯狂计算中...',
  '你的人格画像越来越清晰了',
  '最后几道了，加油！',
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

interface AnswerRecord {
  questionIndex: number;
  optionIndex: number;
  dimensionScoresBefore: Record<string, number>;
}

export function QuizPage({ onFinish, onBackHome }: QuizPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [dimensionScores, setDimensionScores] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [answerHistory, setAnswerHistory] = useState<AnswerRecord[]>([]);
  const [drinkAnswer, setDrinkAnswer] = useState<number | null>(null);  // 爱好题答案
  const [isDrunk, setIsDrunk] = useState(false);  // 是否触发酒鬼
  const [showDrinkGate, setShowDrinkGate] = useState(false);
  const [showDrinkTrigger, setShowDrinkTrigger] = useState(false);

  // 构建完整的题目列表：30道常规题 + 门控题 + 可选的触发题
  const allQuestions = useMemo(() => {
    const qs: Array<{
      type: 'normal' | 'gate' | 'trigger';
      question: typeof originalQuestions[0] | typeof drinkGate | typeof drinkTrigger;
    }> = [];

    for (const q of originalQuestions) {
      qs.push({ type: 'normal', question: q });
    }

    // 门控题
    qs.push({ type: 'gate', question: hobbyGate });

    return qs;
  }, []);

  // 当前题目总数（不含触发题）
  const baseQuestionCount = allQuestions.length; // 31

  // 完整题目列表（包含可能的触发题）
  const fullQuestions = useMemo(() => {
    if (drinkAnswer === 3) {  // 选了"饮酒"
      return [...allQuestions, { type: 'trigger' as const, question: drinkTrigger }];
    }
    return allQuestions;
  }, [allQuestions, drinkAnswer]);

  const totalQuestions = fullQuestions.length;

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
      const dimensionLevels = calculateDimensions(dimensionScores);
      const { personality, matchScore } = matchPersonality(dimensionLevels, isDrunk);
      onFinish(personality.id, dimensionLevels, matchScore);
    }
  }, [loadingStep, showLoading, dimensionScores, isDrunk, onFinish]);

  // 选择选项
  const handleSelectOption = useCallback((optionIndex: number) => {
    if (isTransitioning) return;
    setSelectedOption(optionIndex);
    setIsTransitioning(true);

    const currentQ = fullQuestions[currentQuestion];

    if (currentQ.type === 'normal' || currentQ.type === 'trigger') {
      const q = currentQ.question as typeof originalQuestions[0];
      const value = q.options[optionIndex].value;

      // 记录答案历史
      const record: AnswerRecord = {
        questionIndex: currentQuestion,
        optionIndex,
        dimensionScoresBefore: { ...dimensionScores },
      };
      setAnswerHistory(prev => [...prev, record]);

      // 累计维度分数
      const newScores = { ...dimensionScores };
      const dim = q.dimension;
      newScores[dim] = (newScores[dim] || 0) + value;
      setDimensionScores(newScores);
    } else if (currentQ.type === 'gate') {
      const q = currentQ.question as typeof hobbyGate;
      const value = q.options[optionIndex].value;
      if (typeof value === 'number') {
        setDrinkAnswer(value);
      }
    } else if (currentQ.type === 'trigger') {
      const q = currentQ.question as typeof drinkTrigger;
      const value = q.options[optionIndex].value;
      // 选了"白酒当水喝"(value=2) → 触发酒鬼人格
      if (value === 2) {
        setIsDrunk(true);
      }
    }

    // 跳转到下一题或结束
    setTimeout(() => {
      if (currentQuestion < fullQuestions.length - 1) {
        // 如果当前是门控题且选了heavy，下一题是触发题
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
        setIsTransitioning(false);
      } else {
        setShowLoading(true);
        setLoadingStep(0);
      }
    }, 400);
  }, [currentQuestion, isTransitioning, dimensionScores, fullQuestions]);

  // 上一题（恢复分数）
  const handlePrevious = useCallback(() => {
    if (currentQuestion === 0 || isTransitioning) return;

    const currentQ = fullQuestions[currentQuestion];

    if (currentQ.type === 'normal' || currentQ.type === 'trigger') {
      const lastAnswer = answerHistory[answerHistory.length - 1];
      if (lastAnswer && lastAnswer.questionIndex === currentQuestion - 1) {
        setDimensionScores(lastAnswer.dimensionScoresBefore);
        setAnswerHistory(prev => prev.slice(0, -1));
      }
    } else if (currentQ.type === 'gate') {
      setDrinkAnswer(null);
      setIsDrunk(false);
    } else if (currentQ.type === 'trigger') {
      setIsDrunk(false);
    }

    setCurrentQuestion(prev => prev - 1);
    setSelectedOption(null);
  }, [currentQuestion, isTransitioning, answerHistory, fullQuestions]);

  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const currentQ = fullQuestions[currentQuestion];
  const hint = funHints[currentQuestion % funHints.length];

  // 获取维度标签
  const getDimLabel = () => {
    if (currentQ.type === 'normal' || currentQ.type === 'trigger') {
      const q = currentQ.question as typeof originalQuestions[0];
      const dimDef = dimensionDefs.find(d => d.key === q.dimension);
      if (dimDef) return `${dimDef.model} · ${dimDef.label}`;
    }
    if (currentQ.type === 'gate') return '特别题 · 饮酒习惯';
    return null;
  };

  if (showLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-8 sm:px-12 relative">
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

  // 获取当前题的选项
  const getOptions = () => {
    if (currentQ.type === 'gate') {
      const q = currentQ.question as typeof hobbyGate;
      return q.options.map(o => o.label);
    }
    if (currentQ.type === 'trigger') {
      const q = currentQ.question as typeof drinkTrigger;
      return q.options.map(o => o.label);
    }
    const q = currentQ.question as typeof originalQuestions[0];
    return q.options.map(o => o.label);
  };

  const dimLabel = getDimLabel();
  const options = getOptions();

  return (
    <div className="min-h-screen flex flex-col px-8 sm:px-12 py-16 sm:py-20 relative">
      <div className="liquid-bg">
        <div className="liquid-blob" />
        <div className="liquid-blob" />
        <div className="liquid-blob" />
      </div>

      {/* 顶部导航 */}
      <div className="max-w-2xl mx-auto w-full mb-10 relative z-10 flex justify-between items-center">
        <button
          onClick={onBackHome}
          className="text-sm text-gray-700/30 hover:text-gray-700/60 transition-colors"
          style={{ letterSpacing: '0.01em' }}
        >
          返回首页
        </button>
        <span className="text-xs text-gray-700/20">
          SBTI 原版
        </span>
      </div>

      {/* Progress */}
      <div className="max-w-2xl mx-auto w-full mb-14 sm:mb-16 relative z-10">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-700/40" style={{ letterSpacing: '0.01em' }}>
            第 {currentQuestion + 1} / {totalQuestions} 题
          </span>
          <span className="text-sm text-gray-700/40 font-medium" style={{ letterSpacing: '0.04em' }}>
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
          className={`max-w-2xl mx-auto w-full transition-all duration-400 ${
            isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          {/* 维度标签 */}
          {dimLabel && (
            <div className="text-center mb-6">
              <span className="glass-tag inline-flex items-center justify-center px-4 py-1.5 text-xs sm:text-sm font-medium text-purple-600/70" style={{ borderRadius: 'var(--radius-md)', letterSpacing: '0.04em' }}>
                {dimLabel}
              </span>
            </div>
          )}

          {/* 题目 */}
          <h2 className="text-2xl sm:text-2xl md:text-[28px] md:leading-[2.2] font-bold text-gray-800 mb-14 sm:mb-16 text-center leading-[2] px-2" style={{ letterSpacing: '-0.01em' }}>
            {currentQ.type === 'gate'
              ? (currentQ.question as typeof hobbyGate).text
              : currentQ.type === 'trigger'
                ? (currentQ.question as typeof drinkTrigger).text
                : (currentQ.question as typeof originalQuestions[0]).text}
          </h2>

          {/* 选项列表 - 3选1 */}
          <div className="space-y-6 sm:space-y-6 md:space-y-7">
            {options.map((label, index) => (
              <button
                key={index}
                onClick={() => handleSelectOption(index)}
                className={`quiz-option w-full text-left py-5 sm:py-6 md:py-7 active:scale-[0.99] transition-all duration-200 ${
                  selectedOption === index ? 'selected' : ''
                }`}
                disabled={isTransitioning}
              >
                <span className="flex items-start gap-4 relative z-10">
                  <span className={`flex-shrink-0 w-9 h-9 md:w-9 md:h-9 rounded-full flex items-center justify-center text-sm md:text-base font-bold transition-all duration-200 ${
                    selectedOption === index
                      ? 'bg-purple-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {optionLetters[index]}
                  </span>
                  <span className="text-xl sm:text-xl md:text-[22px] md:leading-[2.2] text-gray-800 leading-[2] pt-0.5" style={{ letterSpacing: '0.01em' }}>
                    {label}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 底部导航 */}
      <div className="max-w-2xl mx-auto w-full mt-14 sm:mt-16 relative z-10">
        <p className="text-center text-sm text-gray-700/25 mb-6 animate-fade-in" key={currentQuestion} style={{ letterSpacing: '0.01em' }}>
          {hint}
        </p>
        <div className="flex justify-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0 || isTransitioning}
            className={`text-sm transition-colors px-4 py-2.5 rounded-xl ${
              currentQuestion === 0 || isTransitioning
                ? 'text-gray-700/10 cursor-not-allowed'
                : 'text-gray-700/40 hover:text-gray-700/70 hover:bg-white/40'
            }`}
            style={{ letterSpacing: '0.01em' }}
          >
            ← 上一题
          </button>
        </div>
      </div>
    </div>
  );
}
