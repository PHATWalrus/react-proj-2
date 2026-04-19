import './Filters.css';

const statuses = ['All', 'Applied', 'Interviewing', 'Offer', 'Rejected'];

export function Filters({ currentFilter, setFilter, sortBy, setSortBy }) {
  return (
    <div className="filters-container glass-panel">
      <div className="filter-group">
        <label>Status</label>
        <div className="status-tabs">
          {statuses.map(status => (
            <button
              key={status}
              className={`status-tab ${currentFilter === status ? 'active' : ''}`}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
      
      <div className="filter-group">
        <label>Sort By</label>
        <select 
          className="input-field select-field"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="dateDesc">Newest Applied</option>
          <option value="dateAsc">Oldest Applied</option>
          <option value="salaryDesc">Salary (High to Low)</option>
          <option value="salaryAsc">Salary (Low to High)</option>
          <option value="companyAsc">Company (A-Z)</option>
        </select>
      </div>
    </div>
  );
}
