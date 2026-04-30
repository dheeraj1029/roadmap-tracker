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
  saveSelectedRoadmap,
  saveSession,
} from './utils/storage.js';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedRoadmapId, setSelectedRoadmapId] = useState(null);

  useEffect(() => {
    setCurrentUser(getSession());
    setSelectedRoadmapId(getSelectedRoadmap());
  }, []);

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

  function handleLogout() {
    clearSession();
    clearSelectedRoadmap();
    setCurrentUser(null);
    setSelectedRoadmapId(null);
  }

  if (!currentUser) {
    return <AuthPage onLogin={handleLogin} />;
  }

  const selectedRoadmap = roadmaps.find((roadmap) => roadmap.id === selectedRoadmapId);

  if (!selectedRoadmap) {
    return (
      <RoadmapSelector
        user={currentUser}
        onSelectRoadmap={handleSelectRoadmap}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <Roadmap
      roadmap={selectedRoadmap}
      user={currentUser}
      onBackToSelector={handleBackToSelector}
      onLogout={handleLogout}
    />
  );
}

export default App;
