import { useState, useEffect } from 'react';
import { personalities } from '../data';
import { PersonalityAvatar } from './PersonalityAvatar';

interface RankingsPageProps {
  onBackHome: () => void;
  onStartQuiz: () => void;
}

interface RankingItem {
  id: string;
  count: number;
}

export function RankingsPage({ onBackHome, onStartQuiz }: RankingsPageProps) {
  const [rankings, setRankings] = useState<RankingItem[]>([]);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [listedTypes, setListedTypes] = useState(0);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem('sbti_rankings') || '{}');
      const items: RankingItem[] = Object.entries(data)
        .map(([id, count]) => ({ id, count: count as number }))
        .sort((a, b) => b.count - a.count);
      setRankings(items);
      setTotalSubmissions(items.reduce((sum, item) => sum + item.count, 0));
      setListedTypes(items.length);
    } catch {
      setRankings([]);
    }
  }, []);

  return (
    <div className="min-h-screen px-8 sm:px-12 md:px-16 py-20 sm:py-24 relative">
      <div className="liquid-bg">
        <div className="liquid-blob" />
        <div className="liquid-blob" />
        <div className="liquid-blob" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <h1 className="text-3xl sm:text-4xl font-bold gradient-text animate-shimmer text-center mb-4" style={{ letterSpacing: '-0.03em' }}>
          SBTI 人格排行榜
        </h1>
        <p className="text-center text-base sm:text-lg text-gray-700/30 mb-14 sm:mb-16 max-w-md mx-auto leading-relaxed" style={{ letterSpacing: '0.01em' }}>
          数据来源：本机用户在结果页主动提交的测试结果统计，仅统计总榜，不区分地区
        </p>

        {/* 统计概览 */}
        <div className="grid grid-cols-2 gap-7 sm:gap-8 mb-20 sm:mb-24">
          <div className="glass-card p-10 sm:p-14 text-center">
            <div className="relative z-10">
              <div className="text-3xl sm:text-4xl font-bold text-purple-500" style={{ letterSpacing: '-0.03em' }}>{totalSubmissions}</div>
              <div className="text-sm text-gray-700/30 mt-2" style={{ letterSpacing: '0.04em' }}>总提交数</div>
            </div>
          </div>
          <div className="glass-card p-10 sm:p-14 text-center">
            <div className="relative z-10">
              <div className="text-3xl sm:text-4xl font-bold text-pink-500" style={{ letterSpacing: '-0.03em' }}>{listedTypes}</div>
              <div className="text-sm text-gray-700/30 mt-2" style={{ letterSpacing: '0.04em' }}>已上榜人格</div>
            </div>
          </div>
        </div>

        {/* 排行榜表格 */}
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-6 sm:mb-8" style={{ letterSpacing: '-0.03em' }}>
          27 种人格排行榜
        </h2>

        {rankings.length === 0 ? (
          <div className="glass-card p-12 sm:p-16 text-center">
            <div className="relative z-10">
              <div className="text-5xl mb-5">📋</div>
              <p className="text-base sm:text-lg text-gray-700/35 mb-8" style={{ letterSpacing: '0.01em' }}>
                还没有人提交测试结果，快去做一次测试吧！
              </p>
              <button onClick={onStartQuiz} className="btn-primary px-10 py-4 text-base">
                开始测试
              </button>
            </div>
          </div>
        ) : (
          <div className="glass-card !p-0 overflow-hidden mb-16 sm:mb-20">
            <div className="relative z-10">
              {/* 表头 */}
              <div className="grid grid-cols-[48px_1fr_80px_80px] px-7 sm:px-10 py-4 bg-purple-500/5">
                <span className="text-sm font-semibold text-gray-700/35" style={{ letterSpacing: '0.04em' }}>排名</span>
                <span className="text-sm font-semibold text-gray-700/35" style={{ letterSpacing: '0.04em' }}>人格</span>
                <span className="text-sm font-semibold text-gray-700/35 text-center" style={{ letterSpacing: '0.04em' }}>提交数</span>
                <span className="text-sm font-semibold text-gray-700/35 text-center" style={{ letterSpacing: '0.04em' }}>占比</span>
              </div>
              {/* 表格行 */}
              {rankings.map((item, index) => {
                const p = personalities.find(pp => pp.id === item.id);
                if (!p) return null;
                const pct = totalSubmissions > 0 ? ((item.count / totalSubmissions) * 100).toFixed(1) : '0';
                const isTop3 = index < 3;
                return (
                  <div key={item.id} className="grid grid-cols-[48px_1fr_80px_80px] items-center px-8 sm:px-12 py-5 border-t border-black/[0.04] hover:bg-white/[0.06] transition-colors">
                    <span className={`text-base font-bold ${isTop3 ? 'text-purple-500' : 'text-gray-700/25'}`} style={{ letterSpacing: '0.04em' }}>
                      {index + 1}
                    </span>
                    <div className="flex items-center gap-3">
                      <PersonalityAvatar emoji={p.emoji} name={p.name} color={p.color} avatar={p.avatar} size="xs" />
                      <span className="text-base font-medium text-gray-800 truncate" style={{ letterSpacing: '0.01em' }}>{p.name}</span>
                    </div>
                    <span className="text-base text-gray-700/45 text-center" style={{ letterSpacing: '0.04em' }}>{item.count}</span>
                    <span className="text-base text-gray-700/30 text-center" style={{ letterSpacing: '0.04em' }}>{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 未上榜人格 */}
        {rankings.length > 0 && rankings.length < 27 && (
          <div className="mb-14">
            <h3 className="text-sm font-medium text-gray-700/30 mb-4" style={{ letterSpacing: '0.01em' }}>尚未上榜的人格</h3>
            <div className="flex flex-wrap gap-3">
              {personalities
                .filter(p => !rankings.some(r => r.id === p.id))
                .map(p => (
                  <span key={p.id} className="glass-tag px-4 py-2 text-sm text-gray-700/35" style={{ letterSpacing: '0.02em', borderRadius: 'var(--radius-md)' }}>
                    {p.emoji} {p.name}
                  </span>
                ))}
            </div>
          </div>
        )}

        <div className="text-center mt-14 mb-14 flex gap-5 justify-center">
          <button onClick={onBackHome} className="btn-glass px-10 py-4 text-base">
            返回首页
          </button>
          <button onClick={onStartQuiz} className="btn-primary px-10 py-4 text-base">
            去测试
          </button>
        </div>
      </div>
    </div>
  );
}
