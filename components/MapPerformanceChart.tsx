'use client';

import { Match } from '@/types/player';
import { useMemo } from 'react';
import { TrendingUp, MapPin, Trophy, Target } from 'lucide-react';

interface MapPerformanceChartProps {
  matches: Match[];
  isDarkMode: boolean;
}

interface MapStats {
  map: string;
  wins: number;
  losses: number;
  totalMatches: number;
  winRate: number;
  avgKD: number;
  avgACS: number;
}

export default function MapPerformanceChart({ matches, isDarkMode }: MapPerformanceChartProps) {
  const mapStats = useMemo(() => {
    const statsMap = new Map<string, MapStats>();

    matches.forEach((match) => {
      const existing = statsMap.get(match.map);
      
      if (existing) {
        existing.totalMatches++;
        existing.wins += match.result === 'Won' ? 1 : 0;
        existing.losses += match.result === 'Lost' ? 1 : 0;
        existing.avgKD = (existing.avgKD * (existing.totalMatches - 1) + match.kd_ratio) / existing.totalMatches;
        existing.avgACS = (existing.avgACS * (existing.totalMatches - 1) + match.ACS) / existing.totalMatches;
        existing.winRate = (existing.wins / existing.totalMatches) * 100;
      } else {
        statsMap.set(match.map, {
          map: match.map,
          wins: match.result === 'Won' ? 1 : 0,
          losses: match.result === 'Lost' ? 1 : 0,
          totalMatches: 1,
          winRate: match.result === 'Won' ? 100 : 0,
          avgKD: match.kd_ratio,
          avgACS: match.ACS,
        });
      }
    });

    return Array.from(statsMap.values()).sort((a, b) => b.totalMatches - a.totalMatches);
  }, [matches]);

  const maxWinRate = Math.max(...mapStats.map(s => s.winRate));

  return (
    <div className="map-performance-chart">
      <style jsx>{`
        .map-performance-chart {
          background: ${isDarkMode 
            ? 'rgba(26, 26, 46, 0.5)'
            : 'rgba(255, 255, 255, 0.7)'};
          backdrop-filter: blur(20px);
          border: 1px solid ${isDarkMode ? '#2a2a45' : '#e0e0e0'};
          border-radius: 24px;
          padding: 40px;
          margin-bottom: 32px;
          box-shadow: ${isDarkMode 
            ? '0 20px 60px rgba(0, 0, 0, 0.3)'
            : '0 20px 60px rgba(0, 0, 0, 0.08)'};
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

        .chart-header {
          margin-bottom: 32px;
        }

        .header-top {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .chart-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #00d4aa 0%, #00a3cc 100%);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(0, 212, 170, 0.3);
        }

        .chart-title {
          font-size: 2rem;
          font-weight: 900;
          color: ${isDarkMode ? '#ffffff' : '#1a1a1a'};
          letter-spacing: -1px;
        }

        .chart-subtitle {
          font-size: 1rem;
          color: ${isDarkMode ? '#a0a0b8' : '#6b6b80'};
          font-weight: 600;
          margin-left: 60px;
        }

        .chart-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .map-row {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 20px;
          background: ${isDarkMode 
            ? 'rgba(15, 15, 26, 0.5)'
            : 'rgba(248, 249, 250, 0.8)'};
          border-radius: 16px;
          border: 1px solid ${isDarkMode ? '#2a2a45' : '#e0e0e0'};
          transition: all 0.3s ease;
        }

        .map-row:hover {
          transform: translateX(8px);
          box-shadow: 0 8px 24px rgba(0, 212, 170, 0.15);
          border-color: #00d4aa;
        }

        .map-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }

        .map-name-section {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .map-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #00d4aa 0%, #00a3cc 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
        }

        .map-name {
          font-size: 1.2rem;
          font-weight: 800;
          color: ${isDarkMode ? '#ffffff' : '#1a1a1a'};
        }

        .map-stats {
          font-size: 0.9rem;
          color: ${isDarkMode ? '#a0a0b8' : '#6b6b80'};
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .win-rate {
          color: #00d4aa;
          font-weight: 800;
          font-size: 1.1rem;
        }

        .stat-separator {
          width: 4px;
          height: 4px;
          background: ${isDarkMode ? '#6b6b80' : '#cbd5e0'};
          border-radius: 50%;
        }

        .bar-container {
          position: relative;
          height: 40px;
          background: ${isDarkMode ? '#0a0a12' : '#e9ecef'};
          border-radius: 12px;
          overflow: hidden;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #00d4aa 0%, #00a3cc 100%);
          border-radius: 12px;
          transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 16px;
          position: relative;
          overflow: hidden;
        }

        .bar-fill::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.2) 50%,
            transparent 100%
          );
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .bar-label {
          font-size: 0.9rem;
          font-weight: 800;
          color: #ffffff;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          gap: 6px;
          z-index: 1;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 12px;
        }

        .stat-badge {
          background: ${isDarkMode 
            ? 'rgba(15, 15, 26, 0.8)'
            : 'rgba(255, 255, 255, 0.9)'};
          padding: 12px 16px;
          border-radius: 12px;
          text-align: center;
          border: 1px solid ${isDarkMode ? '#2a2a45' : '#e0e0e0'};
          transition: all 0.3s ease;
        }

        .stat-badge:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 212, 170, 0.2);
          border-color: #00d4aa;
        }

        .stat-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-bottom: 6px;
        }

        .stat-badge-icon {
          color: #00d4aa;
        }

        .stat-label {
          font-size: 0.7rem;
          color: ${isDarkMode ? '#6b6b80' : '#9ca3af'};
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 700;
        }

        .stat-value {
          font-size: 1.1rem;
          font-weight: 900;
          color: ${isDarkMode ? '#ffffff' : '#1a1a1a'};
          margin-top: 4px;
        }

        @media (min-width: 768px) {
          .map-row {
            gap: 16px;
          }
        }
      `}</style>

      <div className="chart-header">
        <div className="header-top">
          <div className="chart-icon">
            <TrendingUp size={24} />
          </div>
          <h2 className="chart-title">Performance by Map</h2>
        </div>
        <p className="chart-subtitle">Win rates and average statistics across all maps</p>
      </div>

      <div className="chart-container">
        {mapStats.map((stat, index) => (
          <div key={stat.map} className="map-row" style={{ animationDelay: `${index * 0.05}s` }}>
            <div className="map-info">
              <div className="map-name-section">
                <div className="map-icon">
                  <MapPin size={18} />
                </div>
                <span className="map-name">{stat.map}</span>
              </div>
              <div className="map-stats">
                <span className="win-rate">{stat.winRate.toFixed(1)}%</span>
                <span className="stat-separator"></span>
                <span>{stat.totalMatches} match{stat.totalMatches !== 1 ? 'es' : ''}</span>
              </div>
            </div>
            
            <div className="bar-container">
              <div 
                className="bar-fill" 
                style={{ width: `${(stat.winRate / maxWinRate) * 100}%` }}
              >
                {stat.winRate >= 25 && (
                  <span className="bar-label">
                    <Trophy size={14} />
                    {stat.wins}W - {stat.losses}L
                  </span>
                )}
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-badge">
                <div className="stat-header">
                  <div className="stat-badge-icon">
                    <Target size={14} />
                  </div>
                  <div className="stat-label">Avg K/D</div>
                </div>
                <div className="stat-value">{stat.avgKD.toFixed(2)}</div>
              </div>
              <div className="stat-badge">
                <div className="stat-header">
                  <div className="stat-badge-icon">
                    <TrendingUp size={14} />
                  </div>
                  <div className="stat-label">Avg ACS</div>
                </div>
                <div className="stat-value">{Math.round(stat.avgACS)}</div>
              </div>
              <div className="stat-badge">
                <div className="stat-header">
                  <div className="stat-badge-icon">
                    <Trophy size={14} />
                  </div>
                  <div className="stat-label">Matches</div>
                </div>
                <div className="stat-value">{stat.totalMatches}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}