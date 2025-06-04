import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import './Instrucoes.css';


const Instrucoes = () => {
  const navigate = useNavigate();

  return (
    <div className="instrucoes-container">
      <button className="btn-voltar" onClick={() => navigate('/')}>Voltar</button>
      <Card
        className="card-secundario"
        title="Instruções"
        subtitle={
          `Objetivo do jogo:
Encontre todos os pares de cartas iguais no menor tempo possível e com o menor número de tentativas.

Como jogar:
  1. Início do jogo:
     O tabuleiro começa com todas as cartas viradas para baixo.
  2. Sua jogada:
     Clique em duas cartas para revelá-las.
     • Se as cartas forem iguais, elas permanecem viradas para cima.
     • Se forem diferentes, elas serão viradas para baixo novamente após alguns segundos.
  3. Continue jogando até encontrar todos os pares.
  4. Fim de jogo:
     O jogo termina quando todos os pares forem encontrados.

Dicas:
  • Tente memorizar a posição das cartas para formar os pares mais rapidamente.
  • Preste atenção nas cartas que já foram reveladas.

Divirta-se e desafie sua memória! 🧠`
        }
        buttons={[]}
      />
    </div>
  );
};

export default Instrucoes;
