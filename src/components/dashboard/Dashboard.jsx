import { useEffect, useMemo, useState } from 'react';
import { getUserProgress, saveUserProgress } from '../../utils/storage.js';
import { createDefaultProgress, resolveRoadmapProgress } from '../../utils/roadmapProgress.js';
import ThemeToggle from '../common/ThemeToggle.jsx';
import RoadmapFlow from '../roadmap/RoadmapFlow.jsx';
import RoadmapSidebar from '../roadmap/RoadmapSidebar.jsx';
import './Dashboard.css';

const dsaPatternItems = [
  { id: 'two-pointer', title: 'Two Pointer', icon: 'TP' },
  { id: 'sliding-window', title: 'Sliding Window', icon: 'SW' },
  { id: 'recursion', title: 'Recursion', icon: 'RC' },
  { id: 'backtracking', title: 'Backtracking', icon: 'BT' },
];

const dsaSections = [
  { id: 'dsa-basics', title: 'Basics', icon: 'B' },
  { id: 'dsa-patterns', title: 'Patterns', icon: 'P' },
  { id: 'dsa-advanced', title: 'Advanced', icon: 'A' },
];

function getFirstTopicId(group) {
  return group.topics[0]?.id;
}

function DsaRoadmapNav({ groups, selectedNode, selectedNodeId, onSelectNode }) {
  function handleSectionClick(sectionId) {
    const selectedGroup = groups.find((group) => group.id === sectionId);
    const firstTopicId = getFirstTopicId(selectedGroup);

    if (firstTopicId) {
      onSelectNode(firstTopicId);
    }
  }

  return (
    <nav className="roadmap-nav" aria-label="DSA roadmap sections">
      <h2>DSA Roadmap</h2>

      <div className="roadmap-nav-group">
        {dsaSections.map((section) => {
          const isActive = selectedNode.level === section.title;

          return (
            <button
              className={`roadmap-nav-item ${isActive ? 'active' : ''}`}
              key={section.id}
              type="button"
              onClick={() => handleSectionClick(section.id)}
            >
              <span className="nav-icon">{section.icon}</span>
              {section.title}
            </button>
          );
        })}
      </div>

      <div className="roadmap-nav-subgroup">
        <p>Patterns</p>
        {dsaPatternItems.map((item) => (
          <button
            className={`roadmap-nav-item topic-link ${selectedNodeId === item.id ? 'active' : ''}`}
            key={item.id}
            type="button"
            onClick={() => onSelectNode(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.title}
          </button>
        ))}
      </div>
    </nav>
  );
}

function Dashboard({ roadmap, user, theme, onBackToSelector, onToggleTheme, onLogout }) {
  const roadmapNodes = roadmap.nodes;
  const [selectedNodeId, setSelectedNodeId] = useState(roadmapNodes[0].id);
  const [savedProgress, setSavedProgress] = useState(() => {
    return {
      ...createDefaultProgress(roadmapNodes),
      ...getUserProgress(user.email, roadmap.id),
    };
  });
  const progress = useMemo(() => {
    return resolveRoadmapProgress(roadmapNodes, savedProgress);
  }, [roadmapNodes, savedProgress]);

  useEffect(() => {
    saveUserProgress(user.email, roadmap.id, savedProgress);
  }, [savedProgress, roadmap.id, user.email]);

  const selectedNode = roadmapNodes.find((node) => node.id === selectedNodeId);

  const completedCount = useMemo(() => {
    return Object.values(progress).filter((status) => status === 'completed').length;
  }, [progress]);

  const progressPercentage = Math.round((completedCount / roadmapNodes.length) * 100);

  function updateNodeStatus(nodeId, nextStatus) {
    if (progress[nodeId] === 'locked') {
      return;
    }

    setSavedProgress((currentProgress) => {
      return {
        ...currentProgress,
        [nodeId]: nextStatus,
      };
    });
  }

  function handleSelectNode(nodeId) {
    setSelectedNodeId(nodeId);
  }

  return (
    <main className="dashboard-page">
      <section className="dashboard-layout">
        <aside className="dashboard-sidebar" aria-label="Dashboard navigation">
          <div className="sidebar-main">
            <div>
              <p className="eyebrow">Interactive Roadmap Tracker</p>
              <h1>{roadmap.id === 'dsa' ? 'DSA Roadmap' : roadmap.title}</h1>
              <p className="user-label">Signed in as {user.name}</p>
            </div>

            {roadmap.id === 'dsa' && (
              <DsaRoadmapNav
                groups={roadmap.groups}
                selectedNode={selectedNode}
                selectedNodeId={selectedNodeId}
                onSelectNode={handleSelectNode}
              />
            )}

            <section className="progress-panel" aria-label="Roadmap progress">
              <div>
                <span>{progressPercentage}%</span>
                <p>Roadmap complete</p>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progressPercentage}%` }} />
              </div>
            </section>
          </div>

          <div className="dashboard-actions sidebar-footer">
            <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />
            <button className="logout-button" type="button" onClick={onBackToSelector}>
              Change Roadmap
            </button>
            <button className="logout-button" type="button" onClick={onLogout}>
              Logout
            </button>
          </div>
        </aside>

        <section className="dashboard-center" aria-label="Roadmap graph">
          <section className="graph-progress-card" aria-label="Graph progress summary">
            <div
              className="circular-progress"
              style={{ '--progress-value': `${progressPercentage * 3.6}deg` }}
            >
              <span>{progressPercentage}%</span>
            </div>
            <div>
              <p>Roadmap Progress</p>
              <h2>{completedCount} / {roadmapNodes.length} topics completed</h2>
            </div>
          </section>

          <RoadmapFlow
            groups={roadmap.groups}
            nodes={roadmapNodes}
            progress={progress}
            selectedNodeId={selectedNodeId}
            onSelectNode={handleSelectNode}
          />
        </section>

        <RoadmapSidebar
          node={selectedNode}
          roadmapId={roadmap.id}
          status={progress[selectedNode.id]}
          userEmail={user.email}
          onStatusChange={(nextStatus) => updateNodeStatus(selectedNode.id, nextStatus)}
        />
      </section>
    </main>
  );
}

export default Dashboard;
