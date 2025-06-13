// src/services/api.ts - Versão aprimorada
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  timeout: 10000, // 10 segundos de timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para requests (logs de debug)
api.interceptors.request.use(
  (config) => {
    console.log(
      `🚀 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`
    );
    if (config.data) {
      console.log("📤 Dados enviados:", config.data);
    }
    return config;
  },
  (error) => {
    console.error("❌ Erro na requisição:", error);
    return Promise.reject(error);
  }
);

// Interceptor para responses (logs de debug e tratamento de erros)
api.interceptors.response.use(
  (response) => {
    console.log(
      `✅ ${response.status} ${response.config.method?.toUpperCase()} ${
        response.config.url
      }`
    );
    if (response.data) {
      console.log("📥 Dados recebidos:", response.data);
    }
    return response;
  },
  (error) => {
    if (error.response) {
      // Erro com resposta do servidor
      console.error(
        `❌ ${error.response.status} ${error.config?.method?.toUpperCase()} ${
          error.config?.url
        }`
      );
      console.error("📥 Erro do servidor:", error.response.data);
    } else if (error.request) {
      // Erro de rede (sem resposta)
      console.error(
        "🌐 Erro de rede - Sem resposta do servidor:",
        error.request
      );
    } else {
      // Erro na configuração da requisição
      console.error("⚙️ Erro na configuração:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
