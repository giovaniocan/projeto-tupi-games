import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import './Instrucoes.css';
import { useLanguage } from '../languageContext';

const Instrucoes = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="instrucoes-container">
      <button className="btn-voltar" onClick={() => navigate('/')}>
        {t("difficulty", "back")}
      </button>
      <Card
        className="card-secundario"
        title={t("instructions", "title") || "Instruções"}
        subtitle={t("instructions", "text")}
        buttons={[]}
      />
    </div>
  );
};

export default Instrucoes;
