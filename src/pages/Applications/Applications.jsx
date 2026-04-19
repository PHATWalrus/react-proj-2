import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApplications } from '../../hooks/useApplications';
import { useDebounce } from '../../hooks/useDebounce';
import { JobCard } from '../../components/JobCard/JobCard';
import { Filters } from '../../components/Filters/Filters';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { Briefcase } from 'lucide-react';
import './Applications.css';

export function Applications() {
  const { applications } = useApplications();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('dateDesc');

  // gotta debounce or the app will explode on every keystroke
  const debouncedSearch = useDebounce(searchTerm, 300);

  // filter and sort magic
  const filteredApps = useMemo(() => {
    let result = applications;

    // handle search
    if (debouncedSearch) {
      const lowerSearch = debouncedSearch.toLowerCase();
      result = result.filter(
        app => 
          app.company.toLowerCase().includes(lowerSearch) || 
          app.role.toLowerCase().includes(lowerSearch)
      );
    }

    // handle status filter
    if (statusFilter !== 'All') {
      result = result.filter(app => app.status === statusFilter);
    }

    // handle sort
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'dateDesc':
          return new Date(b.appliedDate) - new Date(a.appliedDate);
        case 'dateAsc':
          return new Date(a.appliedDate) - new Date(b.appliedDate);
        case 'salaryDesc':
          return b.salary - a.salary;
        case 'salaryAsc':
          return a.salary - b.salary;
        case 'companyAsc':
          return a.company.localeCompare(b.company);
        default:
          return 0;
      }
    });

    return result;
  }, [applications, debouncedSearch, statusFilter, sortBy]);

  return (
    <motion.div 
      className="applications-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="page-header">
        <div>
          <h1>My Pipeline</h1>
          <p>Track those applications, get that bread.</p>
        </div>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      <Filters 
        currentFilter={statusFilter} 
        setFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="jobs-grid">
        <AnimatePresence>
          {filteredApps.length > 0 ? (
            filteredApps.map(job => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <motion.div 
              className="empty-state glass-panel"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Briefcase size={48} className="empty-icon" />
              <h3>No jobs found</h3>
              <p>Maybe lower your standards? Just kidding, keep applying!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
