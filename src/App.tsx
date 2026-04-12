import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { QuizPage } from './components/QuizPage';
import { ResultPage } from './components/ResultPage';
import { GalleryPage } from './components/GalleryPage';
import { FaqPage } from './components/FaqPage';
import { AboutPage } from './components/AboutPage';
import { RankingsPage } from './components/RankingsPage';
import { Navbar } from './components/Navbar';

export type Page = 'landing' | 'quiz' | 'result' | 'gallery' | 'faq' | 'about' | 'rankings';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [resultId, setResultId] = useState<string>('');
  const [scores, setScores] = useState<Record<string, number>>({});
  const [quizResetKey, setQuizResetKey] = useState(0);

  // 页面切换时滚动到顶部
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // 监听 hash 变化，支持可分享链接
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      // 支持 #type/IMSB 格式
      if (hash.startsWith('type/')) {
        const id = hash.replace('type/', '');
        const validIds = ['dead','fuck','woc','shit','malo','joke-r','imsb','solo','poor','fake','ojbk','zzzz','think','ctrl','boss','gogo','sexy','love-r','mum','dior-s','atm-er','thank','oh-no','monk','hhhh','drunk'];
        if (validIds.includes(id)) {
          setResultId(id);
          setCurrentPage('result');
        }
      } else if (['landing','quiz','result','gallery','faq','about','rankings'].includes(hash)) {
        setCurrentPage(hash as Page);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.location.hash = page === 'landing' ? '' : page;
  };

  const handleStartQuiz = () => {
    setQuizResetKey(k => k + 1);
    navigateTo('quiz');
  };

  const handleFinishQuiz = (personalityId: string, finalScores: Record<string, number>) => {
    setResultId(personalityId);
    setScores(finalScores);
    setCurrentPage('result');
    window.location.hash = `type/${personalityId}`;
    // 记录到排行榜 localStorage
    try {
      const rankings = JSON.parse(localStorage.getItem('sbti_rankings') || '{}');
      rankings[personalityId] = (rankings[personalityId] || 0) + 1;
      localStorage.setItem('sbti_rankings', JSON.stringify(rankings));
    } catch {}
  };

  const handleViewGallery = () => navigateTo('gallery');
  const handleBackHome = () => navigateTo('landing');

  const handleViewPersonality = (personalityId: string) => {
    setResultId(personalityId);
    setCurrentPage('result');
    window.location.hash = `type/${personalityId}`;
  };

  const handleViewFaq = () => navigateTo('faq');
  const handleViewAbout = () => navigateTo('about');
  const handleViewRankings = () => navigateTo('rankings');

  // 不显示导航栏的页面
  const hideNav = currentPage === 'quiz';

  return (
    <div className="min-h-screen">
      {!hideNav && (
        <Navbar
          currentPage={currentPage}
          onNavigate={navigateTo}
          onStartQuiz={handleStartQuiz}
        />
      )}
      {currentPage === 'landing' && (
        <LandingPage
          onStartQuiz={handleStartQuiz}
          onViewGallery={handleViewGallery}
          onViewFaq={handleViewFaq}
          onViewAbout={handleViewAbout}
          onViewRankings={handleViewRankings}
        />
      )}
      {currentPage === 'quiz' && (
        <QuizPage key={quizResetKey} onFinish={handleFinishQuiz} onBackHome={handleBackHome} />
      )}
      {currentPage === 'result' && (
        <ResultPage
          personalityId={resultId}
          scores={scores}
          onBackHome={handleBackHome}
          onViewGallery={handleViewGallery}
          onRetake={handleStartQuiz}
          onViewPersonality={handleViewPersonality}
        />
      )}
      {currentPage === 'gallery' && (
        <GalleryPage
          onBackHome={handleBackHome}
          onViewPersonality={handleViewPersonality}
        />
      )}
      {currentPage === 'faq' && (
        <FaqPage onBackHome={handleBackHome} />
      )}
      {currentPage === 'about' && (
        <AboutPage onBackHome={handleBackHome} />
      )}
      {currentPage === 'rankings' && (
        <RankingsPage onBackHome={handleBackHome} onStartQuiz={handleStartQuiz} />
      )}
      {!hideNav && (
        <footer className="text-center py-8 text-xs text-gray-400 select-none">
          <span className="relative inline-block group cursor-default">
            by yuluyangguang
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <img
                src="/yuluyangguangdoudian.png"
                alt="yuluyangguang"
                className="w-24 h-24 rounded-full shadow-lg ring-2 ring-purple-200"
              />
            </span>
          </span>
        </footer>
      )}
    </div>
  );
}

export default App;
