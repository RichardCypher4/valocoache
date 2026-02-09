'use client';

import { PlayerData } from '@/types/player';
import { Trophy, Target, Map, TrendingUp, Award, Star } from 'lucide-react';

interface PlayerProfileProps {
  player: PlayerData;
  isDarkMode: boolean;
}

export default function PlayerProfile({ player, isDarkMode }: PlayerProfileProps) {
  return (
    <div className="player-profile">
      <style jsx>{`
        .player-profile {
          background: ${isDarkMode 
            ? 'linear-gradient(135deg, rgba(255, 70, 85, 0.08) 0%, rgba(157, 78, 221, 0.08) 100%)'
            : 'linear-gradient(135deg, rgba(255, 70, 85, 0.04) 0%, rgba(157, 78, 221, 0.04) 100%)'};
          backdrop-filter: blur(20px);
          border: 1px solid ${isDarkMode ? 'rgba(255, 70, 85, 0.15)' : 'rgba(0, 0, 0, 0.08)'};
          border-radius: 24px;
          padding: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
          margin-bottom: 32px;
          box-shadow: ${isDarkMode 
            ? '0 20px 60px rgba(0, 0, 0, 0.3)'
            : '0 20px 60px rgba(0, 0, 0, 0.08)'};
          position: relative;
          overflow: hidden;
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .player-profile::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: ${isDarkMode 
            ? 'radial-gradient(circle, rgba(255, 70, 85, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255, 70, 85, 0.05) 0%, transparent 70%)'};
          pointer-events: none;
        }

        .avatar-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          position: relative;
          z-index: 1;
        }

        .avatar-container {
          position: relative;
          width: 140px;
          height: 140px;
          border-radius: 50%;
          overflow: hidden;
          border: 5px solid #ff4655;
          box-shadow: 0 0 40px rgba(255, 70, 85, 0.5),
                      0 0 80px rgba(255, 70, 85, 0.3) inset;
          animation: avatarGlow 3s ease-in-out infinite;
        }

        @keyframes avatarGlow {
          0%, 100% {
            box-shadow: 0 0 40px rgba(255, 70, 85, 0.5),
                        0 0 80px rgba(255, 70, 85, 0.3) inset;
          }
          50% {
            box-shadow: 0 0 60px rgba(255, 70, 85, 0.7),
                        0 0 100px rgba(255, 70, 85, 0.4) inset;
          }
        }

        .avatar-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .avatar-container:hover .avatar-image {
          transform: scale(1.1);
        }

        .level-badge {
          position: absolute;
          bottom: -10px;
          right: -10px;
          background: linear-gradient(135deg, #00d4aa 0%, #00a3cc 100%);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.9rem;
          border: 4px solid ${isDarkMode ? '#0a0a12' : '#ffffff'};
          box-shadow: 0 4px 12px rgba(0, 212, 170, 0.4);
        }

        .player-info {
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .player-name {
          font-size: 2.5rem;
          font-weight: 900;
          background: linear-gradient(135deg, #ff4655 0%, #9d4edd 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 12px;
          letter-spacing: -1px;
        }

        .rank-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .player-rank {
          font-size: 1.5rem;
          color: #00d4aa;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .peak-rank {
          font-size: 0.9rem;
          color: ${isDarkMode ? '#a0a0b8' : '#6b6b80'};
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          width: 100%;
          margin-top: 24px;
          position: relative;
          z-index: 1;
        }

        .stat-card {
          background: ${isDarkMode 
            ? 'rgba(26, 26, 46, 0.6)'
            : 'rgba(255, 255, 255, 0.8)'};
          backdrop-filter: blur(10px);
          padding: 20px;
          border-radius: 16px;
          text-align: center;
          border: 1px solid ${isDarkMode ? '#2a2a45' : '#e0e0e0'};
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #ff4655 0%, #9d4edd 100%);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(255, 70, 85, 0.2);
          border-color: #ff4655;
        }

        .stat-card:hover::before {
          transform: scaleX(1);
        }

        .stat-icon {
          margin-bottom: 8px;
          color: #ff4655;
          display: flex;
          justify-content: center;
        }

        .stat-label {
          font-size: 0.75rem;
          color: ${isDarkMode ? '#a0a0b8' : '#6b6b80'};
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 6px;
          font-weight: 600;
        }

        .stat-value {
          font-size: 1.3rem;
          font-weight: 800;
          color: ${isDarkMode ? '#ffffff' : '#1a1a1a'};
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }

        @media (min-width: 768px) {
          .player-profile {
            flex-direction: row;
            text-align: left;
            justify-content: space-between;
          }

          .avatar-section {
            flex-direction: row;
            align-items: center;
          }

          .player-info {
            text-align: left;
          }

          .rank-container {
            justify-content: flex-start;
          }

          .stats-grid {
            grid-template-columns: repeat(4, 1fr);
            max-width: 600px;
          }
        }

        @media (min-width: 1024px) {
          .stats-grid {
            max-width: 100%;
          }
        }
      `}</style>

      <div className="avatar-section">
        <div className="avatar-container">
          <img
            src={player.player_card_link}
            alt={player.player_name}
            className="avatar-image"
          />
          <div className="level-badge">{player.player_account_level}</div>
        </div>

        <div className="player-info">
          <h1 className="player-name">{player.player_name}</h1>
          <div className="rank-container">
            <p className="player-rank">
              <Trophy size={20} />
              {player.current_rank}
            </p>
          </div>
          <p className="peak-rank">
            <Star size={16} />
            Peak: {player.peak_rank}
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Award size={20} />
          </div>
          <div className="stat-label">Leaderboard</div>
          <div className="stat-value">#{player.leaderboard_placement}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <Target size={20} />
          </div>
          <div className="stat-label">Top Agent</div>
          <div className="stat-value">{player.top_agent}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <Map size={20} />
          </div>
          <div className="stat-label">Best Map</div>
          <div className="stat-value">{player.best_map}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp size={20} />
          </div>
          <div className="stat-label">Worst Map</div>
          <div className="stat-value">{player.worst_map}</div>
        </div>
      </div>
    </div>
  );
}