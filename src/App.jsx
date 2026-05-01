import { useEffect, useState } from 'react';
import AuthPage from './components/auth/AuthPage.jsx';
import Roadmap from './components/roadmap/Roadmap.jsx';
import RoadmapSelector from './components/roadmap/RoadmapSelector.jsx';
import { roadmaps } from './data/roadmapData.js';
import {
  clearSelectedRoadmap,
  clearSession,
  getSelectedRoadmap,
  getSession,
  getTheme,
  saveSelectedRoadmap,
  saveSession,
  saveTheme,
} from './utils/storage.js';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedRoadmapId, setSelectedRoadmapId] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setCurrentUser(getSession());
    setSelectedRoadmapId(getSelectedRoadmap());
    setTheme(getTheme());
  }, []);

  useEffect(() => {
    document.body.dataset.theme = theme;
    saveTheme(theme);
  }, [theme]);

  function handleLogin(user) {
    saveSession(user);
    setCurrentUser(user);
  }

  function handleSelectRoadmap(roadmapId) {
    saveSelectedRoadmap(roadmapId);
    setSelectedRoadmapId(roadmapId);
  }

  function handleBackToSelector() {
    clearSelectedRoadmap();
    setSelectedRoadmapId(null);
  }

  function handleToggleTheme() {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  }

  function handleLogout() {
    clearSession();
    clearSelectedRoadmap();
    setCurrentUser(null);
    setSelectedRoadmapId(null);
  }

  if (!currentUser) {
    return (
      <AuthPage
        theme={theme}
        onLogin={handleLogin}
        onToggleTheme={handleToggleTheme}
      />
    );
  }

  const selectedRoadmap = roadmaps.find((roadmap) => roadmap.id === selectedRoadmapId);

  if (!selectedRoadmap) {
    return (
      <RoadmapSelector
        user={currentUser}
        theme={theme}
        onSelectRoadmap={handleSelectRoadmap}
        onToggleTheme={handleToggleTheme}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <Roadmap
      roadmap={selectedRoadmap}
      user={currentUser}
      theme={theme}
      onBackToSelector={handleBackToSelector}
      onToggleTheme={handleToggleTheme}
      onLogout={handleLogout}
    />
  );
}

export default App;
