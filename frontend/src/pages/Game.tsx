import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card } from "../components/Card";
import CartaJogo from "../components/CartaJogo";
import "./Game.css";
import ModelScore from "../components/ModelScore";
import { CardService } from "../services/cardService";
import { ScoreService } from "../services/scoreService";
import { Card as BackendCard, Score } from "../types/backend-types";

export const Game = () => {
  const { nivel } = useParams();
  const navigate = useNavigate();

  const [mostrarScore, setMostrarScore] = useState(false);

  interface CartaJogoData {
    id: number;
    nome: string;
    imagem: string;
    virada: boolean;
    encontrada: boolean;
    par: number;
  }

  // Estados do jogo
  const [cartas, setCartas] = useState<CartaJogoData[]>([]);
  const [cartasViradas, setCartasViradas] = useState<number[]>([]);
  const [tentativas, setTentativas] = useState<number>(0);
  const [pontuacao, setPontuacao] = useState<number>(1000);
  const [jogoCompleto, setJogoCompleto] = useState<boolean>(false);
  const [tempoJogo, setTempoJogo] = useState<number>(0);

  // Estados para dados do backend
  const [ranking, setRanking] = useState<Score[]>([]);
  const [loadingCards, setLoadingCards] = useState<boolean>(true);
  const [loadingRanking, setLoadingRanking] = useState<boolean>(true);

  // Configuração da dificuldade
  let numeroCartas = 30;
  const nivelNormalizado = (nivel || "").toLowerCase().trim();
  if (nivelNormalizado === "fácil") {
    numeroCartas = 16;
  } else if (nivelNormalizado === "médio") {
    numeroCartas = 24;
  } else if (nivelNormalizado === "difícil") {
    numeroCartas = 30;
  }

  // Buscar cartas do backend quando o componente carrega
  useEffect(() => {
    const buscarCartas = async () => {
      try {
        setLoadingCards(true);
        console.log(`🎴 Buscando ${numeroCartas / 2} cartas...`);

        // Chama o service diretamente
        const cartasBackend = await CardService.getCards(numeroCartas / 2);

        // Criar pares de cartas (português + tupi)
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

        // Configurar estado das cartas
        const cartasEstado: CartaJogoData[] = todas.map((carta, idx) => ({
          id: idx,
          nome: carta.nome,
          imagem: carta.imagem,
          virada: false,
          encontrada: false,
          par: carta.par,
        }));

        setCartas(cartasEstado);
        console.log("✅ Cartas carregadas!");
      } catch (error) {
        console.error("❌ Erro ao buscar cartas:", error);
      } finally {
        setLoadingCards(false);
      }
    };

    buscarCartas();
  }, [nivel, numeroCartas]);

  // Buscar ranking do backend
  useEffect(() => {
    const buscarRanking = async () => {
      try {
        setLoadingRanking(true);
        console.log("🏆 Buscando ranking...");

        // Chama o service diretamente
        const rankingBackend = await ScoreService.getTop10Scores();
        setRanking(rankingBackend);

        console.log("✅ Ranking carregado!");
      } catch (error) {
        console.error("❌ Erro ao buscar ranking:", error);
      } finally {
        setLoadingRanking(false);
      }
    };

    buscarRanking();
  }, []);

  // Reset do jogo quando muda nível
  useEffect(() => {
    setCartasViradas([]);
    setTentativas(0);
    setPontuacao(1000);
    setJogoCompleto(false);
    setTempoJogo(0);
  }, [nivel]);

  // Timer do jogo
  useEffect(() => {
    if (jogoCompleto || loadingCards) return;
    const timer = setInterval(() => {
      setTempoJogo((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [jogoCompleto, loadingCards]);

  // Mostrar modal de score quando jogo termina
  useEffect(() => {
    if (jogoCompleto) {
      setMostrarScore(true);
    }
  }, [jogoCompleto]);

  // Lógica do jogo (não mudou)
  const virarCarta = (id: number) => {
    if (
      cartasViradas.length === 2 ||
      cartas[id].virada ||
      cartas[id].encontrada
    )
      return;

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
    if (
      novasCartas[id1].par === novasCartas[id2].par &&
      novasCartas[id1].id !== novasCartas[id2].id
    ) {
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

  // Tela de loading
  if (loadingCards) {
    return (
      <div className="game-container">
        <button className="btn-voltar" onClick={() => navigate("/")}>
          Voltar
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
        Voltar
      </button>
      <div className="game-content">
        {/* Tabuleiro do jogo */}
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

        {/* Ranking lateral */}
        <Card className="game-ranking-container">
          <h1 className="ranking-title">Ranking</h1>
          <div className="ranking-header">
            <div className="ranking-header-nome">NOME</div>
            <div className="ranking-header-pontos">PONTOS</div>
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

      {/* Informações do jogo */}
      <div className="game-info">
        <Card className="tentativas">Tentativas: {tentativas}</Card>
        <Card className="pontuacao">Pontuação: {pontuacao}</Card>
        <Card className="tempo">Tempo: {formatarTempo(tempoJogo)}</Card>
      </div>

      {/* Modal de score */}
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
