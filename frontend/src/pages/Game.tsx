// frontend/src/pages/Game.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card } from "../components/Card";
import CartaJogo from "../components/CartaJogo";
import { CardService } from "../services/cardService";
import { ScoreService } from "../services/scoreService";
import { Card as BackendCard, Score } from "../types/backend-types";
import "./Game.css";

interface CartaJogoData {
  id: number;
  nome: string;
  imagem: string;
  virada: boolean;
  encontrada: boolean;
  par: number;
}

export const Game = () => {
  const { nivel } = useParams();
  const navigate = useNavigate();

  const [cartas, setCartas] = useState<CartaJogoData[]>([]);
  const [cartasViradas, setCartasViradas] = useState<number[]>([]);
  const [tentativas, setTentativas] = useState<number>(0);
  const [pontuacao, setPontuacao] = useState<number>(1000);
  const [jogoCompleto, setJogoCompleto] = useState<boolean>(false);
  const [tempoJogo, setTempoJogo] = useState<number>(0);
  const [carregandoCartas, setCarregandoCartas] = useState<boolean>(true);
  const [ranking, setRanking] = useState<Score[]>([]);

  // Configuração de dificuldade
  let numeroCartas = 30;
  let colunas = 6;
  const nivelNormalizado = (nivel || "").toLowerCase().trim();

  if (nivelNormalizado === "facil") {
    numeroCartas = 16;
    colunas = 4;
  } else if (nivelNormalizado === "medio") {
    numeroCartas = 24;
    colunas = 6;
  } else if (nivelNormalizado === "dificil") {
    numeroCartas = 30;
    colunas = 6;
  }

  // Carrega cards do backend quando o componente monta
  useEffect(() => {
    const carregarCartas = async () => {
      setCarregandoCartas(true);

      try {
        // Busca cards do backend (ou fallback para mock)
        const cartasDoBackend = await CardService.getCards(numeroCartas / 2);

        // Converte os cards do backend para o formato do jogo
        const cartasConvertidas = cartasDoBackend
          .flatMap((carta: BackendCard, idx: number) => [
            {
              id: idx + Math.random(),
              nome: carta.nomeTupi,
              imagem:
                carta.imagemUrl || `/src/assets/Imagens sem fundo/default.png`,
              par: idx,
            },
            {
              id: idx + 0.5 + Math.random(),
              nome: carta.nomePortugues,
              imagem:
                carta.imagemUrl || `/src/assets/Imagens sem fundo/default.png`,
              par: idx,
            },
          ])
          .sort(() => Math.random() - 0.5); // Embaralha

        // Converte para o formato do estado
        const cartasEstado: CartaJogoData[] = cartasConvertidas.map(
          (carta, idx) => ({
            id: idx,
            nome: carta.nome,
            imagem: carta.imagem,
            virada: false,
            encontrada: false,
            par: carta.par,
          })
        );

        setCartas(cartasEstado);
        console.log(`🎮 Jogo iniciado com ${cartasEstado.length} cartas`);
      } catch (error) {
        console.error("❌ Erro ao carregar cartas:", error);
      } finally {
        setCarregandoCartas(false);
      }
    };

    carregarCartas();

    // Reset do estado quando muda de nível
    setCartasViradas([]);
    setTentativas(0);
    setPontuacao(1000);
    setJogoCompleto(false);
    setTempoJogo(0);
  }, [nivel, numeroCartas]);

  // Carrega ranking do backend
  useEffect(() => {
    const carregarRanking = async () => {
      const top10 = await ScoreService.getTop10Scores();
      setRanking(top10);
    };

    carregarRanking();
  }, []);

  // Controle do tempo de jogo
  useEffect(() => {
    if (jogoCompleto || carregandoCartas) return;

    const timer = setInterval(() => {
      setTempoJogo((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [jogoCompleto, carregandoCartas]);

  // Redirecionamento automático ao completar o jogo
  useEffect(() => {
    if (jogoCompleto) {
      navigate("/modelScore", {
        state: {
          dificuldade: nivelNormalizado,
          tempo: tempoJogo,
          jogadas: tentativas,
          pontuacao: pontuacao,
        },
      });
    }
  }, [
    jogoCompleto,
    navigate,
    nivelNormalizado,
    tempoJogo,
    tentativas,
    pontuacao,
  ]);

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

      if (novasCartas.every((c) => c.encontrada)) {
        setJogoCompleto(true);
      }
    } else {
      novasCartas[id1].virada = false;
      novasCartas[id2].virada = false;
      setPontuacao((prev) => Math.max(0, prev - 25));
    }

    setCartas(novasCartas);
    setCartasViradas([]);
  };

  // Loading state
  if (carregandoCartas) {
    return (
      <div className="game-container">
        <button className="btn-voltar" onClick={() => navigate("/")}>
          Voltar
        </button>
        <Card className="game-board-container">
          <div className="loading">
            <h2>🎴 Carregando cartas...</h2>
            <p>Conectando com o backend...</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="game-container">
      <button className="btn-voltar" onClick={() => navigate("/")}>
        Voltar
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

        <Card className="game-ranking-container">
          <h1 className="ranking-title">Ranking</h1>
          <div className="ranking-header">
            <div className="ranking-header-nome">NOME</div>
            <div className="ranking-header-pontos">PONTOS</div>
          </div>
          <div className="ranking-list">
            {ranking.map((player, index) => (
              <div key={index} className="ranking-item">
                <div className="ranking-item-nome">{player.playerName}</div>
                <div className="ranking-item-pontos">{player.scoreValue}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="game-info">
        <Card className="tentativas">Tentativas: {tentativas}</Card>
        <Card className="pontuacao">Pontuação: {pontuacao}</Card>
        <Card className="tempo">
          Tempo: {Math.floor(tempoJogo / 60)}:
          {(tempoJogo % 60).toString().padStart(2, "0")}
        </Card>
      </div>
    </div>
  );
};
