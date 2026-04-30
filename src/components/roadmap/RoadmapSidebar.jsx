import './RoadmapSidebar.css';

function RoadmapSidebar({ node, status, onStatusChange }) {
  const isLocked = status === 'locked';

  return (
    <aside className="roadmap-sidebar" aria-label="Roadmap node details">
      <p className="sidebar-level">{node.level}</p>
      <h2>{node.title}</h2>
      <p>{node.description}</p>

      <div className={`status-badge ${status}`}>{status}</div>

      <div className="status-actions">
        <button
          className="status-button"
          disabled={isLocked}
          type="button"
          onClick={() => onStatusChange('in-progress')}
        >
          In progress
        </button>
        <button
          className="status-button"
          disabled={isLocked}
          type="button"
          onClick={() => onStatusChange('completed')}
        >
          Completed
        </button>
      </div>

      {isLocked && (
        <p className="locked-note">
          Complete the previous roadmap node to unlock this step.
        </p>
      )}
    </aside>
  );
}

export default RoadmapSidebar;
