// components/AudioToggle.tsx
import { useState, useEffect } from 'react';

export const AudioToggle = () => {
  const [muted] = useState(false);

  useEffect(() => {
    const audio = document.querySelector('audio');
    if (audio) {
      audio.muted = muted;
      audio.volume = muted ? 0 : 1;
    }
  }, [muted]);

  return null; // O botão foi removido
};



