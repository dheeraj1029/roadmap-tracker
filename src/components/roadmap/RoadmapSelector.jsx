import { roadmaps } from '../../data/roadmapData.js';
import ThemeToggle from '../common/ThemeToggle.jsx';
import './RoadmapSelector.css';

function RoadmapSelector({ user, theme, onSelectRoadmap, onToggleTheme, onLogout }) {
  return (
    <main className="selector-page">
      <section className="selector-shell" aria-label="Choose a roadmap">
        <div className="selector-header">
          <div>
            <p className="selector-eyebrow">Interactive Roadmap Tracker</p>
            <h1>Choose your roadmap, {user.name}</h1>
          </div>
          <div className="selector-actions">
            <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />
            <button className="selector-logout" type="button" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className="selector-grid">
          {roadmaps.map((roadmap) => (
            <article className="selector-card" key={roadmap.id}>
              <div>
                <h2>{roadmap.title}</h2>
                <p>{roadmap.description}</p>
              </div>
              <button type="button" onClick={() => onSelectRoadmap(roadmap.id)}>
                Enter Roadmap
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default RoadmapSelector;
