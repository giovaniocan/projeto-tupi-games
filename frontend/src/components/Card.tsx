// components/Card.tsx
import { Button } from './Button';
import './Card.css';

interface CardProps {
  title?: string;
  subtitle?: string;
  buttons?: {
    text: string;
    color: 'green' | 'blue' | 'yellow' | 'brown';
    onClick?: () => void;
  }[];
  children?: React.ReactNode;
  className?: string;
}

export const Card = ({ title, subtitle, buttons, children, className = "" }: CardProps) => {
  return (
    <div className={`card ${className}`}>
      {title && <h1 className="card-title">{title}</h1>}
      {subtitle && <p className="card-subtitle">{subtitle}</p>}
      {children}
      {buttons && buttons.length > 0 && (
        <div className="card-buttons">
          {buttons.map((button, index) => (
            <Button 
              key={index} 
              text={button.text} 
              color={button.color} 
              onClick={button.onClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};