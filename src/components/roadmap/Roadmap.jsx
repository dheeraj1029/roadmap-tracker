import Dashboard from '../dashboard/Dashboard.jsx';

function Roadmap({ roadmap, user, onBackToSelector, onLogout }) {
  return (
    <Dashboard
      roadmap={roadmap}
      user={user}
      onBackToSelector={onBackToSelector}
      onLogout={onLogout}
    />
  );
}

export default Roadmap;
