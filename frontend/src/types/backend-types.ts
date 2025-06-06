// frontend/src/types/backend.ts

// Interface para Card (baseada no modelo Card.java)
export interface Card {
  id: number;
  nomePortugues: string;
  nomeTupi: string;
  imagemUrl: string;
  createdAt: string; // LocalDateTime vem como string do backend
}

// Interface para Score (baseada no modelo Score.java)
export interface Score {
  id?: number;
  playerName: string;
  scoreValue: number;
  createdAt?: string;
}

// Interface para enviar score (baseada no ScoreDTO.java)
export interface ScoreDTO {
  playerName: string;
  scoreValue: number;
}

// Interface para resposta de submissão de score
export interface ScoreResponse {
  message: string;
}

// Interface para o jogo com estatísticas
export interface GameStats {
  difficulty: string;
  time: number;
  moves: number;
  score: number;
}
