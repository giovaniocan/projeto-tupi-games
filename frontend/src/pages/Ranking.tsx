import React from 'react';
// Importa o arquivo CSS com os estilos específicos para o componente
import './Ranking.css';
// Importa o hook 'useNavigate' do React Router para navegação programática entre páginas
import { useNavigate } from 'react-router-dom';

// Define o tipo (interface) dos dados de um jogador
type Player = {
  name: string;
  score: number;
  time: string;
};

export const Ranking: React.FC = () => {
  // Hook usado para redirecionar o usuário para outra rota (página)
  const navigate = useNavigate();

  // Lista de jogadores com nome, pontuação e tempo — usada para simular dados dinâmicos
  const players: Player[] = [
    { name: 'FULANO 1', score: 888888, time: '01:30:04' },
    { name: 'FULANO 2', score: 777777, time: '01:30:04' },
    { name: 'FULANO 3', score: 555555, time: '01:30:04' },
    { name: 'FULANO 4', score: 222222, time: '01:30:04' },
    { name: 'FULANO 5', score: 111111, time: '01:30:04' },
    { name: 'FULANO 6', score: 0, time: '01:30:04' },
  ];

  const handleBack = () => {
    navigate(-1); // Navega para a página anterior
  };

  // JSX que renderiza o componente na tela
  return (
    <div className="ranking-wrapper">
      {}
      <button className="back-button" onClick={handleBack}>Voltar</button>

      {/* Card principal */}
      <div className="ranking-container">
        <h1 className="ranking-title">Ranking</h1>

        {/* Tabela visual do ranking com cabeçalho e jogadores */}
        <div className="ranking-table">
          <div className="ranking-header">
            {/* Cabeçalhos das colunas: Nome e Pontuação */}
            <span>Nome</span>
            <span>Score</span>
          </div>

          {/* Renderiza dinamicamente cada jogador da lista */}
          {players.map((player, index) => (
            <div className="ranking-row" key={index}>
              {/* Nome do jogador */}
              <div className="player-name">{player.name}</div>
              {/* Pontuação*/}
              <div className="player-score">
                PONTOS: {player.score.toString().padStart(7, '0')} &nbsp;&nbsp;
                TEMPO: {player.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
