# 🎮 Tupi Games - Sistema Completo

Jogo da Memória Bilíngue (Português/Guarani) com temática da cultura brasileira indígena.

## 🛠️ Stack Tecnológica

### **Backend**

- **Java 17** + **Spring Boot 3.4.6**
- **MySQL 8.0** + **Flyway** (migrations)
- **Maven** para build

### **Frontend**

- **React 18** + **TypeScript**
- **Vite** para build
- **Nginx** para produção

### **DevOps**

- **Docker** + **Docker Compose**

## 🚀 Como Rodar

### **Pré-requisitos**

- Docker >= 20.10.0
- Docker Compose >= 2.0.0

### **🎯 Produção Completa (Recomendado)**

```bash
# 1. Clonar repositório
git clone <repo-url>
cd projeto-tupi-games

# 2. Executar todos os serviços
docker-compose up --build

# 3. Acessar aplicação
# Frontend: http://localhost:3000
# Backend:  http://localhost:8080/api
# MySQL:    localhost:3307
```

### **🔧 Desenvolvimento**

```bash
# 1. Subir apenas MySQL
docker-compose up mysql-db

# 2. Backend (IntelliJ/IDE)
cd backend
./mvnw spring-boot:run

# 3. Frontend (terminal separado)
cd frontend
npm install && npm run dev
```

## 🧪 Testando

### **Endpoints Principais**

- `GET /api/hello` - Health check
- `GET /api/cards/{quantity}` - Buscar cartas
- `GET /api/scores/top10` - Ranking
- `POST /api/scores` - Salvar pontuação

### **Acesso ao Banco**

```bash
docker exec -it tupi-games-mysql mysql -u root -p
# Senha: root
# Database: tupi-games
```

## 📂 Estrutura do Projeto

```
projeto-tupi-games/
├── frontend/                 # React/TypeScript
│   ├── src/
│   │   ├── components/       # Componentes
│   │   ├── pages/           # Páginas
│   │   └── services/        # API calls
│   ├── Dockerfile
│   └── nginx.conf
├── backend/                  # Spring Boot
│   ├── src/main/java/       # Código Java
│   │   └── com/bioapark/demo/
│   │       ├── controller/   # REST APIs
│   │       ├── model/       # Entidades
│   │       └── service/     # Lógica de negócio
│   ├── src/main/resources/
│   │   └── db/migration/    # Scripts Flyway
│   └── Dockerfile
└── docker-compose.yml       # Orquestração
```

## ⚙️ Configuração

### **Variáveis de Ambiente**

| Variável         | Padrão      | Descrição   |
| ---------------- | ----------- | ----------- |
| `MYSQL_HOST`     | `localhost` | Host MySQL  |
| `MYSQL_PORT`     | `3307`      | Porta MySQL |
| `MYSQL_USER`     | `root`      | Usuário     |
| `MYSQL_PASSWORD` | `root`      | Senha       |

### **Banco de Dados**

- **Migrations**: Scripts Flyway automáticos
- **Tabelas**: `cards` (cartas do jogo), `scores` (pontuações)
- **Dados**: 38 cartas pré-carregadas (português/guarani)

## 🔧 Comandos Úteis

```bash
# Gerenciamento
docker-compose up -d              # Subir em background
docker-compose down               # Parar tudo
docker-compose logs -f            # Ver logs
docker-compose build --no-cache   # Rebuild forçado

# Debug
docker-compose ps                 # Status containers
docker exec -it tupi-games-backend bash  # Entrar no backend
docker exec -it tupi-games-frontend sh   # Entrar no frontend

# Limpeza (⚠️ APAGA DADOS)
docker-compose down -v
docker volume prune -f
```

## 🐛 Troubleshooting

### **Portas Ocupadas**

```bash
sudo lsof -ti:3000 | xargs kill -9  # Frontend
sudo lsof -ti:8080 | xargs kill -9  # Backend
sudo lsof -ti:3307 | xargs kill -9  # MySQL
```

### **Problemas de Conexão**

```bash
# Verificar containers
docker-compose ps

# Recrear banco
docker-compose down -v
docker-compose up mysql-db

# Rebuild completo
docker-compose down
docker-compose up --build
```

## 🎯 Fluxo de Desenvolvimento

1. **Setup**: `docker-compose up --build`
2. **Dev**: MySQL no Docker + Backend/Frontend local
3. **Teste**: Sistema completo dockerizado
4. **Deploy**: Push para produção

---

**Sobre o Dockerfile do Backend**: O arquivo atual já funciona, mas se quiser otimizar, pode usar a versão melhorada fornecida anteriormente com multi-stage build e curl para healthcheck.
