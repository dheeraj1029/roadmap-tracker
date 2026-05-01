import { useMemo } from 'react';
import {
  Background,
  Controls,
  ReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import { createRoadmapFlow } from '../../utils/roadmapFlow.js';
import { canSelectTopic } from '../../utils/roadmapProgress.js';
import TopicFlowNode from './TopicFlowNode.jsx';
import '@xyflow/react/dist/style.css';
import './RoadmapFlow.css';

const nodeTypes = {
  topic: TopicFlowNode,
};

function RoadmapFlowContent({ groups, nodes, progress, selectedNodeId, onSelectNode }) {
  const roadmapFlow = useMemo(() => createRoadmapFlow(groups, nodes), [groups, nodes]);
  const flowNodes = useMemo(() => {
    return roadmapFlow.nodes.map((node) => {
      const status = progress[node.id];

      return {
        id: node.id,
        position: node.position,
        type: 'topic',
        data: {
          label: node.label,
          status,
          isLocked: !canSelectTopic(node.id, progress),
        },
        selected: selectedNodeId === node.id,
      };
    });
  }, [progress, roadmapFlow.nodes, selectedNodeId]);

  const flowEdges = useMemo(() => {
    return roadmapFlow.edges.map((edge) => ({
      ...edge,
      animated: true,
      type: 'smoothstep',
    }));
  }, [roadmapFlow.edges]);

  function handleNodeClick(_, node) {
    if (!canSelectTopic(node.id, progress)) {
      return;
    }

    onSelectNode(node.id);
  }

  return (
    <section className="roadmap-flow" aria-label="Roadmap graph">
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        onNodeClick={handleNodeClick}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </section>
  );
}

function RoadmapFlow(props) {
  return (
    <ReactFlowProvider>
      <RoadmapFlowContent {...props} />
    </ReactFlowProvider>
  );
}

export default RoadmapFlow;
