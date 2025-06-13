//Background.tsx
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import './Background.css';
import { Volume2, VolumeX } from 'lucide-react'; // ícones de som

type BackgroundProps = {
  children: ReactNode;
};

export const Background: React.FC<BackgroundProps> = ({ children }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;

    if (video) {
      video.muted = true;
      video.play().catch((err) => {
        console.warn('Erro ao iniciar vídeo:', err);
      });
    }

    if (audio) {
      console.log('Tentando reproduzir áudio...');
      audio.volume = 1;
      audio.play().catch((err) => {
        console.warn('Autoplay de áudio bloqueado:', err);
      });
    }
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.muted = false;
      audioRef.current.play().catch((err) => {
        console.warn('Erro ao reproduzir áudio:', err);
      });
    } else {
      audioRef.current.muted = true;
    }

    setIsMuted(!isMuted);
  };

  return (
    <div className="background-video-container">
      <video
        ref={videoRef}
        className="background-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/fundo.mp4" type="video/mp4" />
      </video>
      <audio
        ref={audioRef}
        src="/sounds/forest.mp3"
        loop
      />
      <div className="background-overlay"></div>
      <button className="mute-button" onClick={toggleMute}>
        {isMuted ? <VolumeX size={24} color="white" /> : <Volume2 size={24} color="white" />}
      </button>
      {children} {/* Renderiza os elementos filhos */}
    </div>
  );
};





