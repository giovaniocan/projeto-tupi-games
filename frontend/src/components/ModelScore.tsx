import React, { useState } from 'react';
import { Button } from "./Button";
import './ModelScore.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../languageContext';

const formatarTempo = (segundos: number) => {
  const minutos = Math.floor(segundos / 60);
  const segundosRestantes = (segundos % 60).toFixed(0).padStart(2, '0');
  return `${minutos}:${segundosRestantes}`;
};

interface ModelScoreProps {
  dificuldade: string;
  tempo: number;
  jogadas: number;
  pontuacao: number;
  onClose: () => void;
}

const ModelScore: React.FC<ModelScoreProps> = ({ dificuldade, tempo, jogadas, pontuacao, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const { dificuldade: locDificuldade, tempo: locTempo, jogadas: locJogadas, pontuacao: locPontuacao } = location.state || {};

  const [nome, setNome] = useState('');
  const [salvo, setSalvo] = useState(false);

  const gameStats = {
    difficulty: locDificuldade || dificuldade,
    time: locTempo || tempo,
    moves: locJogadas || jogadas,
    score: locPontuacao || pontuacao,
  };

  const buttons: { text: string; color: "green" | "blue" | "brown"; onClick: () => void }[] = [
    {
      text: t("score", "playAgain"),
      color: 'green',
      onClick: () => navigate('/jogo'),
    },
    {
      text: t("score", "viewRanking"),
      color: 'blue',
      onClick: () => navigate('/ranking'),
    },
    {
      text: t("score", "home"),
      color: 'brown',
      onClick: () => navigate('/home'),
    },
  ];

  if (!onClose) return null;

  return (
    <div className="modelscore-bg-center">
      <div className="modal-overlay">
        <div className="modelscore-card">
          <h1 className="modelscore-title">{t("score", "congrats")}</h1>
          <div className="modelscore-info-card">
            <div>
              <span className="modelscore-label">{t("score", "difficulty")}:</span>
              <span className="modelscore-value">{gameStats.difficulty}</span>
            </div>
            <div>
              <span className="modelscore-label">{t("score", "time")}:</span>
              <span className="modelscore-value">{formatarTempo(gameStats.time)}</span>
            </div>
            <div>
              <span className="modelscore-label">{t("score", "moves")}:</span>
              <span className="modelscore-value">{gameStats.moves}</span>
            </div>
            <hr className="modelscore-divider" />
            <div>
              <span className="modelscore-label modelscore-score-label">{t("game", "score")}:</span>
              <span className="modelscore-value modelscore-score-value">{gameStats.score}</span>
            </div>
          </div>
          <div className="modelscore-save">
            <span className="modelscore-save-label">{t("score", "save")}</span>
            <div className="modelscore-save-row">
              <input
                type="text"
                placeholder={t("score", "name")}
                value={nome}
                onChange={e => setNome(e.target.value)}
                className="modelscore-input"
                disabled={salvo}
              />
              <button
                onClick={() => {
                  if (nome.trim()) {
                    setSalvo(true);
                    console.log("Salvo:", nome, gameStats.score);
                  }
                }}
                className="modelscore-save-btn replay-btn"
                disabled={salvo || !nome.trim()}
              >
                {t("score", "confirm")}
              </button>
            </div>
            {salvo && <span className="modelscore-saved-msg">{t("score", "saved")}</span>}
          </div>
          <div className="modelscore-buttons">
            {buttons.map((btn, idx) => (
              <Button
                key={idx}
                color={btn.color}
                onClick={btn.onClick}
                text={btn.text}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelScore;
