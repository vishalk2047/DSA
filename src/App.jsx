import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import QuizSetupModal from './components/QuizSetupModal';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import QuizArena from './pages/QuizArena';
import QuizResultPage from './pages/QuizResultPage';

function AppContent() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentQuizConfig, setCurrentQuizConfig] = useState(null);
  const [quizResultData, setQuizResultData] = useState(null);
  const [isQuizSetupOpen, setIsQuizSetupOpen] = useState(false);
  const [quizSetupTopic, setQuizSetupTopic] = useState('all');
  const [quizSetupDifficulty, setQuizSetupDifficulty] = useState('all');
  const [quizSetupCount, setQuizSetupCount] = useState(5);

  const { recordQuizResult } = useAuth();

  const handleOpenQuizModal = (topicId = 'all', diff = 'all', count = 5) => {
    setQuizSetupTopic(topicId);
    setQuizSetupDifficulty(diff);
    setQuizSetupCount(count);
    setIsQuizSetupOpen(true);
  };

  const handleStartConfiguredQuiz = (config) => {
    setCurrentQuizConfig(config);
    setActiveTab('quiz-arena');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishQuiz = (resultPayload) => {
    setQuizResultData(resultPayload);
    recordQuizResult({
      topic: resultPayload.topicTitle,
      topicId: currentQuizConfig?.topicId || 'all',
      score: resultPayload.score,
      total: resultPayload.total,
      correct: resultPayload.correct,
      difficulty: currentQuizConfig?.difficulty || 'Medium',
      timeTaken: resultPayload.timeTaken
    });
    setActiveTab('quiz-result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetake = () => {
    if (currentQuizConfig) {
      setActiveTab('quiz-arena');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleOpenQuizModal('all', 'all', 5);
    }
  };

  const handleFooterNavigate = (tab, topicId = null) => {
    setActiveTab(tab);
    if (topicId) {
      handleOpenQuizModal(topicId, 'all', 5);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#1a1d2d] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'home' && (
          <HomePage
            onNavigate={(tab) => { setActiveTab(tab); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            onOpenQuizModal={handleOpenQuizModal}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardPage
            onOpenQuizModal={handleOpenQuizModal}
            onNavigate={(tab) => { setActiveTab(tab); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          />
        )}

        {activeTab === 'profile' && (
          <ProfilePage
            onStartQuiz={(topicId) => handleOpenQuizModal(topicId, 'all', 5)}
            onNavigate={(tab) => { setActiveTab(tab); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          />
        )}

        {activeTab === 'quiz-arena' && currentQuizConfig && (
          <QuizArena
            questions={currentQuizConfig.questions}
            topicTitle={currentQuizConfig.topicTitle}
            timePerQuestion={currentQuizConfig.timePerQuestion}
            topicId={currentQuizConfig.topicId}
            difficulty={currentQuizConfig.difficulty}
            onFinishQuiz={handleFinishQuiz}
            onExit={() => setActiveTab('dashboard')}
            onChangeTopicConfig={(newConfig) => {
              setCurrentQuizConfig((prev) => ({ ...prev, ...newConfig }));
            }}
          />
        )}

        {activeTab === 'quiz-result' && quizResultData && (
          <QuizResultPage
            resultData={quizResultData}
            onRetake={handleRetake}
            onReturnDashboard={() => setActiveTab('dashboard')}
          />
        )}
      </main>

      <Footer onNavigate={handleFooterNavigate} />
      <AuthModal />
      
      {/* Quiz Customization Modal with 1-15 number input */}
      <QuizSetupModal
        isOpen={isQuizSetupOpen}
        onClose={() => setIsQuizSetupOpen(false)}
        onStart={handleStartConfiguredQuiz}
        initialTopic={quizSetupTopic}
        initialDifficulty={quizSetupDifficulty}
        initialCount={quizSetupCount}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
