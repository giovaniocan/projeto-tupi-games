  // pages/Home.tsx
  import { useNavigate } from 'react-router-dom';
  import { Card } from '../components/Card';
  import { useLanguage } from '../languageContext'; 
  import './Home.css';

  export const Home = () => {
    const navigate = useNavigate();
    const { t } = useLanguage(); 

    return (
      <div className="home-container">
        <Card
          title={t("home", "title")}         
          subtitle={t("home", "subtitle")}   
          buttons={[
            { 
              text: t("home", "play"),       
              color: 'green',
              onClick: () => navigate('/jogo')
            },
            { 
              text: t("home", "ranking"),    
              color: 'blue',
              onClick: () => navigate('/ranking')
            },
            { 
              text: t("home", "instructions"), 
              color: 'yellow',
              onClick: () => navigate('/instrucoes')
            },
            { 
              text: t("home", "language"),   
              color: 'brown',
              onClick: () => navigate('/idioma')
            }
          ]}
        />
      </div>
    );
  };
