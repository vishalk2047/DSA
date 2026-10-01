import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_USER } from '../data/mockUserData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('dsa_quiz_user_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_USER;
      }
    }
    return DEFAULT_USER;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' or 'signup'

  useEffect(() => {
    if (user) {
      localStorage.setItem('dsa_quiz_user_v2', JSON.stringify(user));
    } else {
      localStorage.removeItem('dsa_quiz_user_v2');
    }
  }, [user]);

  const login = (email, password) => {
    // Mock login simulation
    const name = email.split('@')[0] || 'Algo Master';
    const updatedUser = {
      ...DEFAULT_USER,
      email,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      username: name.toLowerCase().replace(/[^a-z0-9]/g, '_'),
    };
    setUser(updatedUser);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const signup = (name, email, password) => {
    const newUser = {
      ...DEFAULT_USER,
      name,
      email,
      username: name.toLowerCase().replace(/\s+/g, '_'),
      totalQuizzes: 0,
      totalSolved: 0,
      accuracy: 100,
      xp: 100,
      level: 1,
      streakDays: 1,
      quizHistory: [],
      bookmarks: []
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const loginDemo = () => {
    setUser(DEFAULT_USER);
    setIsAuthModalOpen(false);
  };

  const openAuth = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuth = () => {
    setIsAuthModalOpen(false);
  };

  const updateUserProfile = (updatedFields) => {
    setUser(prev => prev ? { ...prev, ...updatedFields } : null);
  };

  const toggleBookmark = (questionId) => {
    if (!user) {
      openAuth('login');
      return false;
    }
    setUser(prev => {
      const exists = prev.bookmarks.includes(questionId);
      const bookmarks = exists
        ? prev.bookmarks.filter(id => id !== questionId)
        : [...prev.bookmarks, questionId];
      return { ...prev, bookmarks };
    });
    return true;
  };

  const recordQuizResult = ({ topic, topicId, score, total, correct, difficulty, timeTaken }) => {
    if (!user) return;

    setUser(prev => {
      const earnedXp = correct * 25 + (score >= 80 ? 50 : 10);
      const newXp = prev.xp + earnedXp;
      const newLevel = Math.floor(newXp / 300) + 1;
      const newTotalQuizzes = prev.totalQuizzes + 1;
      const newTotalSolved = prev.totalSolved + correct;
      const newAccuracy = Math.round(((prev.totalSolved + correct) / ((prev.totalQuizzes * total) + total)) * 100) || score;

      const newHistoryItem = {
        id: `qh-${Date.now()}`,
        topic,
        topicId,
        date: 'Just now',
        score,
        total,
        correct,
        difficulty,
        timeTaken
      };

      // Update topic mastery
      const currentTopicMastery = prev.topicMastery[topicId] || 50;
      const updatedTopicScore = Math.min(100, Math.max(10, Math.round((currentTopicMastery * 0.7) + (score * 0.3))));

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        totalQuizzes: newTotalQuizzes,
        totalSolved: newTotalSolved,
        accuracy: newAccuracy,
        streakDays: prev.streakDays + 1,
        topicMastery: {
          ...prev.topicMastery,
          [topicId]: updatedTopicScore
        },
        quizHistory: [newHistoryItem, ...prev.quizHistory]
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loginDemo,
        isAuthModalOpen,
        authModalMode,
        openAuth,
        closeAuth,
        updateUserProfile,
        toggleBookmark,
        recordQuizResult
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
