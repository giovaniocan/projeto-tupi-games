// pages/Idioma.tsx
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { useLanguage } from '../languageContext';
import './Idioma.css';

export const Idioma = () => {
  const navigate = useNavigate();
  const { setLanguage, t } = useLanguage(); // pega função de tradução e setter do idioma

  const handleIdiomaClick = (idioma: "pt" | "gn") => {
    setLanguage(idioma);        // troca o idioma
    navigate('/');              // volta para a tela inicial
  };

  return (
    <div className="idioma-container">
      <button className="btn-voltar" onClick={() => navigate('/')}>
        {t("difficulty", "back")} {/* usando tradução para "Voltar" */}
      </button>
      <Card
        title={t("home", "title")} // "Mandu’a"
        subtitle={t("language", "select")} // "Altere o Idioma"
        buttons={[
          {
            text: t("language", "portuguese"),
            color: 'green',
            onClick: () => handleIdiomaClick('pt')
          },
          {
            text: t("language", "guarani"),
            color: 'blue',
            onClick: () => handleIdiomaClick('gn')
          }
        ]}
      />
    </div>
  );
};
