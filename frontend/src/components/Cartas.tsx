import './Cartas.css'; 

interface CartasProps {
  conteudo: string; 
  onClick?: () => void; 
}

export const Cartas = ({ conteudo, onClick }: CartasProps) => {
  return (
    <div className="cartas" onClick={onClick}>
      {conteudo}
    </div>
  );
};

export default Cartas;