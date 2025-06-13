import React, { useEffect, useState } from "react";
import "./Ranking.css";
import { useNavigate } from "react-router-dom";
import { ScoreService } from "../services/scoreService";
import { Score } from "../types/backend-types";

export const Ranking: React.FC = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Score[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const buscarRanking = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("🏆 Buscando ranking do backend...");

        const rankingData = await ScoreService.getTop10Scores();
        console.log("📊 Ranking recebido:", rankingData);

        setPlayers(rankingData);
      } catch (err) {
        console.error("❌ Erro ao buscar ranking:", err);
        setError("Erro ao carregar o ranking. Tentando novamente...");

        // Tenta novamente após 2 segundos em caso de erro
        setTimeout(async () => {
          try {
            const rankingData = await ScoreService.getTop10Scores();
            setPlayers(rankingData);
            setError(null);
          } catch (retryErr) {
            console.error("❌ Erro na segunda tentativa:", retryErr);
            setError("Não foi possível carregar o ranking.");
          }
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    buscarRanking();
  }, []);

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div className="ranking-wrapper">
      <button className="btn-voltar" onClick={() => navigate("/")}>
        Voltar
      </button>

      <div className="ranking-container">
        <h1 className="ranking-title">Ranking</h1>

        <div className="ranking-table">
          <div className="ranking-header">
            <span>Nome</span>
            <span>Score</span>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <h3>🏆 Carregando ranking...</h3>
              <p>Aguarde enquanto buscamos os melhores jogadores.</p>
            </div>
          ) : error ? (
            <div
              style={{ textAlign: "center", padding: "2rem", color: "#e74c3c" }}
            >
              <h3>⚠️ {error}</h3>
              <button
                onClick={() => window.location.reload()}
                style={{
                  marginTop: "1rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#3498db",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                🔄 Tentar Novamente
              </button>
            </div>
          ) : players.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <h3>🎮 Nenhum score encontrado</h3>
              <p>Seja o primeiro a jogar e aparecer no ranking!</p>
              <button
                onClick={() => navigate("/jogo")}
                style={{
                  marginTop: "1rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#27ae60",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                🎯 Jogar Agora
              </button>
            </div>
          ) : (
            players.map((player, index) => (
              <div className="ranking-row" key={player.id || index}>
                <div className="player-name">
                  {index + 1}º {player.playerName}
                </div>
                <div className="player-score">
                  PONTOS: {player.scoreValue.toString().padStart(6, "0")}
                </div>
              </div>
            ))
          )}
        </div>

        {!loading && !error && players.length > 0 && (
          <div
            style={{
              textAlign: "center",
              marginTop: "1rem",
              fontSize: "0.9rem",
              color: "#666",
            }}
          >
            <p>🔄 Última atualização: {new Date().toLocaleTimeString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};
