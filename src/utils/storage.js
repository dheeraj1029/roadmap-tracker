const USERS_KEY = 'roadmapTrackerUsers';
const SESSION_KEY = 'roadmapTrackerSession';
const PROGRESS_KEY = 'roadmapTrackerProgress';
const SELECTED_ROADMAP_KEY = 'roadmapTrackerSelectedRoadmap';

export function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getSession() {
  return JSON.parse(localStorage.getItem(SESSION_KEY));
}

export function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSelectedRoadmap() {
  return localStorage.getItem(SELECTED_ROADMAP_KEY);
}

export function saveSelectedRoadmap(roadmapId) {
  localStorage.setItem(SELECTED_ROADMAP_KEY, roadmapId);
}

export function clearSelectedRoadmap() {
  localStorage.removeItem(SELECTED_ROADMAP_KEY);
}

export function getUserProgress(email, roadmapId) {
  const allProgress = JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {};
  return allProgress[email]?.[roadmapId] || {};
}

export function saveUserProgress(email, roadmapId, progress) {
  const allProgress = JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {};
  allProgress[email] = {
    ...allProgress[email],
    [roadmapId]: progress,
  };
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(allProgress));
}
