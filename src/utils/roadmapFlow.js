export function createFlowNodes(groups) {
  return groups.flatMap((group, groupIndex) => {
    return group.topics.map((topic, topicIndex) => ({
      id: topic.id,
      label: topic.title,
      position: {
        x: groupIndex * 280,
        y: topicIndex * 120,
      },
      topic,
      category: {
        id: group.id,
        title: group.title,
        order: group.order,
      },
    }));
  });
}

export function createFlowEdges(topics) {
  return topics.flatMap((topic) => {
    return topic.prerequisites.map((prerequisiteId) => ({
      id: `${prerequisiteId}-${topic.id}`,
      source: prerequisiteId,
      target: topic.id,
    }));
  });
}

export function createRoadmapFlow(groups, topics) {
  return {
    nodes: createFlowNodes(groups),
    edges: createFlowEdges(topics),
  };
}
