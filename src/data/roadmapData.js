export const TOPIC_STATUS = {
  LOCKED: 'locked',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
};

export const TOPIC_DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
};

const webDevelopmentGroups = [
  {
    id: 'web-html',
    title: 'HTML',
    order: 1,
    topics: [
      {
        id: 'html-tags',
        title: 'Tags',
        description: 'Learn common HTML tags for headings, paragraphs, links, images, lists, and page structure.',
        status: TOPIC_STATUS.IN_PROGRESS,
        prerequisites: [],
        position: { x: 8, y: 28 },
      },
      {
        id: 'html-forms',
        title: 'Forms',
        description: 'Build forms with inputs, labels, buttons, validation attributes, and accessible structure.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['html-tags'],
        position: { x: 16, y: 52 },
      },
      {
        id: 'semantic-html',
        title: 'Semantic HTML',
        description: 'Use meaningful elements like header, nav, main, section, article, aside, and footer.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['html-tags'],
        position: { x: 24, y: 28 },
      },
    ],
  },
  {
    id: 'web-css',
    title: 'CSS',
    order: 2,
    topics: [
      {
        id: 'css-flexbox',
        title: 'Flexbox',
        description: 'Arrange items in rows or columns and control alignment, spacing, wrapping, and order.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['semantic-html'],
        position: { x: 32, y: 52 },
      },
      {
        id: 'css-grid',
        title: 'Grid',
        description: 'Create two-dimensional layouts with columns, rows, gaps, placement, and responsive tracks.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['css-flexbox'],
        position: { x: 40, y: 28 },
      },
      {
        id: 'responsive-design',
        title: 'Responsive Design',
        description: 'Use media queries, fluid spacing, flexible layouts, and mobile-first thinking.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['css-flexbox', 'css-grid'],
        position: { x: 48, y: 52 },
      },
    ],
  },
  {
    id: 'web-javascript',
    title: 'JavaScript',
    order: 3,
    topics: [
      {
        id: 'js-variables',
        title: 'Variables',
        description: 'Understand let, const, primitive values, objects, arrays, operators, and basic control flow.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['responsive-design'],
        position: { x: 56, y: 28 },
      },
      {
        id: 'js-closures',
        title: 'Closures',
        description: 'Learn how functions remember outer scope and use closures for encapsulated behavior.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['js-variables'],
        position: { x: 62, y: 52 },
      },
      {
        id: 'js-promises',
        title: 'Promises',
        description: 'Handle asynchronous work with promise states, chaining, success paths, and errors.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['js-variables'],
        position: { x: 68, y: 28 },
      },
      {
        id: 'js-async-await',
        title: 'Async/Await',
        description: 'Write readable asynchronous code with async functions, await, try/catch, and fetch calls.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['js-promises'],
        position: { x: 74, y: 52 },
      },
    ],
  },
  {
    id: 'web-react',
    title: 'React',
    order: 4,
    topics: [
      {
        id: 'react-components',
        title: 'Components',
        description: 'Split UI into reusable pieces that return JSX and keep each responsibility clear.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['js-async-await'],
        position: { x: 80, y: 28 },
      },
      {
        id: 'react-props',
        title: 'Props',
        description: 'Pass data into components and use props to make UI reusable and predictable.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['react-components'],
        position: { x: 84, y: 52 },
      },
      {
        id: 'react-state',
        title: 'State',
        description: 'Store changing component data with state and update the UI in response to user actions.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['react-props'],
        position: { x: 88, y: 28 },
      },
      {
        id: 'react-hooks',
        title: 'Hooks',
        description: 'Use hooks like useState and useEffect to manage state, side effects, and component logic.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['react-state'],
        position: { x: 92, y: 52 },
      },
    ],
  },
  {
    id: 'web-tools',
    title: 'Tools',
    order: 5,
    topics: [
      {
        id: 'git',
        title: 'Git',
        description: 'Track changes, create commits, use branches, and collaborate through version control.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['html-tags'],
        position: { x: 36, y: 72 },
      },
      {
        id: 'apis',
        title: 'APIs',
        description: 'Request data from external services, read responses, handle loading states, and manage errors.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['js-async-await'],
        position: { x: 72, y: 72 },
      },
      {
        id: 'deployment',
        title: 'Deployment',
        description: 'Build, host, and share finished web projects using modern deployment platforms.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['react-hooks', 'git', 'apis'],
        position: { x: 96, y: 72 },
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
        difficulty: TOPIC_DIFFICULTY.EASY,
        position: { x: 12, y: 48 },
      },
      {
        id: 'strings',
        title: 'Strings',
        description: 'Practice character access, substrings, frequency maps, two pointers, and pattern checks.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['arrays'],
        difficulty: TOPIC_DIFFICULTY.EASY,
        position: { x: 26, y: 28 },
      },
      {
        id: 'linked-list',
        title: 'Linked List',
        description: 'Understand nodes, pointers, insertion, deletion, reversing, and fast-slow pointer problems.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['arrays', 'strings'],
        difficulty: TOPIC_DIFFICULTY.EASY,
        position: { x: 36, y: 52 },
      },
      {
        id: 'stack-queue',
        title: 'Stack and Queue',
        description: 'Use LIFO and FIFO thinking for parsing, scheduling, traversal, and ordering problems.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['linked-list'],
        difficulty: TOPIC_DIFFICULTY.EASY,
        position: { x: 46, y: 30 },
      },
    ],
  },
  {
    id: 'dsa-patterns',
    title: 'Patterns',
    order: 2,
    topics: [
      {
        id: 'two-pointer',
        title: 'Two Pointer',
        description: 'Solve pair, partition, reverse, and sorted sequence problems with two moving indexes.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['arrays', 'strings'],
        difficulty: TOPIC_DIFFICULTY.MEDIUM,
        position: { x: 54, y: 54 },
      },
      {
        id: 'sliding-window',
        title: 'Sliding Window',
        description: 'Track dynamic ranges for substring, subarray, maximum, minimum, and frequency problems.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['two-pointer'],
        difficulty: TOPIC_DIFFICULTY.MEDIUM,
        position: { x: 62, y: 28 },
      },
      {
        id: 'binary-search',
        title: 'Binary Search',
        description: 'Search sorted spaces, answer ranges, boundaries, and monotonic conditions efficiently.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['arrays'],
        difficulty: TOPIC_DIFFICULTY.MEDIUM,
        position: { x: 70, y: 52 },
      },
      {
        id: 'recursion',
        title: 'Recursion',
        description: 'Break problems into smaller calls with clear base cases, choices, and return values.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['stack-queue'],
        difficulty: TOPIC_DIFFICULTY.MEDIUM,
        position: { x: 78, y: 30 },
      },
      {
        id: 'backtracking',
        title: 'Backtracking',
        description: 'Explore choices, undo decisions, and build solutions for permutations, subsets, and boards.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['recursion'],
        difficulty: TOPIC_DIFFICULTY.HARD,
        position: { x: 84, y: 54 },
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
        prerequisites: ['recursion'],
        difficulty: TOPIC_DIFFICULTY.MEDIUM,
        position: { x: 88, y: 28 },
      },
      {
        id: 'graphs',
        title: 'Graphs',
        description: 'Learn graph representation, BFS, DFS, components, shortest paths, and cycle detection.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['trees', 'stack-queue'],
        difficulty: TOPIC_DIFFICULTY.HARD,
        position: { x: 92, y: 50 },
      },
      {
        id: 'dp',
        title: 'Dynamic Programming',
        description: 'Break problems into states, transitions, memoization, tabulation, and optimization.',
        status: TOPIC_STATUS.LOCKED,
        prerequisites: ['recursion', 'backtracking'],
        difficulty: TOPIC_DIFFICULTY.HARD,
        position: { x: 96, y: 32 },
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
      difficulty: topic.difficulty,
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
