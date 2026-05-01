import './SimpleRoadmapGraph.css';

const patternNodeIds = [
  'two-pointer',
  'sliding-window',
  'recursion',
  'backtracking',
];

function SimpleRoadmapGraph({ nodes, progress, selectedNodeId, onSelectNode }) {
  const patternNodes = patternNodeIds
    .map((nodeId) => nodes.find((node) => node.id === nodeId))
    .filter(Boolean);

  return (
    <section className="simple-roadmap" aria-label="Simple roadmap graph">
      <div className="simple-roadmap-header">
        <p>Pattern Flow</p>
        <h2>Core DSA Patterns</h2>
      </div>

      <div className="simple-roadmap-flow">
        {patternNodes.map((node, index) => {
          const status = progress[node.id];
          const isSelected = selectedNodeId === node.id;
          const isLocked = status === 'locked';

          return (
            <div className="simple-step" key={node.id}>
              <button
                className={`simple-node ${status} ${isSelected ? 'selected' : ''}`}
                disabled={isLocked}
                type="button"
                onClick={() => onSelectNode(node.id)}
              >
                <span>{node.title}</span>
                <small>{status}</small>
              </button>

              {index < patternNodes.length - 1 && <span className="simple-line" />}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default SimpleRoadmapGraph;
