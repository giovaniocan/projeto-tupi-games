import React, { useState } from "react";
import { Button } from "./Button";
import "./ModelScore.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../languageContext";
import { ScoreService } from "../services/scoreService";
import { ScoreDTO } from "../types/backend-types";

const formatarTempo = (segundos: number) => {
  const minutos = Math.floor(segundos / 60);
  const segundosRestantes = (segundos % 60).toFixed(0).padStart(2, "0");
  return `${minutos}:${segundosRestantes}`;
};

interface ModelScoreProps {
  dificuldade: string;
  tempo: number;
  jogadas: number;
  pontuacao: number;
  onClose: () => void;
}

const ModelScore: React.FC<ModelScoreProps> = ({
  dificuldade,
  tempo,
  jogadas,
  pontuacao,
  onClose,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const {
    dificuldade: locDificuldade,
    tempo: locTempo,
    jogadas: locJogadas,
    pontuacao: locPontuacao,
  } = location.state || {};

  const [nome, setNome] = useState("");
  const [salvo, setSalvo] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [mensagemSalvar, setMensagemSalvar] = useState("");

  const gameStats = {
    difficulty: locDificuldade || dificuldade,
    time: locTempo || tempo,
    moves: locJogadas || jogadas,
    score: locPontuacao || pontuacao,
  };

  const salvarScore = async () => {
    if (!nome.trim() || salvando || salvo) return;

    try {
      setSalvando(true);
      setMensagemSalvar("");

      console.log("💾 Salvando score no backend...");

      const scoreData: ScoreDTO = {
        playerName: nome.trim(),
        scoreValue: gameStats.score,
      };

      // Validação antes de enviar
      const validationError = ScoreService.validateScore(scoreData);
      if (validationError) {
        setMensagemSalvar(`❌ ${validationError}`);
        return;
      }

      const response = await ScoreService.submitScore(scoreData);

      console.log("✅ Score salvo com sucesso:", response);

      setSalvo(true);
      setMensagemSalvar(response.message || t("score", "saved"));

      // Mostra mensagem de sucesso por alguns segundos
      setTimeout(() => {
        setMensagemSalvar("");
      }, 3000);
    } catch (error) {
      console.error("❌ Erro ao salvar score:", error);
      setMensagemSalvar("❌ Erro ao salvar score. Tente novamente.");

      // Remove mensagem de erro após alguns segundos
      setTimeout(() => {
        setMensagemSalvar("");
      }, 5000);
    } finally {
      setSalvando(false);
    }
  };

  const buttons: {
    text: string;
    color: "green" | "blue" | "brown";
    onClick: () => void;
  }[] = [
    {
      text: t("score", "playAgain"),
      color: "green",
      onClick: () => navigate("/jogo"),
    },
    {
      text: t("score", "viewRanking"),
      color: "blue",
      onClick: () => navigate("/ranking"),
    },
    {
      text: t("score", "home"),
      color: "brown",
      onClick: () => navigate("/home"),
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
              <span className="modelscore-label">
                {t("score", "difficulty")}:
              </span>
              <span className="modelscore-value">{gameStats.difficulty}</span>
            </div>
            <div>
              <span className="modelscore-label">{t("score", "time")}:</span>
              <span className="modelscore-value">
                {formatarTempo(gameStats.time)}
              </span>
            </div>
            <div>
              <span className="modelscore-label">{t("score", "moves")}:</span>
              <span className="modelscore-value">{gameStats.moves}</span>
            </div>
            <hr className="modelscore-divider" />
            <div>
              <span className="modelscore-label modelscore-score-label">
                {t("game", "score")}:
              </span>
              <span className="modelscore-value modelscore-score-value">
                {gameStats.score}
              </span>
            </div>
          </div>

          <div className="modelscore-save">
            <span className="modelscore-save-label">{t("score", "save")}</span>
            <div className="modelscore-save-row">
              <input
                type="text"
                placeholder={t("score", "name")}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="modelscore-input"
                disabled={salvo || salvando}
                maxLength={100}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && nome.trim() && !salvo && !salvando) {
                    salvarScore();
                  }
                }}
              />
              <button
                onClick={salvarScore}
                className="modelscore-save-btn replay-btn"
                disabled={salvo || !nome.trim() || salvando}
                style={{
                  opacity: salvo || !nome.trim() || salvando ? 0.6 : 1,
                  cursor:
                    salvo || !nome.trim() || salvando
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {salvando
                  ? "💾 Salvando..."
                  : salvo
                  ? "✅ Salvo"
                  : t("score", "confirm")}
              </button>
            </div>

            {mensagemSalvar && (
              <div
                style={{
                  marginTop: "0.5rem",
                  padding: "0.5rem",
                  borderRadius: "5px",
                  fontSize: "0.9rem",
                  backgroundColor: mensagemSalvar.includes("❌")
                    ? "#ffebee"
                    : "#e8f5e8",
                  color: mensagemSalvar.includes("❌") ? "#c62828" : "#2e7d32",
                  border: `1px solid ${
                    mensagemSalvar.includes("❌") ? "#ef5350" : "#4caf50"
                  }`,
                }}
              >
                {mensagemSalvar}
              </div>
            )}

            {salvo && !mensagemSalvar && (
              <span className="modelscore-saved-msg">
                ✅ {t("score", "saved")}
              </span>
            )}
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
