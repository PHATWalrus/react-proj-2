import { motion } from 'framer-motion';
import { useApplications } from '../../hooks/useApplications';
import { Briefcase, CalendarCheck, Award, XCircle } from 'lucide-react';
import { JobCard } from '../../components/JobCard/JobCard';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export function Dashboard() {
  const { applications } = useApplications();
  const navigate = useNavigate();

  const stats = {
    total: applications.length,
    interviews: applications.filter(a => a.status === 'Interviewing').length,
    offers: applications.filter(a => a.status === 'Offer').length,
    rejections: applications.filter(a => a.status === 'Rejected').length
  };

  const recentApps = [...applications].sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate)).slice(0, 3);

  return (
    <motion.div 
      className="dashboard-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="page-header">
        <div>
          <h1>Welcome back, hustler 💼</h1>
          <p>Here's what your job search looks like right now.</p>
        </div>
        <button className="sexy-btn" onClick={() => navigate('/applications/new')}>
          Add Application
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper blue">
            <Briefcase size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Applications</p>
            <h3 className="stat-value">{stats.total}</h3>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper amber">
            <CalendarCheck size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Interviews</p>
            <h3 className="stat-value">{stats.interviews}</h3>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper green">
            <Award size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Offers</p>
            <h3 className="stat-value">{stats.offers}</h3>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper red">
            <XCircle size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Rejections</p>
            <h3 className="stat-value">{stats.rejections}</h3>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="recent-section">
          <div className="section-header">
            <h2>Recent Activity</h2>
            <button className="btn-secondary" onClick={() => navigate('/applications')}>
              View All
            </button>
          </div>
          <div className="recent-list">
            {recentApps.length > 0 ? (
              recentApps.map(job => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <div className="glass-panel empty-recent">
                <p>Bro you haven't applied to anything yet. Get on it!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
