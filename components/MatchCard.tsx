'use client';

import { Match } from '@/types/player';
import { Calendar, MapPin, User, Crosshair, Target, Activity, Zap } from 'lucide-react';

interface MatchCardProps {
  match: Match;
  onClick: () => void;
  isDarkMode: boolean;
  index: number;
}

export default function MatchCard({ match, onClick, isDarkMode, index }: MatchCardProps) {
  const isWin = match.result === 'Won';
  const isDraw = match.result === 'Draw';
  
  const resultColor = isWin ? '#00d4aa' : isDraw ? '#ffa500' : '#ff4655';
  const resultBg = isWin 
    ? 'linear-gradient(135deg, #00d4aa 0%, #00f0c3 100%)'
    : isDraw
    ? 'linear-gradient(135deg, #ffa500 0%, #ffb733 100%)'
    : 'linear-gradient(135deg, #ff4655 0%, #ff6b78 100%)';

  return (
    <div className="match-card" onClick={onClick}>
      <style jsx>{`
        .match-card {
          background: ${isDarkMode 
            ? 'rgba(26, 26, 46, 0.6)'
            : 'rgba(255, 255, 255, 0.8)'};
          backdrop-filter: blur(20px);
          border: 1px solid ${isDarkMode ? '#2a2a45' : '#e0e0e0'};
          border-left: 5px solid ${resultColor};
          border-radius: 20px;
          padding: 28px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          animation: cardSlide 0.6s ease-out ${index * 0.05}s both;
        }

        @keyframes cardSlide {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .match-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: ${resultBg};
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .match-card:hover::before {
          opacity: 0.05;
        }

        .match-card:hover {
          transform: translateY(-8px) translateX(4px);
          box-shadow: ${isDarkMode
            ? `0 20px 60px rgba(0, 0, 0, 0.4), -8px 0 30px ${resultColor}33`
            : `0 20px 60px rgba(0, 0, 0, 0.15), -8px 0 30px ${resultColor}22`};
          border-left-width: 8px;
        }

        .match-card:active {
          transform: translateY(-4px) translateX(2px);
        }

        .match-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
          position: relative;
          z-index: 1;
        }

        .result-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 1.15rem;
          font-weight: 800;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 8px 16px;
          border-radius: 12px;
          background: ${resultBg};
          box-shadow: 0 4px 12px ${resultColor}44;
        }

        .match-number {
          font-size: 0.8rem;
          color: ${isDarkMode ? '#6b6b80' : '#9ca3af'};
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .match-date {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.9rem;
          color: ${isDarkMode ? '#a0a0b8' : '#6b6b80'};
          font-weight: 600;
        }

        .match-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 16px;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px;
          background: ${isDarkMode 
            ? 'rgba(15, 15, 26, 0.5)'
            : 'rgba(248, 249, 250, 0.8)'};
          border-radius: 12px;
          border: 1px solid ${isDarkMode ? '#2a2a45' : '#e0e0e0'};
          transition: all 0.3s ease;
        }

        .info-item:hover {
          background: ${isDarkMode 
            ? 'rgba(255, 70, 85, 0.08)'
            : 'rgba(255, 70, 85, 0.04)'};
          border-color: ${resultColor};
          transform: translateY(-2px);
        }

        .info-icon {
          color: ${resultColor};
          flex-shrink: 0;
        }

        .info-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .info-label {
          font-size: 0.7rem;
          color: ${isDarkMode ? '#6b6b80' : '#9ca3af'};
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 700;
        }

        .info-value {
          font-size: 0.95rem;
          font-weight: 700;
          color: ${isDarkMode ? '#ffffff' : '#1a1a1a'};
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .match-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          padding-top: 20px;
          border-top: 1px solid ${isDarkMode ? '#2a2a45' : '#e0e0e0'};
          position: relative;
          z-index: 1;
        }

        .stat {
          text-align: center;
          padding: 14px;
          background: ${isDarkMode 
            ? 'rgba(15, 15, 26, 0.5)'
            : 'rgba(248, 249, 250, 0.8)'};
          border-radius: 12px;
          border: 1px solid ${isDarkMode ? '#2a2a45' : '#e0e0e0'};
          transition: all 0.3s ease;
        }

        .stat:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px ${resultColor}22;
          border-color: ${resultColor};
        }

        .stat-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 0.75rem;
          color: ${isDarkMode ? '#a0a0b8' : '#6b6b80'};
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .stat-icon {
          color: ${resultColor};
        }

        .stat-value {
          font-size: 1.3rem;
          font-weight: 800;
          color: ${isDarkMode ? '#ffffff' : '#1a1a1a'};
        }

        .kd-positive {
          color: #00d4aa;
        }

        .kd-negative {
          color: #ff4655;
        }

        @media (min-width: 640px) {
          .match-stats {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>

      <div className="match-header">
        <div>
          <div className="match-number">Match #{match.match_number}</div>
          <div className="result-badge">
            {isWin ? '🏆' : isDraw ? '⚖️' : '💔'} {match.result}
          </div>
        </div>
        <div className="match-date">
          <Calendar size={16} />
          {new Date(match.date_and_time).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>
      </div>

      <div className="match-info">
        <div className="info-item">
          <div className="info-icon">
            <MapPin size={18} />
          </div>
          <div className="info-content">
            <div className="info-label">Map</div>
            <div className="info-value">{match.map}</div>
          </div>
        </div>
        <div className="info-item">
          <div className="info-icon">
            <User size={18} />
          </div>
          <div className="info-content">
            <div className="info-label">Agent</div>
            <div className="info-value">{match.agent}</div>
          </div>
        </div>
        <div className="info-item">
          <div className="info-icon">
            <Target size={18} />
          </div>
          <div className="info-content">
            <div className="info-label">Rounds</div>
            <div className="info-value">{match.total_rounds}</div>
          </div>
        </div>
      </div>

      <div className="match-stats">
        <div className="stat">
          <div className="stat-header">
            <div className="stat-icon">
              <Crosshair size={16} />
            </div>
            <div className="stat-label">K/D</div>
          </div>
          <div className={`stat-value ${match.kd_ratio >= 1 ? 'kd-positive' : 'kd-negative'}`}>
            {match.kd_ratio.toFixed(2)}
          </div>
        </div>
        <div className="stat">
          <div className="stat-header">
            <div className="stat-icon">
              <Activity size={16} />
            </div>
            <div className="stat-label">KDA</div>
          </div>
          <div className="stat-value">
            {match.kills}/{match.deaths}/{match.assists}
          </div>
        </div>
        <div className="stat">
          <div className="stat-header">
            <div className="stat-icon">
              <Target size={16} />
            </div>
            <div className="stat-label">HS%</div>
          </div>
          <div className="stat-value">{match.headshot_percentage.toFixed(1)}%</div>
        </div>
        <div className="stat">
          <div className="stat-header">
            <div className="stat-icon">
              <Zap size={16} />
            </div>
            <div className="stat-label">ACS</div>
          </div>
          <div className="stat-value">{match.ACS}</div>
        </div>
      </div>
    </div>
  );
}