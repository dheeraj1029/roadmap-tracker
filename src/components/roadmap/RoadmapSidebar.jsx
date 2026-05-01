import { useEffect, useState } from 'react';
import { getTopicNote, saveTopicNote } from '../../utils/storage.js';
import './RoadmapSidebar.css';

function getTopicResources(node) {
  return [
    {
      title: `${node.title} guide`,
      url: `https://www.google.com/search?q=${encodeURIComponent(`${node.title} programming guide`)}`,
    },
    {
      title: `${node.title} practice`,
      url: `https://www.google.com/search?q=${encodeURIComponent(`${node.title} coding problems`)}`,
    },
  ];
}

function RoadmapSidebar({ node, roadmapId, status, userEmail, onStatusChange }) {
  const [note, setNote] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const isLocked = status === 'locked';
  const resources = getTopicResources(node);

  useEffect(() => {
    setNote(getTopicNote(userEmail, roadmapId, node.id));
    setSaveMessage('');
  }, [node.id, roadmapId, userEmail]);

  function handleSaveNote() {
    saveTopicNote(userEmail, roadmapId, node.id, note);
    setSaveMessage('Notes saved.');
  }

  return (
    <aside className="roadmap-sidebar" aria-label="Roadmap node details">
      <section className="details-section">
        <p className="sidebar-level">{node.level}</p>
        <h2>{node.title}</h2>
        <p>{node.description}</p>
      </section>

      <section className="details-section">
        <div className="node-meta">
          <div className={`status-badge ${status}`}>{status}</div>
          {node.difficulty && (
            <div className={`difficulty-badge ${node.difficulty}`}>
              {node.difficulty}
            </div>
          )}
        </div>

        <div className="status-actions">
          <button
            className={`status-button ${status === 'in-progress' ? 'active' : ''}`}
            disabled={isLocked}
            type="button"
            onClick={() => onStatusChange('in-progress')}
          >
            In progress
          </button>
          <button
            className={`status-button ${status === 'completed' ? 'active' : ''}`}
            disabled={isLocked}
            type="button"
            onClick={() => onStatusChange('completed')}
          >
            Completed
          </button>
        </div>
      </section>

      {isLocked && (
        <p className="locked-note">
          Complete the previous roadmap node to unlock this step.
        </p>
      )}

      <section className="details-section">
        <h3>Resources</h3>
        <ul className="resource-list">
          {resources.map((resource) => (
            <li key={resource.url}>
              <a href={resource.url} target="_blank" rel="noreferrer">
                {resource.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="details-section">
        <h3>Notes</h3>
        <textarea
          className="notes-textarea"
          placeholder="Write your notes for this topic..."
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
        <button className="save-notes-button" type="button" onClick={handleSaveNote}>
          Save Notes
        </button>
        {saveMessage && <p className="save-message">{saveMessage}</p>}
      </section>
    </aside>
  );
}

export default RoadmapSidebar;
