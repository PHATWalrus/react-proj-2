import { NavLink } from 'react-router-dom';
import { Briefcase, LayoutDashboard, BarChart3, PlusCircle } from 'lucide-react';
import './Navbar.css';

export function Navbar() {
  return (
    <nav className="navbar glass-panel">
      <div className="nav-brand">
        <Briefcase className="brand-icon" />
        <span className="brand-text">SmartJob.</span>
      </div>
      <div className="nav-links">
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/applications" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <Briefcase size={20} />
          <span>Applications</span>
        </NavLink>
        <NavLink to="/analytics" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <BarChart3 size={20} />
          <span>Analytics</span>
        </NavLink>
      </div>
      <div className="nav-actions">
        <NavLink to="/applications/new" className="sexy-btn">
          <PlusCircle size={20} />
          <span>Add Job</span>
        </NavLink>
      </div>
    </nav>
  );
}
