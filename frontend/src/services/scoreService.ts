// frontend/src/services/scoreService.ts
import api from "./api";
import { Score, ScoreDTO, ScoreResponse } from "../types/backend-types";

export class ScoreService {
  /**
   * Submete um novo score para o backend
   * Endpoint: POST /api/scores
   */
  static async submitScore(scoreData: ScoreDTO): Promise<ScoreResponse> {
    try {
      console.log("📤 Enviando score para o backend:", scoreData);

      const response = await api.post<ScoreResponse>("/scores", scoreData);

      console.log("✅ Score enviado com sucesso:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("❌ Erro ao enviar score:", error);

      // Retorna uma resposta de erro
      return {
        message: "Erro ao salvar score. Tente novamente.",
      };
    }
  }

  /**
   * Busca o Top 10 scores do backend
   * Endpoint: GET /api/scores/top10
   */
  static async getTop10Scores(): Promise<Score[]> {
    try {
      console.log("📥 Buscando Top 10 scores do backend...");

      const response = await api.get<Score[]>("/scores/top10");

      console.log(`✅ Recebidos ${response.data.length} scores do backend`);
      return response.data;
    } catch (error: any) {
      console.error("❌ Erro ao buscar scores:", error);

      // Se der erro, retorna scores mockados como fallback
      console.log("🔄 Usando scores mockados como fallback...");
      return this.getMockScores();
    }
  }

  /**
   * Scores mockados como fallback caso o backend não funcione
   */
  private static getMockScores(): Score[] {
    return [
      {
        id: 1,
        playerName: "FULANO 1",
        scoreValue: 888888,
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        playerName: "FULANO 2",
        scoreValue: 777777,
        createdAt: new Date().toISOString(),
      },
      {
        id: 3,
        playerName: "FULANO 3",
        scoreValue: 555555,
        createdAt: new Date().toISOString(),
      },
      {
        id: 4,
        playerName: "FULANO 4",
        scoreValue: 222222,
        createdAt: new Date().toISOString(),
      },
      {
        id: 5,
        playerName: "FULANO 5",
        scoreValue: 111111,
        createdAt: new Date().toISOString(),
      },
      {
        id: 6,
        playerName: "FULANO 6",
        scoreValue: 0,
        createdAt: new Date().toISOString(),
      },
    ];
  }

  /**
   * Valida os dados do score antes de enviar
   */
  static validateScore(scoreData: ScoreDTO): string | null {
    if (!scoreData.playerName || scoreData.playerName.trim().length === 0) {
      return "Nome do jogador é obrigatório";
    }

    if (scoreData.playerName.trim().length > 100) {
      return "Nome muito longo (máximo 100 caracteres)";
    }

    if (scoreData.scoreValue < 0) {
      return "Score não pode ser negativo";
    }

    return null; // Validação passou
  }
}
