import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card } from "../components/Card";
import CartaJogo from "../components/CartaJogo";
import "./Game.css";
import ModelScore from "../components/ModelScore";
import { CardService } from "../services/cardService";
import { ScoreService } from "../services/scoreService";
import { Card as BackendCard, Score } from "../types/backend-types";
import { useLanguage } from "../languageContext";
import translation from "../translation"; 

export const Game = () => {
  const { nivel } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage(); 
  const t = translation[language];    

  const [mostrarScore, setMostrarScore] = useState(false);

  interface CartaJogoData {
    id: number;
    nome: string;
    imagem: string;
    virada: boolean;
    encontrada: boolean;
    par: number;
  }

  const [cartas, setCartas] = useState<CartaJogoData[]>([]);
  const [cartasViradas, setCartasViradas] = useState<number[]>([]);
  const [tentativas, setTentativas] = useState<number>(0);
  const [pontuacao, setPontuacao] = useState<number>(1000);
  const [jogoCompleto, setJogoCompleto] = useState<boolean>(false);
  const [tempoJogo, setTempoJogo] = useState<number>(0);
  const [ranking, setRanking] = useState<Score[]>([]);
  const [loadingCards, setLoadingCards] = useState<boolean>(true);
  const [loadingRanking, setLoadingRanking] = useState<boolean>(true);

  let numeroCartas = 30;
  const nivelNormalizado = (nivel || "").toLowerCase().trim();
  if (nivelNormalizado === t.difficulty.easy.toLowerCase()) numeroCartas = 16;
  else if (nivelNormalizado === t.difficulty.medium.toLowerCase()) numeroCartas = 24;
  else if (nivelNormalizado === t.difficulty.hard.toLowerCase()) numeroCartas = 30;

  useEffect(() => {
    const buscarCartas = async () => {
      try {
        setLoadingCards(true);
        const cartasBackend = await CardService.getCards(numeroCartas / 2);

        let todas = cartasBackend
          .flatMap((carta: BackendCard, idx: number) => [
            {
              id: idx + Math.random(),
              nome: carta.nomeTupi,
              imagem: `/src/assets/Imagens sem fundo/${carta.imagemUrl}`,
              par: idx,
            },
            {
              id: idx + 0.5 + Math.random(),
              nome: carta.nomePortugues,
              imagem: `/src/assets/Imagens sem fundo/${carta.imagemUrl}`,
              par: idx,
            },
          ])
          .sort(() => Math.random() - 0.5);

        const cartasEstado: CartaJogoData[] = todas.map((carta, idx) => ({
          id: idx,
          nome: carta.nome,
          imagem: carta.imagem,
          virada: false,
          encontrada: false,
          par: carta.par,
        }));

        setCartas(cartasEstado);
      } catch (error) {
        console.error("Erro ao buscar cartas:", error);
      } finally {
        setLoadingCards(false);
      }
    };

    buscarCartas();
  }, [nivel, numeroCartas]);

  useEffect(() => {
    const buscarRanking = async () => {
      try {
        setLoadingRanking(true);
        const rankingBackend = await ScoreService.getTop10Scores();
        setRanking(rankingBackend);
      } catch (error) {
        console.error("Erro ao buscar ranking:", error);
      } finally {
        setLoadingRanking(false);
      }
    };

    buscarRanking();
  }, []);

  useEffect(() => {
    setCartasViradas([]);
    setTentativas(0);
    setPontuacao(1000);
    setJogoCompleto(false);
    setTempoJogo(0);
  }, [nivel]);

  useEffect(() => {
    if (jogoCompleto || loadingCards) return;
    const timer = setInterval(() => {
      setTempoJogo((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [jogoCompleto, loadingCards]);

  useEffect(() => {
    if (jogoCompleto) setMostrarScore(true);
  }, [jogoCompleto]);

  const virarCarta = (id: number) => {
    if (cartasViradas.length === 2 || cartas[id].virada || cartas[id].encontrada) return;

    const novasCartas = [...cartas];
    novasCartas[id].virada = true;
    setCartas(novasCartas);
    const novasViradas = [...cartasViradas, id];
    setCartasViradas(novasViradas);

    if (novasViradas.length === 2) {
      setTentativas((prev) => prev + 1);
      setTimeout(() => verificarPar(novasViradas), 900);
    }
  };

  const verificarPar = (ids: number[]) => {
    const [id1, id2] = ids;
    const novasCartas = [...cartas];
    if (novasCartas[id1].par === novasCartas[id2].par && novasCartas[id1].id !== novasCartas[id2].id) {
      novasCartas[id1].encontrada = true;
      novasCartas[id2].encontrada = true;
      setPontuacao((prev) => prev + 50);
      if (novasCartas.every((c) => c.encontrada)) setJogoCompleto(true);
    } else {
      novasCartas[id1].virada = false;
      novasCartas[id2].virada = false;
      setPontuacao((prev) => Math.max(0, prev - 25));
    }
    setCartas(novasCartas);
    setCartasViradas([]);
  };

  const formatarTempo = (segundos: number) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = (segundos % 60).toString().padStart(2, "0");
    return `${minutos}:${segundosRestantes}`;
  };

  if (loadingCards) {
    return (
      <div className="game-container">
        <button className="btn-voltar" onClick={() => navigate("/")}>
          {t.difficulty.back}
        </button>
        <div className="game-content">
          <Card className="game-board-container">
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <h2>🎴 Carregando jogo...</h2>
              <p>Aguarde enquanto preparamos as cartas.</p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <button className="btn-voltar" onClick={() => navigate("/")}>
        {t.difficulty.back}
      </button>
      <div className="game-content">
        <Card className={`game-board-container ${nivelNormalizado}`}>
          <div className={`game-board ${nivelNormalizado}`}>
            {cartas.map((carta, idx) => (
              <CartaJogo
                key={carta.id}
                imagem={carta.imagem}
                nome={carta.nome}
                virada={carta.virada || carta.encontrada}
                encontrada={carta.encontrada}
                correta={carta.encontrada}
                onClick={() => virarCarta(idx)}
              />
            ))}
          </div>
        </Card>

        {/* Ranking */}
        <Card className="game-ranking-container">
          <h1 className="ranking-title">{t.home.ranking}</h1>
          <div className="ranking-header">
            <div className="ranking-header-nome">{t.ranking.name}</div>
            <div className="ranking-header-pontos">{t.ranking.points}</div>
          </div>
          <div className="ranking-list">
            {loadingRanking ? (
              <div style={{ textAlign: "center", padding: "1rem" }}>
                <p>🏆 Carregando...</p>
              </div>
            ) : (
              ranking.map((player, index) => (
                <div key={player.id || index} className="ranking-item">
                  <div className="ranking-item-nome">{player.playerName}</div>
                  <div className="ranking-item-pontos">{player.scoreValue}</div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Info */}
      <div className="game-info">
        <Card className="tentativas">
          {t.game.try}s: {tentativas}
        </Card>
        <Card className="pontuacao">
          {t.game.score}: {pontuacao}
        </Card>
        <Card className="tempo">
          {t.ranking.time}: {formatarTempo(tempoJogo)}
        </Card>
      </div>

      {/* Modal */}
      {mostrarScore && (
        <ModelScore
          dificuldade={nivelNormalizado}
          tempo={tempoJogo}
          jogadas={tentativas}
          pontuacao={pontuacao}
          onClose={() => setMostrarScore(false)}
        />
      )}
    </div>
  );
};
