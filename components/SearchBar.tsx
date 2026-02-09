'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  isDarkMode: boolean;
}

export default function SearchBar({ onSearch, placeholder = "Search agents or maps...", isDarkMode }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className="search-bar">
      <style jsx>{`
        .search-bar {
          position: relative;
          width: 100%;
        }

        .search-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 20px;
          color: ${isDarkMode ? '#a0a0b8' : '#6b6b80'};
          pointer-events: none;
          z-index: 1;
          transition: color 0.3s ease;
        }

        .search-input {
          width: 100%;
          padding: 18px 56px 18px 56px;
          background: ${isDarkMode 
            ? 'rgba(26, 26, 46, 0.6)'
            : 'rgba(255, 255, 255, 0.8)'};
          backdrop-filter: blur(10px);
          border: 2px solid ${isDarkMode ? '#2a2a45' : '#e0e0e0'};
          border-radius: 16px;
          color: ${isDarkMode ? '#ffffff' : '#1a1a1a'};
          font-size: 1.05rem;
          font-weight: 500;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
        }

        .search-input:focus {
          border-color: #ff4655;
          box-shadow: 0 0 0 4px rgba(255, 70, 85, 0.1),
                      0 8px 24px rgba(255, 70, 85, 0.2);
          transform: translateY(-2px);
        }

        .search-input:focus + .search-icon {
          color: #ff4655;
        }

        .search-input::placeholder {
          color: ${isDarkMode ? '#6b6b80' : '#9ca3af'};
        }

        .clear-btn {
          position: absolute;
          right: 16px;
          background: ${isDarkMode 
            ? 'rgba(255, 70, 85, 0.15)'
            : 'rgba(255, 70, 85, 0.1)'};
          border: none;
          color: #ff4655;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: ${searchQuery ? 'flex' : 'none'};
          align-items: center;
          justify-content: center;
          opacity: ${searchQuery ? '1' : '0'};
          transform: ${searchQuery ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(180deg)'};
        }

        .clear-btn:hover {
          background: rgba(255, 70, 85, 0.25);
          transform: scale(1.1) rotate(90deg);
        }

        .clear-btn:active {
          transform: scale(0.9);
        }
      `}</style>

      <div className="search-container">
        <div className="search-icon">
          <Search size={22} />
        </div>
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button className="clear-btn" onClick={clearSearch} aria-label="Clear search">
          <X size={18} />
        </button>
      </div>
    </div>
  );
}