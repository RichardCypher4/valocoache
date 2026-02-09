'use client';

import { useState, useEffect, useMemo } from 'react';
import { PlayerData, Match, FilterType } from '@/types/player';
import PlayerProfile from '@/components/PlayerProfile';
import OverallStats from '@/components/OverallStats';
import FilterBar from '@/components/FilterBar';
import MatchCard from '@/components/MatchCard';
import MatchModal from '@/components/MatchModal';
import SearchBar from '@/components/SearchBar';
import MapPerformanceChart from '@/components/MapPerformanceChart';
import { Sun, Moon, TrendingUp } from 'lucide-react';

export default function Home() {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch('/player.json')
      .then((response) => response.json())
      .then((data) => {
        setPlayerData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading player data:', error);
        setLoading(false);
        setError(true);
      });
  }, []);

  const filteredMatches = useMemo(() => {
    if (!playerData) return [];
    
    let matches = playerData.matches;

    if (activeFilter !== 'All') {
      matches = matches.filter((match) => match.result === activeFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      matches = matches.filter(
        (match) =>
          match.map.toLowerCase().includes(query) ||
          match.agent.toLowerCase().includes(query)
      );
    }

    return matches;
  }, [playerData, activeFilter, searchQuery]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleChart = () => {
    setShowChart(!showChart);
  };

  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <>
        <style jsx global>{`
          body {
            background: #0a0a12;
            margin: 0;
            padding: 0;
          }
        `}</style>
        <style jsx>{`
          .loading-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: radial-gradient(ellipse at top, #1a1a2e 0%, #0a0a12 100%);
            gap: 24px;
            position: relative;
            overflow: hidden;
          }

          .loading-container::before {
            content: '';
            position: absolute;
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(255, 70, 85, 0.15) 0%, transparent 70%);
            border-radius: 50%;
            animation: pulse 3s ease-in-out infinite;
          }

          .loading-spinner {
            width: 70px;
            height: 70px;
            border: 5px solid rgba(255, 70, 85, 0.1);
            border-top-color: #ff4655;
            border-right-color: #9d4edd;
            border-radius: 50%;
            animation: spin 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
            position: relative;
            z-index: 1;
          }

          .loading-text {
            color: #a0a0b8;
            font-size: 1.2rem;
            font-weight: 700;
            letter-spacing: 1px;
            position: relative;
            z-index: 1;
            text-transform: uppercase;
          }

          .loading-subtext {
            color: #6b6b80;
            font-size: 0.9rem;
            position: relative;
            z-index: 1;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes pulse {
            0%, 100% {
              opacity: 0.4;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.1);
            }
          }
        `}</style>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading ValoCoach</div>
          <div className="loading-subtext">Analyzing player data...</div>
        </div>
      </>
    );
  }

  if (!playerData || error) {
    return (
      <>
        <style jsx global>{`
          body {
            background: #0a0a12;
            margin: 0;
            padding: 0;
          }
        `}</style>
        <style jsx>{`
          .error-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a12 100%);
            padding: 20px;
            text-align: center;
          }

          .error-icon {
            font-size: 5rem;
            margin-bottom: 24px;
            filter: grayscale(1);
            opacity: 0.5;
          }

          .error-title {
            color: #ff4655;
            font-size: 2rem;
            font-weight: 800;
            margin-bottom: 12px;
          }

          .error-message {
            color: #a0a0b8;
            font-size: 1.1rem;
            max-width: 500px;
            margin-bottom: 32px;
          }

          .error-button {
            background: linear-gradient(135deg, #ff4655 0%, #9d4edd 100%);
            border: none;
            color: #ffffff;
            padding: 14px 32px;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .error-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(255, 70, 85, 0.4);
          }
        `}</style>
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h1 className="error-title">Connection Failed</h1>
          <p className="error-message">
            Unable to load player data. Please check your connection and try again.
          </p>
          <button className="error-button" onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      </>
    );
  }

  return (
    <main className="main-container">
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          background: ${isDarkMode ? '#0a0a12' : '#f8f9fa'};
          color: ${isDarkMode ? '#ffffff' : '#1a1a1a'};
          line-height: 1.6;
          transition: background 0.4s cubic-bezier(0.4, 0, 0.2, 1), color 0.4s ease;
          overflow-x: hidden;
        }

        ::-webkit-scrollbar {
          width: 12px;
        }

        ::-webkit-scrollbar-track {
          background: ${isDarkMode ? '#0a0a12' : '#e9ecef'};
        }

        ::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? '#2a2a45' : '#cbd5e0'};
          border-radius: 6px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode ? '#ff4655' : '#a0aec0'};
        }
      `}</style>

      <style jsx>{`
        .main-container {
          min-height: 100vh;
          padding: 20px;
          padding-bottom: 80px;
          position: relative;
        }

        .main-container::before {
          content: '';
          position: fixed;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: ${isDarkMode 
            ? 'radial-gradient(circle at 20% 50%, rgba(255, 70, 85, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(157, 78, 221, 0.05) 0%, transparent 50%)'
            : 'radial-gradient(circle at 20% 50%, rgba(255, 70, 85, 0.02) 0%, transparent 50%)'};
          pointer-events: none;
          z-index: 0;
        }

        .hero-section {
          max-width: 1400px;
          margin: 0 auto 48px;
          text-align: center;
          padding: 80px 32px;
          background: ${isDarkMode 
            ? 'linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(15, 15, 26, 0.8) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%)'};
          backdrop-filter: blur(20px);
          border-radius: 32px;
          position: relative;
          overflow: hidden;
          border: 1px solid ${isDarkMode ? 'rgba(255, 70, 85, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
          box-shadow: ${isDarkMode 
            ? '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 100px rgba(255, 70, 85, 0.1) inset'
            : '0 20px 60px rgba(0, 0, 0, 0.08)'};
          z-index: 1;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: 50%;
          transform: translateX(-50%);
          width: 1000px;
          height: 1000px;
          background: radial-gradient(circle, ${isDarkMode ? 'rgba(255, 70, 85, 0.12)' : 'rgba(255, 70, 85, 0.06)'} 0%, transparent 70%);
          pointer-events: none;
          animation: heroGlow 8s ease-in-out infinite;
        }

        @keyframes heroGlow {
          0%, 100% {
            opacity: 0.5;
            transform: translateX(-50%) scale(1) rotate(0deg);
          }
          50% {
            opacity: 0.8;
            transform: translateX(-50%) scale(1.1) rotate(180deg);
          }
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #ff4655 0%, #9d4edd 100%);
          padding: 12px 28px;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 24px;
          position: relative;
          box-shadow: 0 6px 20px rgba(255, 70, 85, 0.4),
                      0 0 40px rgba(255, 70, 85, 0.2) inset;
          animation: badgePulse 3s ease-in-out infinite;
        }

        @keyframes badgePulse {
          0%, 100% {
            box-shadow: 0 6px 20px rgba(255, 70, 85, 0.4),
                        0 0 40px rgba(255, 70, 85, 0.2) inset;
          }
          50% {
            box-shadow: 0 8px 30px rgba(255, 70, 85, 0.6),
                        0 0 60px rgba(255, 70, 85, 0.3) inset;
          }
        }

        .hero-title {
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 900;
          background: linear-gradient(135deg, #ff4655 0%, #9d4edd 50%, #00d4aa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
          position: relative;
          letter-spacing: -2px;
          line-height: 1.1;
          text-shadow: ${isDarkMode ? '0 0 80px rgba(255, 70, 85, 0.3)' : 'none'};
        }

        .hero-subtitle {
          font-size: 1.3rem;
          color: ${isDarkMode ? '#a0a0b8' : '#6b6b80'};
          position: relative;
          max-width: 700px;
          margin: 0 auto;
          font-weight: 500;
          line-height: 1.6;
        }

        .theme-toggle {
          position: fixed;
          top: 24px;
          right: 24px;
          background: ${isDarkMode 
            ? 'rgba(26, 26, 46, 0.8)'
            : 'rgba(255, 255, 255, 0.95)'};
          backdrop-filter: blur(20px);
          border: 2px solid ${isDarkMode ? '#2a2a45' : '#e0e0e0'};
          color: ${isDarkMode ? '#ffffff' : '#1a1a1a'};
          padding: 14px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          box-shadow: ${isDarkMode 
            ? '0 8px 32px rgba(0, 0, 0, 0.3)'
            : '0 8px 32px rgba(0, 0, 0, 0.1)'};
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
        }

        .theme-toggle:hover {
          transform: scale(1.1) rotate(180deg);
          box-shadow: 0 12px 48px rgba(255, 70, 85, 0.3);
          border-color: #ff4655;
        }

        .theme-toggle:active {
          transform: scale(0.95);
        }

        .content-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .controls-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 32px;
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

        .chart-toggle {
          background: linear-gradient(135deg, #00d4aa 0%, #00a3cc 100%);
          border: none;
          color: #ffffff;
          padding: 16px 32px;
          border-radius: 16px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 8px 24px rgba(0, 212, 170, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          position: relative;
          overflow: hidden;
        }

        .chart-toggle::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .chart-toggle:hover::before {
          width: 300px;
          height: 300px;
        }

        .chart-toggle:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 36px rgba(0, 212, 170, 0.5);
        }

        .chart-toggle:active {
          transform: translateY(-1px);
        }

        .matches-grid {
          display: grid;
          gap: 24px;
          grid-template-columns: 1fr;
          animation: slideUp 0.6s ease-out 0.4s both;
        }

        @media (min-width: 768px) {
          .controls-section {
            flex-direction: row;
            align-items: center;
          }

          .chart-toggle {
            width: auto;
          }

          .matches-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1200px) {
          .matches-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .no-matches {
          text-align: center;
          padding: 100px 32px;
          background: ${isDarkMode 
            ? 'rgba(26, 26, 46, 0.5)'
            : 'rgba(255, 255, 255, 0.7)'};
          backdrop-filter: blur(20px);
          border: 1px solid ${isDarkMode ? '#2a2a45' : '#e0e0e0'};
          border-radius: 24px;
          animation: slideUp 0.6s ease-out both;
        }

        .no-matches-icon {
          font-size: 5rem;
          margin-bottom: 24px;
          opacity: 0.4;
          filter: grayscale(1);
        }

        .no-matches-text {
          color: ${isDarkMode ? '#a0a0b8' : '#6b6b80'};
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .no-matches-subtext {
          color: ${isDarkMode ? '#6b6b80' : '#9ca3af'};
          font-size: 1rem;
        }

        .search-results-info {
          margin-bottom: 24px;
          padding: 20px 24px;
          background: ${isDarkMode 
            ? 'rgba(0, 212, 170, 0.08)'
            : 'rgba(0, 212, 170, 0.05)'};
          border-left: 4px solid #00d4aa;
          border-radius: 12px;
          backdrop-filter: blur(10px);
          animation: slideUp 0.6s ease-out both;
          box-shadow: 0 4px 12px rgba(0, 212, 170, 0.1);
        }

        .search-results-text {
          color: ${isDarkMode ? '#00d4aa' : '#00a3cc'};
          font-weight: 700;
          font-size: 1.05rem;
        }
      `}</style>

      <button 
        className="theme-toggle" 
        onClick={toggleTheme} 
        title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      <div className="hero-section">
        <div className="hero-badge">
          <span>⚡</span>
          <span>ValoCoach Dashboard</span>
        </div>
        <h1 className="hero-title">Player Analytics</h1>
        <p className="hero-subtitle">
          Track performance, analyze matches, and dominate the competition with data-driven insights
        </p>
      </div>

      <div className="content-container">
        <PlayerProfile player={playerData} isDarkMode={isDarkMode} />
        <OverallStats player={playerData} isDarkMode={isDarkMode} />
        
        <div className="controls-section">
          <div style={{ flex: 1 }}>
            <SearchBar 
              onSearch={setSearchQuery} 
              placeholder="🔍 Search by agent or map..." 
              isDarkMode={isDarkMode}
            />
          </div>
          <button className="chart-toggle" onClick={toggleChart}>
            <TrendingUp size={20} />
            <span>{showChart ? 'Hide Chart' : 'Show Performance'}</span>
          </button>
        </div>

        {showChart && <MapPerformanceChart matches={playerData.matches} isDarkMode={isDarkMode} />}
        
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          totalMatches={playerData.matches.length}
          filteredCount={filteredMatches.length}
          isDarkMode={isDarkMode}
        />

        {searchQuery && filteredMatches.length > 0 && (
          <div className="search-results-info">
            <span className="search-results-text">
              🎯 Found {filteredMatches.length} match{filteredMatches.length !== 1 ? 'es' : ''} for "{searchQuery}"
            </span>
          </div>
        )}

        {filteredMatches.length > 0 ? (
          <div className="matches-grid">
            {filteredMatches.map((match, index) => (
              <MatchCard
                key={match.match_id}
                match={match}
                onClick={() => setSelectedMatch(match)}
                isDarkMode={isDarkMode}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="no-matches">
            <div className="no-matches-icon">🔍</div>
            <div className="no-matches-text">No matches found</div>
            <div className="no-matches-subtext">
              {searchQuery 
                ? 'Try adjusting your search or filter criteria'
                : `No ${activeFilter.toLowerCase()} matches available`}
            </div>
          </div>
        )}
      </div>

      <MatchModal 
        match={selectedMatch} 
        onClose={() => setSelectedMatch(null)} 
        isDarkMode={isDarkMode}
      />
    </main>
  );
}