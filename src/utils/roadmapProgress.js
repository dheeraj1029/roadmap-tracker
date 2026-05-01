import { TOPIC_STATUS } from '../data/roadmapData.js';

export function createDefaultProgress(nodes) {
  return nodes.reduce((progress, node) => {
    progress[node.id] = node.prerequisites.length === 0
      ? TOPIC_STATUS.IN_PROGRESS
      : TOPIC_STATUS.LOCKED;
    return progress;
  }, {});
}

export function arePrerequisitesCompleted(topic, progress) {
  return topic.prerequisites.every((prerequisiteId) => {
    return progress[prerequisiteId] === TOPIC_STATUS.COMPLETED;
  });
}

export function resolveRoadmapProgress(nodes, savedProgress) {
  return nodes.reduce((resolvedProgress, node) => {
    const savedStatus = savedProgress[node.id];
    const isUnlocked = node.prerequisites.length === 0
      || arePrerequisitesCompleted(node, resolvedProgress);

    if (!isUnlocked) {
      resolvedProgress[node.id] = TOPIC_STATUS.LOCKED;
      return resolvedProgress;
    }

    resolvedProgress[node.id] = savedStatus === TOPIC_STATUS.COMPLETED
      ? TOPIC_STATUS.COMPLETED
      : TOPIC_STATUS.IN_PROGRESS;

    return resolvedProgress;
  }, {});
}

export function getCategoryStatus(category, progress) {
  const topicStatuses = category.topics.map((topic) => progress[topic.id]);
  const hasAvailableTopic = topicStatuses.some((status) => {
    return status !== TOPIC_STATUS.LOCKED;
  });
  const isCompleted = topicStatuses.every((status) => {
    return status === TOPIC_STATUS.COMPLETED;
  });

  if (isCompleted) {
    return TOPIC_STATUS.COMPLETED;
  }

  return hasAvailableTopic ? TOPIC_STATUS.IN_PROGRESS : TOPIC_STATUS.LOCKED;
}

export function canSelectTopic(topicId, progress) {
  return progress[topicId] !== TOPIC_STATUS.LOCKED;
}
