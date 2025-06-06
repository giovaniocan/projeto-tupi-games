// frontend/src/pages/ModelScore.tsx
import React, { useState } from "react";
import { Button } from "../components/Button";
import "./ModelScore.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../languageContext";
import { ScoreService } from "../services/scoreService";
import { ScoreDTO } from "../types/backend-types";

const ModelScore = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const { dificuldade, tempo, jogadas, pontuacao } = location.state || {};

  const [nome, setNome] = useState("");
  const [salvo, setSalvo] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  const gameStats = {
    difficulty: dificuldade || "desconhecido",
    time: tempo || 0,
    moves: jogadas || 0,
    score: pontuacao || 0,
  };

  const formatarTempo = (segundos: number): string => {
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${minutos}:${segs.toString().padStart(2, "0")}`;
  };

  const salvarScore = async () => {
    if (!nome.trim()) {
      setMensagemErro("Nome é obrigatório");
      return;
    }

    const scoreData: ScoreDTO = {
      playerName: nome.trim(),
      scoreValue: gameStats.score,
    };

    // Validação antes de enviar
    const erroValidacao = ScoreService.validateScore(scoreData);
    if (erroValidacao) {
      setMensagemErro(erroValidacao);
      return;
    }

    setSalvando(true);
    setMensagemErro("");

    try {
      console.log("💾 Salvando score:", scoreData);

      const response = await ScoreService.submitScore(scoreData);

      console.log("✅ Resposta do servidor:", response.message);
      setSalvo(true);
      setMensagemErro(""); // Limpa qualquer erro anterior
    } catch (error: any) {
      console.error("❌ Erro ao salvar score:", error);
      setMensagemErro("Erro ao salvar. Tente novamente.");
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
      onClick: () => navigate("/"),
    },
  ];

  return (
    <div className="modelscore-bg-center">
      <div className="modelscore-card">
        <h1 className="modelscore-title">{t("score", "congrats")}</h1>

        <div className="modelscore-info">
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
              onChange={(e) => {
                setNome(e.target.value);
                setMensagemErro(""); // Limpa erro ao digitar
              }}
              className="modelscore-input"
              disabled={salvo || salvando}
              maxLength={100}
            />
            <button
              onClick={salvarScore}
              className="modelscore-save-btn"
              disabled={salvo || salvando || !nome.trim()}
            >
              {salvando ? "Salvando..." : t("score", "confirm")}
            </button>
          </div>

          {/* Mensagens de feedback */}
          {salvo && (
            <span className="modelscore-saved-msg">
              ✅ {t("score", "saved")}
            </span>
          )}
          {mensagemErro && (
            <span className="modelscore-error-msg">❌ {mensagemErro}</span>
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
  );
};

export default ModelScore;
