export const TOPIC_STATUS = {
  LOCKED: 'locked',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
};

const webDevelopmentGroups = [
  {
    id: 'web-foundation',
    title: 'Foundation',
    order: 1,
    topics: [
      {
        id: 'html',
        title: 'HTML Basics',
        description: 'Learn headings, paragraphs, links, lists, forms, and semantic tags.',
        status: TOPIC_STATUS.IN_PROGRESS,
        prerequisites: [],
        position: { x: 12, y: 46 },
      },
      {
        id: 'css',
        title: 'CSS Styling',
        description: 'Practice selectors, colors, spacing, flexbox, grid, and responsive layouts.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['html'],
        position: { x: 30, y: 28 },
      },
    ],
  },
  {
    id: 'web-core',
    title: 'Core',
    order: 2,
    topics: [
      {
        id: 'javascript',
        title: 'JavaScript',
        description: 'Understand variables, functions, arrays, objects, events, and DOM updates.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['css'],
        position: { x: 48, y: 48 },
      },
      {
        id: 'react',
        title: 'React',
        description: 'Build components with props, state, effects, forms, and reusable UI pieces.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['javascript'],
        position: { x: 66, y: 28 },
      },
    ],
  },
  {
    id: 'web-practice',
    title: 'Practice',
    order: 3,
    topics: [
      {
        id: 'projects',
        title: 'Projects',
        description: 'Create real apps, save data, handle edge cases, and polish the experience.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['react'],
        position: { x: 84, y: 46 },
      },
    ],
  },
];

const dsaGroups = [
  {
    id: 'dsa-basics',
    title: 'Basics',
    order: 1,
    topics: [
      {
        id: 'arrays',
        title: 'Arrays',
        description: 'Learn indexing, traversal, searching, sorting basics, and common array patterns.',
        status: TOPIC_STATUS.IN_PROGRESS,
        prerequisites: [],
        position: { x: 12, y: 48 },
      },
      {
        id: 'strings',
        title: 'Strings',
        description: 'Practice character access, substrings, frequency maps, two pointers, and pattern checks.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['arrays'],
        position: { x: 26, y: 28 },
      },
    ],
  },
  {
    id: 'dsa-intermediate',
    title: 'Intermediate',
    order: 2,
    topics: [
      {
        id: 'linked-list',
        title: 'Linked List',
        description: 'Understand nodes, pointers, insertion, deletion, reversing, and fast-slow pointer problems.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['arrays', 'strings'],
        position: { x: 40, y: 50 },
      },
      {
        id: 'stack',
        title: 'Stack',
        description: 'Use LIFO logic for parsing, monotonic stacks, undo flows, and expression problems.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['linked-list'],
        position: { x: 54, y: 28 },
      },
      {
        id: 'queue',
        title: 'Queue',
        description: 'Use FIFO logic for scheduling, breadth-first traversal, and sliding window patterns.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['stack'],
        position: { x: 66, y: 50 },
      },
    ],
  },
  {
    id: 'dsa-advanced',
    title: 'Advanced',
    order: 3,
    topics: [
      {
        id: 'trees',
        title: 'Trees',
        description: 'Study binary trees, traversals, recursion, BST rules, depth, height, and path problems.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['queue'],
        position: { x: 76, y: 30 },
      },
      {
        id: 'graphs',
        title: 'Graphs',
        description: 'Learn graph representation, BFS, DFS, components, shortest paths, and cycle detection.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['trees'],
        position: { x: 86, y: 52 },
      },
      {
        id: 'dp',
        title: 'Dynamic Programming',
        description: 'Break problems into states, transitions, memoization, tabulation, and optimization.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['graphs'],
        position: { x: 94, y: 30 },
      },
    ],
  },
];

function getUnlocks(groups, topicId) {
  return groups.flatMap((group) =>
    group.topics
      .filter((topic) => topic.prerequisites.includes(topicId))
      .map((topic) => topic.id),
  );
}

function createRoadmapNodes(groups) {
  return groups.flatMap((group) =>
    group.topics.map((topic) => ({
      id: topic.id,
      title: topic.title,
      level: group.title,
      description: topic.description,
      status: topic.status,
      prerequisites: topic.prerequisites,
      unlocks: getUnlocks(groups, topic.id),
      x: topic.position.x,
      y: topic.position.y,
    })),
  );
}

export const roadmaps = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Learn the core frontend skills needed to build clean, interactive websites.',
    groups: webDevelopmentGroups,
    nodes: createRoadmapNodes(webDevelopmentGroups),
  },
  {
    id: 'dsa',
    title: 'DSA (Data Structures & Algorithms)',
    description: 'Practice problem-solving topics from arrays and strings through graphs and DP.',
    groups: dsaGroups,
    nodes: createRoadmapNodes(dsaGroups),
  },
];

export const roadmapNodes = roadmaps[1].nodes;
