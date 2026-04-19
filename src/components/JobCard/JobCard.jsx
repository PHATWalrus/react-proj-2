import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Bookmark, Edit, Trash2, MapPin, DollarSign, Calendar } from 'lucide-react';
import { useApplications } from '../../hooks/useApplications';
import './JobCard.css';

export function JobCard({ job }) {
  const navigate = useNavigate();
  const { deleteApplication, toggleBookmark } = useApplications();

  // clearbit logo magic
  const logoUrl = `https://logo.clearbit.com/${job.company.toLowerCase().replace(/\s+/g, '')}.com`;

  return (
    <motion.div 
      className="job-card glass-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(99, 102, 241, 0.3)' }}
      layout
    >
      <div className="card-header">
        <div className="company-info">
          <img 
            src={logoUrl} 
            alt={`${job.company} logo`} 
            className="company-logo"
            onError={(e) => {
              // fallback if clearbit doesnt have it
              e.target.src = `https://ui-avatars.com/api/?name=${job.company}&background=27272a&color=fff`;
            }}
          />
          <div>
            <h3>{job.role}</h3>
            <p className="company-name">{job.company}</p>
          </div>
        </div>
        <div className="card-actions">
          <button 
            className="btn-icon" 
            onClick={() => toggleBookmark(job.id)}
            style={{ color: job.bookmarked ? 'var(--accent-primary)' : 'inherit' }}
          >
            <Bookmark size={18} fill={job.bookmarked ? 'currentColor' : 'none'} />
          </button>
          <button className="btn-icon" onClick={() => navigate(`/applications/${job.id}`)}>
            <Edit size={18} />
          </button>
          <button className="btn-icon danger" onClick={() => deleteApplication(job.id)}>
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="card-body">
        <div className="detail-pill">
          <MapPin size={14} />
          <span>{job.location}</span>
        </div>
        <div className="detail-pill">
          <DollarSign size={14} />
          <span>${job.salary.toLocaleString()}</span>
        </div>
        <div className="detail-pill">
          <Calendar size={14} />
          <span>{format(new Date(job.appliedDate), 'MMM dd, yyyy')}</span>
        </div>
      </div>

      <div className="card-footer">
        <span className={`status-badge status-${job.status.toLowerCase().replace(' ', '-')}`}>
          {job.status}
        </span>
        <span className="platform-text">{job.platform}</span>
      </div>
    </motion.div>
  );
}
