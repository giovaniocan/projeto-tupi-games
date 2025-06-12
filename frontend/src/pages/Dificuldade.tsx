import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { useLanguage } from '../languageContext';
import './Dificuldade.css';

export const Dificuldade = () => {
  const [dificuldadeSelecionada, setDificuldadeSelecionada] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleClick = (nivel: string) => {
    setDificuldadeSelecionada(nivel);
    navigate(`/jogo/${nivel}`);
  };

  return (
    <div className="dificuldade-container">
      <button className="btn-voltar" onClick={() => navigate('/')}>
        {t('difficulty', 'back')}
      </button>
      <Card
        title="Mandu'a"
        subtitle={t('difficulty', 'selectDifficulty') ?? "Escolha a dificuldade do jogo"}
        buttons={[
          {
            text: t('difficulty', 'easy') + ' (4X4)',
            color: 'green',
            onClick: () => handleClick('Fácil'),
          },
          {
            text: t('difficulty', 'medium') + ' (4X6)',
            color: 'blue',
            onClick: () => handleClick('Médio'),
          },
          {
            text: t('difficulty', 'hard') + ' (5X6)',
            color: 'brown',
            onClick: () => handleClick('Difícil'),
          },
        ]}
      />
    </div>
  );
};
