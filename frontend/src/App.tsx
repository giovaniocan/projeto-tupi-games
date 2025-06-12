import { AppRoutes } from "./routes";
import { Background } from './components/Background';
import { AudioToggle } from './components/AudioToggle';
import { LanguageProvider } from './languageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Background children={undefined} />

        <AudioToggle />
        <div className="relative z-10 min-h-screen">
          <AppRoutes />
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;

