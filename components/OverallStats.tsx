'use client';

import { PlayerData } from '@/types/player';
import { Crosshair, Activity, Trophy, Zap } from 'lucide-react';

interface OverallStatsProps {
  player: PlayerData;
  isDarkMode: boolean;
}

export default function OverallStats({ player, isDarkMode }: OverallStatsProps) {
  const stats = [
    {
      icon: <Crosshair size={32} />,
      label: 'K/D Ratio',
      value: player.overall_kd_ratio.toFixed(2),
      color: '#ff4655',
      gradient: 'linear-gradient(135deg, #ff4655 0%, #ff6b78 100%)',
    },
    {
      icon: <Activity size={32} />,
      label: 'Headshot %',
      value: `${player.overall_headshot_percentage.toFixed(1)}%`,
      color: '#9d4edd',
      gradient: 'linear-gradient(135deg, #9d4edd 0%, #b370f0 100%)',
    },
    {
      icon: <Trophy size={32} />,
      label: 'Win Rate',
      value: `${player.overall_win_percent.toFixed(1)}%`,
      color: '#00d4aa',
      gradient: 'linear-gradient(135deg, #00d4aa 0%, #00f0c3 100%)',
    },
    {
      icon: <Zap size={32} />,
      label: 'Average ACS',
      value: Math.round(player.overall_ACS).toString(),
      color: '#ffa500',
      gradient: 'linear-gradient(135deg, #ffa500 0%, #ffb733 100%)',
    },
  ];

  return (
    <div className="overall-stats">
      <style jsx>{`
        .overall-stats {
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
          animation: slideUp 0.6s ease-out 0.2s both;
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

        .section-title {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 32px;
          color: ${isDarkMode ? '#ffffff' : '#1a1a1a'};
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .title-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #ff4655 0%, #9d4edd 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
        }

        .stat-card {
          background: ${isDarkMode 
            ? 'rgba(15, 15, 26, 0.6)'
            : 'rgba(255, 255, 255, 0.8)'};
          backdrop-filter: blur(10px);
          border: 1px solid ${isDarkMode ? '#2a2a45' : '#e0e0e0'};
          border-radius: 20px;
          padding: 32px;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--gradient);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }

        .stat-card::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: var(--color);
          opacity: 0.1;
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease;
        }

        .stat-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          border-color: var(--color);
        }

        .stat-card:hover::before {
          transform: scaleX(1);
        }

        .stat-card:hover::after {
          width: 400px;
          height: 400px;
        }

        .stat-icon {
          margin-bottom: 16px;
          color: var(--color);
          display: flex;
          justify-content: center;
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }

        .stat-card:hover .stat-icon {
          transform: scale(1.2) rotate(5deg);
        }

        .stat-label {
          font-size: 0.95rem;
          color: ${isDarkMode ? '#a0a0b8' : '#6b6b80'};
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 12px;
          font-weight: 700;
          position: relative;
          z-index: 1;
        }

        .stat-value {
          font-size: 3rem;
          font-weight: 900;
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          position: relative;
          z-index: 1;
          letter-spacing: -2px;
        }

        .stat-suffix {
          font-size: 2rem;
        }
      `}</style>

      <h2 className="section-title">
        <div className="title-icon">📊</div>
        Overall Statistics
      </h2>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="stat-card"
            style={{
              '--color': stat.color,
              '--gradient': stat.gradient,
            } as React.CSSProperties}
          >
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}