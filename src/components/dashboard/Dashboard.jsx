import { useEffect, useMemo, useState } from 'react';
import { getUserProgress, saveUserProgress } from '../../utils/storage.js';
import RoadmapCanvas from '../roadmap/RoadmapCanvas.jsx';
import RoadmapSidebar from '../roadmap/RoadmapSidebar.jsx';
import './Dashboard.css';

function createInitialProgress(nodes) {
  return nodes.reduce((progress, node) => {
    progress[node.id] = node.status;
    return progress;
  }, {});
}

function Dashboard({ roadmap, user, onBackToSelector, onLogout }) {
  const roadmapNodes = roadmap.nodes;
  const [selectedNodeId, setSelectedNodeId] = useState(roadmapNodes[0].id);
  const [progress, setProgress] = useState(() => {
    return {
      ...createInitialProgress(roadmapNodes),
      ...getUserProgress(user.email, roadmap.id),
    };
  });

  useEffect(() => {
    saveUserProgress(user.email, roadmap.id, progress);
  }, [progress, roadmap.id, user.email]);

  const selectedNode = roadmapNodes.find((node) => node.id === selectedNodeId);

  const completedCount = useMemo(() => {
    return Object.values(progress).filter((status) => status === 'completed').length;
  }, [progress]);

  const progressPercentage = Math.round((completedCount / roadmapNodes.length) * 100);

  function updateNodeStatus(nodeId, nextStatus) {
    setProgress((currentProgress) => {
      const nextProgress = {
        ...currentProgress,
        [nodeId]: nextStatus,
      };

      if (nextStatus === 'completed') {
        const completedNode = roadmapNodes.find((node) => node.id === nodeId);

        completedNode.unlocks.forEach((unlockedId) => {
          if (nextProgress[unlockedId] === 'locked') {
            nextProgress[unlockedId] = 'in-progress';
          }
        });
      }

      return nextProgress;
    });
  }

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Interactive Roadmap Tracker</p>
          <h1>{roadmap.title}</h1>
        </div>
        <div className="dashboard-actions">
          <button className="logout-button" type="button" onClick={onBackToSelector}>
            Change Roadmap
          </button>
          <button className="logout-button" type="button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <section className="progress-panel" aria-label="Roadmap progress">
        <div>
          <span>{progressPercentage}%</span>
          <p>Roadmap complete</p>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPercentage}%` }} />
        </div>
      </section>

      <section className="dashboard-grid">
        <RoadmapCanvas
          nodes={roadmapNodes}
          progress={progress}
          selectedNodeId={selectedNodeId}
          onSelectNode={setSelectedNodeId}
        />
        <RoadmapSidebar
          node={selectedNode}
          status={progress[selectedNode.id]}
          onStatusChange={(nextStatus) => updateNodeStatus(selectedNode.id, nextStatus)}
        />
      </section>
    </main>
  );
}

export default Dashboard;
