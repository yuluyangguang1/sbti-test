import { useState, useCallback, useEffect, useMemo } from 'react';
import { questions, personalities, dimensionDefs } from '../data';

interface QuizPageProps {
  onFinish: (personalityId: string, scores: Record<string, number>) => void;
  onBackHome: () => void;
}

// 每次测试从题库抽取的题目数量
const QUIZ_LENGTH = 31;

// 选项字母前缀
const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

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

// 从题目的 scores key 推断维度标签
function getDimensionLabel(question: typeof questions[0]): string | null {
  const scoreKeys = new Set<string>();
  for (const opt of question.options) {
    for (const key of Object.keys(opt.scores)) {
      scoreKeys.add(key.replace(/\s/g, ''));
    }
  }
  // 找到匹配的维度定义
  const matchedDim = dimensionDefs.find(d => scoreKeys.has(d.key));
  if (matchedDim) {
    return `${matchedDim.model} ${matchedDim.label}`;
  }
  return null;
}

// 存储每题的答案历史，支持回退
interface AnswerRecord {
  questionIndex: number;
  optionIndex: number;
  scoresBefore: Record<string, number>;
}

export function QuizPage({ onFinish, onBackHome }: QuizPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [shuffleKey, setShuffleKey] = useState(0);
  const [answerHistory, setAnswerHistory] = useState<AnswerRecord[]>([]);

  // 从题库随机抽取指定数量的题目（最后一题固定放末尾）
  const shuffledQuestions = useMemo(() => {
    const lastQ = questions.find(q => q.id === 31);
    const rest = questions.filter(q => q.id !== 31);
    const shuffled = shuffleArray(rest).slice(0, QUIZ_LENGTH - 1);
    if (lastQ) shuffled.push(lastQ);
    return shuffled;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shuffleKey]);

  // 重新随机题序
  const handleReshuffle = useCallback(() => {
    setShuffleKey(k => k + 1);
    setCurrentQuestion(0);
    setScores({});
    setSelectedOption(null);
    setIsTransitioning(false);
    setAnswerHistory([]);
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

  // 选择选项（自动跳转下一题）
  const handleSelectOption = useCallback((optionIndex: number) => {
    if (isTransitioning) return;
    setSelectedOption(optionIndex);
    setIsTransitioning(true);

    // 记录答案历史
    const record: AnswerRecord = {
      questionIndex: currentQuestion,
      optionIndex,
      scoresBefore: { ...scores },
    };
    setAnswerHistory(prev => [...prev, record]);

    // 累计分数
    const question = shuffledQuestions[currentQuestion];
    const option = question.options[optionIndex];
    const newScores = { ...scores };
    for (const [key, value] of Object.entries(option.scores)) {
      const cleanKey = key.replace(/\s/g, '');
      newScores[cleanKey] = (newScores[cleanKey] || 0) + value;
    }
    setScores(newScores);

    // 跳转到下一题或结束
    setTimeout(() => {
      if (currentQuestion < shuffledQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
        setIsTransitioning(false);
      } else {
        setShowLoading(true);
        setLoadingStep(0);
      }
    }, 400);
  }, [currentQuestion, isTransitioning, scores, shuffledQuestions]);

  // 上一题（恢复分数）
  const handlePrevious = useCallback(() => {
    if (currentQuestion === 0 || isTransitioning) return;
    const lastAnswer = answerHistory[answerHistory.length - 1];
    if (lastAnswer && lastAnswer.questionIndex === currentQuestion - 1) {
      setScores(lastAnswer.scoresBefore);
      setAnswerHistory(prev => prev.slice(0, -1));
    }
    setCurrentQuestion(prev => prev - 1);
    setSelectedOption(null);
  }, [currentQuestion, isTransitioning, answerHistory]);

  const progress = ((currentQuestion + 1) / shuffledQuestions.length) * 100;
  const question = shuffledQuestions[currentQuestion];
  const hint = funHints[currentQuestion % funHints.length];
  const dimLabel = getDimensionLabel(question);

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
    <div className="min-h-screen flex flex-col px-8 sm:px-12 py-12 sm:py-20 relative">
      {/* 液态背景 */}
      <div className="liquid-bg">
        <div className="liquid-blob" />
        <div className="liquid-blob" />
        <div className="liquid-blob" />
      </div>

      {/* 顶部导航：返回首页 + 重新随机 */}
      <div className="max-w-2xl mx-auto w-full mb-8 relative z-10 flex justify-between items-center">
        <button
          onClick={onBackHome}
          className="text-sm text-gray-700/30 hover:text-gray-700/60 transition-colors"
          style={{ letterSpacing: '0.01em' }}
        >
          返回首页
        </button>
        <button
          onClick={handleReshuffle}
          className="text-sm text-gray-700/30 hover:text-purple-500 transition-colors"
          style={{ letterSpacing: '0.01em' }}
        >
          重新随机题序
        </button>
      </div>

      {/* Progress */}
      <div className="max-w-2xl mx-auto w-full mb-12 sm:mb-16 relative z-10">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-700/40" style={{ letterSpacing: '0.01em' }}>
            第 {currentQuestion + 1} / {shuffledQuestions.length} 题
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
          <h2 className="text-xl sm:text-2xl md:text-[28px] md:leading-[2.2] font-bold text-gray-800 mb-12 sm:mb-16 text-center leading-[2] px-2" style={{ letterSpacing: '-0.01em' }}>
            {question.text}
          </h2>

          {/* 选项列表 */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectOption(index)}
                className={`quiz-option w-full text-left py-5 sm:py-6 md:py-7 active:scale-[0.99] transition-all duration-200 ${
                  selectedOption === index ? 'selected' : ''
                }`}
                disabled={isTransitioning}
              >
                {/* A/B/C 字母前缀 + 选项文字 */}
                <span className="flex items-start gap-4 relative z-10">
                  <span className={`flex-shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-sm md:text-base font-bold transition-all duration-200 ${
                    selectedOption === index
                      ? 'bg-purple-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {optionLetters[index]}
                  </span>
                  <span className="text-lg sm:text-xl md:text-[22px] md:leading-[2.2] text-gray-800 leading-[2] pt-0.5" style={{ letterSpacing: '0.01em' }}>
                    {option.label}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 底部导航：上一题 / 提示 */}
      <div className="max-w-2xl mx-auto w-full mt-12 sm:mt-16 relative z-10">
        {/* 提示语 */}
        <p className="text-center text-sm text-gray-700/25 mb-6 animate-fade-in" key={currentQuestion} style={{ letterSpacing: '0.01em' }}>
          {hint}
        </p>

        <div className="flex justify-center">
          {/* 上一题 */}
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
