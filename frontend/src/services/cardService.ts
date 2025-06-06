// frontend/src/services/cardService.ts
import api from "./api";
import { Card } from "../types/backend-types";

export class CardService {
  /**
   * Busca cards do backend baseado na quantidade solicitada
   * Endpoint: GET /api/cards/{quantity}
   */
  static async getCards(quantity: number): Promise<Card[]> {
    try {
      console.log(`🎴 Buscando ${quantity} cards do backend...`);

      const response = await api.get<Card[]>(`/cards/${quantity}`);

      console.log(`✅ Recebidos ${response.data.length} cards do backend`);
      return response.data;
    } catch (error: any) {
      console.error("❌ Erro ao buscar cards:", error);

      // Se der erro, retorna cards mockados como fallback
      console.log("🔄 Usando cards mockados como fallback...");
      return this.getMockCards(quantity);
    }
  }

  /**
   * Cards mockados como fallback caso o backend não funcione
   * (mantém a mesma lógica que estava no CardController)
   */
  private static getMockCards(quantity: number): Card[] {
    const mockCards: Card[] = [];

    const nomesPortugues = [
      "Onça",
      "Jaguar",
      "Capivara",
      "Tucano",
      "Arara",
      "Boto",
      "Preguiça",
      "Tamandua",
      "Anta",
      "Quati",
      "Macaco",
      "Papagaio",
      "Jacaré",
      "Pirarucu",
    ];

    const nomesTupi = [
      "Jaguarete",
      "Jaguara",
      "Kapiwara",
      "Tukana",
      "Arara",
      "Boto",
      "Ai",
      "Tamanduá",
      "Tapira",
      "Kuati",
      "Káu",
      "Ajuru",
      "Jakaré",
      "Pirarucu",
    ];

    for (let i = 0; i < quantity && i < nomesPortugues.length; i++) {
      const index = i % nomesPortugues.length;

      mockCards.push({
        id: i + 1,
        nomePortugues: nomesPortugues[index],
        nomeTupi: nomesTupi[index],
        imagemUrl: `mock-image-${index}.jpg`,
        createdAt: new Date().toISOString(),
      });
    }

    console.log(`🎭 Gerados ${mockCards.length} cards mockados`);
    return mockCards;
  }

  /**
   * Testa se o backend está funcionando
   * Endpoint: GET /api/hello
   */
  static async testBackendConnection(): Promise<boolean> {
    try {
      const response = await api.get("/hello");
      console.log("✅ Backend conectado:", response.data);
      return true;
    } catch (error) {
      console.error("❌ Backend não conectado:", error);
      return false;
    }
  }
}
