'use client';

import { FilterType } from '@/types/player';
import { Filter, Check } from 'lucide-react';

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  totalMatches: number;
  filteredCount: number;
  isDarkMode: boolean;
}

export default function FilterBar({
  activeFilter,
  onFilterChange,
  totalMatches,
  filteredCount,
  isDarkMode,
}: FilterBarProps) {
  const filters: FilterType[] = ['All', 'Won', 'Lost'];

  const getFilterEmoji = (filter: FilterType) => {
    switch (filter) {
      case 'Won':
        return '🏆';
      case 'Lost':
        return '💔';
      default:
        return '📋';
    }
  };

  return (
    <div className="filter-bar">
      <style jsx>{`
        .filter-bar {
          background: ${isDarkMode 
            ? 'rgba(26, 26, 46, 0.5)'
            : 'rgba(255, 255, 255, 0.7)'};
          backdrop-filter: blur(20px);
          border: 1px solid ${isDarkMode ? '#2a2a45' : '#e0e0e0'};
          border-radius: 20px;
          padding: 28px;
          margin-bottom: 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-shadow: ${isDarkMode 
            ? '0 12px 40px rgba(0, 0, 0, 0.2)'
            : '0 12px 40px rgba(0, 0, 0, 0.06)'};
          animation: slideUp 0.6s ease-out 0.3s both;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .filter-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .filter-title-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .filter-icon {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, #ff4655 0%, #9d4edd 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(255, 70, 85, 0.3);
        }

        .filter-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: ${isDarkMode ? '#ffffff' : '#1a1a1a'};
        }

        .match-count {
          font-size: 1rem;
          color: ${isDarkMode ? '#a0a0b8' : '#6b6b80'};
          font-weight: 600;
          padding: 8px 16px;
          background: ${isDarkMode 
            ? 'rgba(255, 70, 85, 0.1)'
            : 'rgba(255, 70, 85, 0.05)'};
          border-radius: 12px;
          border: 1px solid ${isDarkMode 
            ? 'rgba(255, 70, 85, 0.2)'
            : 'rgba(255, 70, 85, 0.1)'};
        }

        .filter-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 14px 28px;
          border-radius: 12px;
          border: 2px solid ${isDarkMode ? '#2a2a45' : '#e0e0e0'};
          background: ${isDarkMode 
            ? 'rgba(15, 15, 26, 0.6)'
            : 'rgba(255, 255, 255, 0.8)'};
          color: ${isDarkMode ? '#a0a0b8' : '#6b6b80'};
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 8px;
          position: relative;
          overflow: hidden;
        }

        .filter-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 70, 85, 0.1);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .filter-btn:hover::before {
          width: 300px;
          height: 300px;
        }

        .filter-btn:hover {
          border-color: #ff4655;
          color: ${isDarkMode ? '#ffffff' : '#1a1a1a'};
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(255, 70, 85, 0.2);
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #ff4655 0%, #9d4edd 100%);
          border-color: transparent;
          color: #ffffff;
          box-shadow: 0 8px 24px rgba(255, 70, 85, 0.4);
        }

        .filter-btn.active:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(255, 70, 85, 0.5);
        }

        .check-icon {
          opacity: 0;
          transform: scale(0);
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .filter-btn.active .check-icon {
          opacity: 1;
          transform: scale(1);
        }

        @media (min-width: 768px) {
          .filter-bar {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }
      `}</style>

      <div className="filter-header">
        <div className="filter-title-section">
          <div className="filter-icon">
            <Filter size={22} />
          </div>
          <h3 className="filter-title">Match History</h3>
        </div>
        <span className="match-count">
          Showing <strong>{filteredCount}</strong> of <strong>{totalMatches}</strong> matches
        </span>
      </div>

      <div className="filter-buttons">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => onFilterChange(filter)}
          >
            <span>{getFilterEmoji(filter)}</span>
            <span>{filter}</span>
            <span className="check-icon">
              <Check size={18} />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}