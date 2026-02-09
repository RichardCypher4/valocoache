'use client';

import { Match } from '@/types/player';
import { X, MapPin, User, Target, Crosshair, Activity, Skull, Heart, Swords, Shield } from 'lucide-react';

interface MatchModalProps {
  match: Match | null;
  onClose: () => void;
  isDarkMode: boolean;
}

export default function MatchModal({ match, onClose, isDarkMode }: MatchModalProps) {
  if (!match) return null;

  const isWin = match.result === 'Won';
  const resultColor = isWin ? '#00d4aa' : match.result === 'Draw' ? '#ffa500' : '#ff4655';
  const resultGradient = isWin 
    ? 'linear-gradient(135deg, #00d4aa 0%, #00f0c3 100%)'
    : match.result === 'Draw'
    ? 'linear-gradient(135deg, #ffa500 0%, #ffb733 100%)'
    : 'linear-gradient(135deg, #ff4655 0%, #ff6b78 100%)';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 20px;
          backdrop-filter: blur(8px);
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .modal-content {
          background: ${isDarkMode ? '#1a1a2e' : '#ffffff'};
          border: 1px solid ${isDarkMode ? '#2a2a45' : '#e0e0e0'};
          border-radius: 28px;
          max-width: 700px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.5);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .modal-header {
          background: ${resultGradient};
          padding: 40px 32px;
          border-radius: 28px 28px 0 0;
          position: relative;
          overflow: hidden;
        }

        .modal-header::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
        }

        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 10;
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: rotate(90deg) scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .close-btn:active {
          transform: rotate(90deg) scale(0.95);
        }

        .match-title {
          font-size: 2.2rem;
          font-weight: 900;
          color: #ffffff;
          margin-bottom: 12px;
          position: relative;
          z-index: 1;
          letter-spacing: -1px;
        }

        .match-subtitle {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.9);
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
          font-weight: 600;
        }

        .subtitle-separator {
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
        }

        .modal-body {
          padding: 32px;
        }

        .detail-section {
          margin-bottom: 32px;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .section-icon {
          width: 40px;
          height: 40px;
          background: ${resultGradient};
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
        }

        .section-title {
          font-size: 1.3rem;
          font-weight: 800;
          color: ${isDarkMode ? '#ffffff' : '#1a1a1a'};
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 16px;
        }

        .detail-card {
          background: ${isDarkMode 
            ? 'rgba(26, 26, 46, 0.5)'
            : 'rgba(248, 249, 250, 0.8)'};
          padding: 20px;
          border-radius: 16px;
          border: 1px solid ${isDarkMode ? '#2a2a45' : '#e0e0e0'};
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .detail-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: ${resultGradient};
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .detail-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          border-color: ${resultColor};
        }

        .detail-card:hover::before {
          transform: scaleX(1);
        }

        .detail-label {
          font-size: 0.75rem;
          color: ${isDarkMode ? '#a0a0b8' : '#6b6b80'};
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
          font-weight: 700;
        }

        .detail-value {
          font-size: 1.6rem;
          font-weight: 900;
          color: ${isDarkMode ? '#ffffff' : '#1a1a1a'};
          line-height: 1;
        }

        .highlight {
          color: ${resultColor};
        }

        .damage-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .damage-card {
          background: ${isDarkMode 
            ? 'rgba(26, 26, 46, 0.5)'
            : 'rgba(248, 249, 250, 0.8)'};
          padding: 24px;
          border-radius: 16px;
          border: 1px solid ${isDarkMode ? '#2a2a45' : '#e0e0e0'};
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .damage-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
        }

        .damage-card.dealt::before {
          background: linear-gradient(180deg, #00d4aa 0%, #00a3cc 100%);
        }

        .damage-card.received::before {
          background: linear-gradient(180deg, #ff4655 0%, #9d4edd 100%);
        }

        .damage-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .damage-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .damage-icon {
          color: ${isDarkMode ? '#ffffff' : '#1a1a1a'};
        }

        .damage-label {
          font-size: 0.9rem;
          color: ${isDarkMode ? '#a0a0b8' : '#6b6b80'};
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .damage-value {
          font-size: 2.5rem;
          font-weight: 900;
          color: ${isDarkMode ? '#ffffff' : '#1a1a1a'};
          letter-spacing: -1px;
        }

        .damage-card.dealt .damage-value {
          color: #00d4aa;
        }

        .damage-card.received .damage-value {
          color: #ff4655;
        }

        /* Custom scrollbar */
        .modal-content::-webkit-scrollbar {
          width: 10px;
        }

        .modal-content::-webkit-scrollbar-track {
          background: ${isDarkMode ? '#0a0a12' : '#f1f1f1'};
          border-radius: 0 28px 28px 0;
        }

        .modal-content::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? '#2a2a45' : '#cbd5e0'};
          border-radius: 10px;
        }

        .modal-content::-webkit-scrollbar-thumb:hover {
          background: ${resultColor};
        }
      `}</style>

      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            <X size={24} />
          </button>
          <h2 className="match-title">Match #{match.match_number}</h2>
          <div className="match-subtitle">
            <span><MapPin size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /> {match.map}</span>
            <span className="subtitle-separator"></span>
            <span><User size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /> {match.agent}</span>
            <span className="subtitle-separator"></span>
            <span>{new Date(match.date_and_time).toLocaleString()}</span>
          </div>
        </div>

        <div className="modal-body">
          <div className="detail-section">
            <div className="section-header">
              <div className="section-icon">
                <Target size={20} />
              </div>
              <h3 className="section-title">Match Overview</h3>
            </div>
            <div className="detail-grid">
              <div className="detail-card">
                <div className="detail-label">Result</div>
                <div className="detail-value highlight">{match.result}</div>
              </div>
              <div className="detail-card">
                <div className="detail-label">Team</div>
                <div className="detail-value">{match.team}</div>
              </div>
              <div className="detail-card">
                <div className="detail-label">Total Rounds</div>
                <div className="detail-value">{match.total_rounds}</div>
              </div>
              <div className="detail-card">
                <div className="detail-label">ACS</div>
                <div className="detail-value">{match.ACS}</div>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <div className="section-header">
              <div className="section-icon">
                <Swords size={20} />
              </div>
              <h3 className="section-title">Combat Stats</h3>
            </div>
            <div className="detail-grid">
              <div className="detail-card">
                <div className="detail-label">Kills</div>
                <div className="detail-value">{match.kills}</div>
              </div>
              <div className="detail-card">
                <div className="detail-label">Deaths</div>
                <div className="detail-value">{match.deaths}</div>
              </div>
              <div className="detail-card">
                <div className="detail-label">Assists</div>
                <div className="detail-value">{match.assists}</div>
              </div>
              <div className="detail-card">
                <div className="detail-label">K/D Ratio</div>
                <div className="detail-value">{match.kd_ratio.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <div className="section-header">
              <div className="section-icon">
                <Crosshair size={20} />
              </div>
              <h3 className="section-title">Accuracy</h3>
            </div>
            <div className="detail-grid">
              <div className="detail-card">
                <div className="detail-label">Headshots</div>
                <div className="detail-value">{match.headshots}</div>
              </div>
              <div className="detail-card">
                <div className="detail-label">Bodyshots</div>
                <div className="detail-value">{match.bodyshots}</div>
              </div>
              <div className="detail-card">
                <div className="detail-label">Legshots</div>
                <div className="detail-value">{match.legshots}</div>
              </div>
              <div className="detail-card">
                <div className="detail-label">HS %</div>
                <div className="detail-value">{match.headshot_percentage.toFixed(1)}%</div>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <div className="section-header">
              <div className="section-icon">
                <Activity size={20} />
              </div>
              <h3 className="section-title">Damage</h3>
            </div>
            <div className="damage-grid">
              <div className="damage-card dealt">
                <div className="damage-header">
                  <div className="damage-icon">
                    <Swords size={20} />
                  </div>
                  <div className="damage-label">Damage Dealt</div>
                </div>
                <div className="damage-value">{match.damage_made.toLocaleString()}</div>
              </div>
              <div className="damage-card received">
                <div className="damage-header">
                  <div className="damage-icon">
                    <Shield size={20} />
                  </div>
                  <div className="damage-label">Damage Received</div>
                </div>
                <div className="damage-value">{match.damage_received.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}