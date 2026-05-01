import { Handle, Position } from '@xyflow/react';

function TopicFlowNode({ data, selected }) {
  return (
    <div
      className={`topic-flow-node ${data.status} ${selected ? 'selected' : ''}`}
      aria-disabled={data.isLocked}
    >
      <Handle type="target" position={Position.Left} />
      <span className="node-dot" />
      <span className="node-text">
        <strong>{data.label}</strong>
        <small>{data.status}</small>
      </span>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default TopicFlowNode;
