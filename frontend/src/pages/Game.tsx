import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card } from "../components/Card";
import CartaJogo from "../components/CartaJogo";
import "./Game.css";
import ModelScore from "../components/ModelScore";

export const Game = () => {
  const { nivel } = useParams();
  const navigate = useNavigate();

  const [mostrarScore, setMostrarScore] = useState(false);

  // Defina as cartas disponíveis
  const cartasDisponiveis = [
    {
      nomeTupi: "Ajaka",
      nomePortugues: "Cesto",
      imagem: "/src/assets/Imagens sem fundo/Ajaka.png",
    },
    {
      nomeTupi: "Ava",
      nomePortugues: "Indios",
      imagem: "/src/assets/Imagens sem fundo/Ava.png",
    },
    {
      nomeTupi: "Boto",
      nomePortugues: "Boto",
      imagem: "/src/assets/Imagens sem fundo/Boto.png",
    },
    {
      nomeTupi: "Enéma",
      nomePortugues: "Joaninha",
      imagem: "/src/assets/Imagens sem fundo/Enéma.png",
    },
    {
      nomeTupi: "Girassol",
      nomePortugues: "Girassol",
      imagem: "/src/assets/Imagens sem fundo/girassol.png",
    },
    {
      nomeTupi: "Guaraná",
      nomePortugues: "Guaraná",
      imagem: "/src/assets/Imagens sem fundo/guarana.png",
    },
    {
      nomeTupi: "Guyra",
      nomePortugues: "Pássaro",
      imagem: "/src/assets/Imagens sem fundo/Guyra.png",
    },
    {
      nomeTupi: "Guyrapa",
      nomePortugues: "Arco e flecha",
      imagem: "/src/assets/Imagens sem fundo/Guyrapa.png",
    },
    {
      nomeTupi: "Hacha",
      nomePortugues: "Machado",
      imagem: "/src/assets/Imagens sem fundo/Hacha.png",
    },
    {
      nomeTupi: "Jaguarete",
      nomePortugues: "Onça",
      imagem: "/src/assets/Imagens sem fundo/Jaguarete.png",
    },
    {
      nomeTupi: "Jakare",
      nomePortugues: "Jacaré",
      imagem: "/src/assets/Imagens sem fundo/Jakare.png",
    },
    {
      nomeTupi: "Jasy",
      nomePortugues: "Lua",
      imagem: "/src/assets/Imagens sem fundo/Jasy.png",
    },
    {
      nomeTupi: "Ka_aguy",
      nomePortugues: "Floresta",
      imagem: "/src/assets/Imagens sem fundo/Ka_aguy.png",
    },
    {
      nomeTupi: "Kãguaa",
      nomePortugues: "Cocar",
      imagem: "/src/assets/Imagens sem fundo/Kãguaa.png",
    },
    {
      nomeTupi: "kapi_yva",
      nomePortugues: "Capivara",
      imagem: "/src/assets/Imagens sem fundo/kapi_yva.png",
    },
    {
      nomeTupi: "Kavaju",
      nomePortugues: "Cavalo",
      imagem: "/src/assets/Imagens sem fundo/Kavaju.png",
    },
    {
      nomeTupi: "Kuarahy",
      nomePortugues: "Sol",
      imagem: "/src/assets/Imagens sem fundo/Kuarahy.png",
    },
    {
      nomeTupi: "Kure",
      nomePortugues: "Porco",
      imagem: "/src/assets/Imagens sem fundo/Kure.png",
    },
    {
      nomeTupi: "Kururu",
      nomePortugues: "Sapo",
      imagem: "/src/assets/Imagens sem fundo/Kururu.png",
    },
    {
      nomeTupi: "Maino_i",
      nomePortugues: "Beija-Flor",
      imagem: "/src/assets/Imagens sem fundo/Maino_i.png",
    },
    {
      nomeTupi: "Manga",
      nomePortugues: "Peteca",
      imagem: "/src/assets/Imagens sem fundo/Manga.png",
    },
    {
      nomeTupi: "Mbói",
      nomePortugues: "Cobra",
      imagem: "/src/assets/Imagens sem fundo/Mbói.png",
    },
    {
      nomeTupi: "Mborevi",
      nomePortugues: "Anta",
      imagem: "/src/assets/Imagens sem fundo/Mborevi.png",
    },
    {
      nomeTupi: "Mburika_i",
      nomePortugues: "Burro",
      imagem: "/src/assets/Imagens sem fundo/Mburika_i.png",
    },
    {
      nomeTupi: "Mimbuku",
      nomePortugues: "Lança",
      imagem: "/src/assets/Imagens sem fundo/Mimbuku.png",
    },
    {
      nomeTupi: "Óga",
      nomePortugues: "Maloca",
      imagem: "/src/assets/Imagens sem fundo/O╠üga.png",
    },
    {
      nomeTupi: "Oka",
      nomePortugues: "Oca",
      imagem: "/src/assets/Imagens sem fundo/Oka.png",
    },
    {
      nomeTupi: "Panambi",
      nomePortugues: "Borboleta",
      imagem: "/src/assets/Imagens sem fundo/Panambi.png",
    },
    {
      nomeTupi: "Para",
      nomePortugues: "Mar",
      imagem: "/src/assets/Imagens sem fundo/Para.jpg",
    },
    {
      nomeTupi: "Pião",
      nomePortugues: "Pião",
      imagem: "/src/assets/Imagens sem fundo/piao.png",
    },
    {
      nomeTupi: "Pira",
      nomePortugues: "Peixe",
      imagem: "/src/assets/Imagens sem fundo/Pira.png",
    },
    {
      nomeTupi: "Tahýi",
      nomePortugues: "Formiga",
      imagem: "/src/assets/Imagens sem fundo/Tahýi.png",
    },
    {
      nomeTupi: "Tata",
      nomePortugues: "Fogueira",
      imagem: "/src/assets/Imagens sem fundo/Tata.png",
    },
    {
      nomeTupi: "Uru",
      nomePortugues: "Galinha",
      imagem: "/src/assets/Imagens sem fundo/Uru.png",
    },
    {
      nomeTupi: "vaka",
      nomePortugues: "Vaca",
      imagem: "/src/assets/Imagens sem fundo/vaka.png",
    },
    {
      nomeTupi: "Ysyry",
      nomePortugues: "Rio",
      imagem: "/src/assets/Imagens sem fundo/Ysyry.png",
    },
    {
      nomeTupi: "Yya",
      nomePortugues: "Barco",
      imagem: "/src/assets/Imagens sem fundo/Yya.png",
    },
    {
      nomeTupi: "Zarabatana",
      nomePortugues: "Zarabatana",
      imagem: "/src/assets/Imagens sem fundo/zarabatana.png",
    },
  ];

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

  const ranking = Array(10).fill({ name: "Jogador", score: 1000 });

  // Dificuldade - Corrigindo a lógica de normalização
  let numeroCartas = 16;
  let colunas = 4;

  // Normalização do nível para match com os valores que vêm da URL
  const nivelNormalizado = (nivel || "").toLowerCase();

  if (nivelNormalizado === "fácil" || nivelNormalizado === "facil") {
    numeroCartas = 16;
    colunas = 4;
  } else if (nivelNormalizado === "médio" || nivelNormalizado === "medio") {
    numeroCartas = 24;
    colunas = 6;
  } else if (nivelNormalizado === "difícil" || nivelNormalizado === "dificil") {
    numeroCartas = 30;
    colunas = 6;
  }

  useEffect(() => {
    const cartasNivel = cartasDisponiveis.slice(0, numeroCartas / 2);

    // Para cada carta, cria um par: uma em tupi, outra em português
    let todas = cartasNivel
      .flatMap((carta, idx) => [
        {
          id: idx + Math.random(),
          nome: carta.nomeTupi,
          imagem: carta.imagem,
          par: idx,
        },
        {
          id: idx + 0.5 + Math.random(),
          nome: carta.nomePortugues,
          imagem: carta.imagem,
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
    setCartasViradas([]);
    setTentativas(0);
    setPontuacao(1000);
    setJogoCompleto(false);
    setTempoJogo(0);
  }, [nivel, numeroCartas]);

  // Controle do tempo de jogo (timer)
  useEffect(() => {
    if (jogoCompleto) return;
    const timer = setInterval(() => {
      setTempoJogo((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [jogoCompleto]);

  // Redirecionamento automático ao completar o jogo
  useEffect(() => {
    if (jogoCompleto) {
      setMostrarScore(true);
    }
  }, [jogoCompleto]);

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

  return (
    <div className="game-container">
      <button className="back-button" onClick={() => navigate("/")}>
        Voltar
      </button>

      <div className="game-content">
        <div className={`game-board-container ${nivelNormalizado}`}>
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
        </div>

        <div className="game-ranking-container">
          <h1 className="ranking-title">Ranking</h1>
          <div className="ranking-header">
            <div className="ranking-header-nome">NOME</div>
            <div className="ranking-header-pontos">PONTOS</div>
          </div>
          <div className="ranking-list">
            {ranking.map((player, index) => (
              <div key={index} className="ranking-item">
                <div className="ranking-item-nome">{player.name}</div>
                <div className="ranking-item-pontos">{player.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="game-info">
        <div className="tentativas">Tentativas: {tentativas}</div>
        <div className="pontuacao">Pontuação: {pontuacao}</div>
        <div className="tempo">
          Tempo: {Math.floor(tempoJogo / 60)}:
          {(tempoJogo % 60).toString().padStart(2, "0")}
        </div>
      </div>

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
