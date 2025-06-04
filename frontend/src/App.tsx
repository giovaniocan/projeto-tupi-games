// App.tsx
import { AppRoutes } from "./routes";
import { BackgroundImage } from './components/BackgroundImage';
import { LanguageProvider } from './languageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <BackgroundImage />
        <img src="./assets/imagemFundo.png" alt="" />
        <div className="relative z-10 min-h-screen">
          <AppRoutes />
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;