// JOAO - 18/05
import './Button.css'; 

// Define o componente Button
interface ButtonProps {
  text: string; // Texto do botão
  color: 'green' | 'blue' | 'yellow' | 'brown'; // Cores disponíveis para o botão
  onClick?: () => void; // Evento a ser chamada ao clicar no botão 
  className?: string; // Classe CSS adicional para o botão
}

export const Button = ({ text, color, onClick, className }: ButtonProps) => {
  const buttonClass = `button button-${color}${className ? ` ${className}` : ''}`; 
  // Inclui cor e className extra
  return (
    <button 
      className={buttonClass}
      onClick={onClick}
    >
      {text}
    </button>
  );
};