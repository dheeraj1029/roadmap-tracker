import './RoadmapCanvas.css';
import { getCategoryStatus } from '../../utils/roadmapProgress.js';

function RoadmapCanvas({ groups, progress, selectedNodeId, onSelectNode }) {
  return (
    <section className="roadmap-canvas" aria-label="Roadmap categories">
      {groups.map((group) => {
        const categoryStatus = getCategoryStatus(group, progress);

        return (
          <article className={`roadmap-category ${categoryStatus}`} key={group.id}>
            <div className="category-header">
              <span>{group.order}</span>
              <div>
                <h2>{group.title}</h2>
                <p>{categoryStatus}</p>
              </div>
            </div>

            <div className="topic-list">
              {group.topics.map((topic) => {
                const status = progress[topic.id];
                const isSelected = selectedNodeId === topic.id;

                return (
                  <button
                    className={`topic-item ${status} ${isSelected ? 'selected' : ''}`}
                    key={topic.id}
                    onClick={() => onSelectNode(topic.id)}
                    type="button"
                  >
                    <span className="topic-title">{topic.title}</span>
                    <span className="topic-status">{status}</span>
                  </button>
                );
              })}
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default RoadmapCanvas;
