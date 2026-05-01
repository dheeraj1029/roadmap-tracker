import Dashboard from '../dashboard/Dashboard.jsx';

function Roadmap({ roadmap, user, theme, onBackToSelector, onToggleTheme, onLogout }) {
  return (
    <Dashboard
      roadmap={roadmap}
      user={user}
      theme={theme}
      onBackToSelector={onBackToSelector}
      onToggleTheme={onToggleTheme}
      onLogout={onLogout}
    />
  );
}

export default Roadmap;
