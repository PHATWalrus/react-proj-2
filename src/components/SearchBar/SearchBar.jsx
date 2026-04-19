import { Search } from 'lucide-react';
import './SearchBar.css';

export function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar-wrapper">
      <Search className="search-icon" size={20} />
      <input
        type="text"
        className="input-field search-input"
        placeholder="Search jobs by company or role..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
