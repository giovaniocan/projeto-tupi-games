// frontend/src/pages/Ranking.tsx
import React, { useState, useEffect } from "react";
import "./Ranking.css";
import { useNavigate } from "react-router-dom";
import { ScoreService } from "../services/scoreService";
import { Score } from "../types/backend-types";

export const Ranking: React.FC = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Score[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string>("");

  // Carrega os scores quando o componente monta
  useEffect(() => {
    const carregarRanking = async () => {
      setCarregando(true);
      setErro("");

      try {
        console.log("🏆 Carregando ranking...");
        const top10 = await ScoreService.getTop10Scores();
        setPlayers(top10);
        console.log(`✅ Ranking carregado com ${top10.length} scores`);
      } catch (error: any) {
        console.error("❌ Erro ao carregar ranking:", error);
        setErro("Erro ao carregar ranking. Usando dados locais.");
      } finally {
        setCarregando(false);
      }
    };

    carregarRanking();
  }, []);

  const formatarTempo = (createdAt?: string): string => {
    if (!createdAt) return "00:00:00";

    try {
      const data = new Date(createdAt);
      return data.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } catch {
      return "00:00:00";
    }
  };

  const formatarScore = (score: number): string => {
    return score.toString().padStart(7, "0");
  };

  const handleBack = () => {
    navigate(-1); // Navega para a página anterior
  };

  return (
    <div className="ranking-wrapper">
      <button className="back-button" onClick={handleBack}>
        Voltar
      </button>

      <div className="ranking-container">
        <h1 className="ranking-title">Ranking</h1>

        {/* Loading state */}
        {carregando && (
          <div className="ranking-loading">
            <p>🏆 Carregando ranking...</p>
            <p>Conectando com o servidor...</p>
          </div>
        )}

        {/* Error state */}
        {erro && (
          <div className="ranking-error">
            <p>⚠️ {erro}</p>
          </div>
        )}

        {/* Ranking table */}
        {!carregando && (
          <div className="ranking-table">
            <div className="ranking-header">
              <span>Nome</span>
              <span>Score</span>
            </div>

            {players.length === 0 ? (
              <div className="ranking-empty">
                <p>🎮 Nenhum score encontrado ainda!</p>
                <p>Seja o primeiro a jogar e aparecer no ranking!</p>
              </div>
            ) : (
              players.map((player, index) => (
                <div className="ranking-row" key={player.id || index}>
                  <div className="player-name">
                    #{index + 1} {player.playerName}
                  </div>
                  <div className="player-score">
                    PONTOS: {formatarScore(player.scoreValue)} &nbsp;&nbsp;
                    HORA: {formatarTempo(player.createdAt)}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
