import './RoadmapCanvas.css';

function RoadmapCanvas({ nodes, progress, selectedNodeId, onSelectNode }) {
  return (
    <section className="roadmap-canvas" aria-label="Visual roadmap">
      <svg className="roadmap-lines" viewBox="0 0 100 70" preserveAspectRatio="none">
        {nodes.slice(0, -1).map((node, index) => {
          const nextNode = nodes[index + 1];
          return (
            <line
              key={`${node.id}-${nextNode.id}`}
              x1={node.x}
              y1={node.y}
              x2={nextNode.x}
              y2={nextNode.y}
            />
          );
        })}
      </svg>

      {nodes.map((node) => {
        const status = progress[node.id];
        const isSelected = selectedNodeId === node.id;

        return (
          <button
            className={`roadmap-node ${status} ${isSelected ? 'selected' : ''}`}
            key={node.id}
            onClick={() => onSelectNode(node.id)}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            type="button"
          >
            <span>{node.title}</span>
            <small>{status}</small>
          </button>
        );
      })}
    </section>
  );
}

export default RoadmapCanvas;
