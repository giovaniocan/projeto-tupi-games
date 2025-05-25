# 🎮 Tupi Games - Backend API

Sistema de gerenciamento de jogos com temática brasileira.

## 🛠 Stack Tecnológica

- **Java 17** + **Spring Boot 3.4.6**
- **MySQL 8.0** + **Flyway** (migrations)
- **Docker** + **Docker Compose**
- **Maven** para build

## 🚀 Como Rodar

### Desenvolvimento (Recomendado)
```bash
# 1. Subir apenas MySQL
docker-compose up mysql-db

# 2. Rodar backend no IntelliJ
# - Importar projeto Maven
# - Run ManduaIntegradorApplication
# - Backend: http://localhost:8080
```

### Tudo Containerizado
```bash
# 1. Descomentar seção 'backend' no docker-compose.yml
# 2. Subir tudo
docker-compose up --build
```

## 🧪 Testando

### Endpoints disponíveis:
- `GET /api/hello` - Teste básico

### Como testar o banco de dados:
```bash
docker exec -it mysql-container mysql -u root -p
# Senha: root
# Database: tupi-games
```

## 🗄️ Banco de Dados

### Migrations (Flyway)
- `V1__Create_initial_tables.sql` - Tabelas: users, games, reviews
- `V2__Insert_sample_data.sql` - Dados de exemplo

### Configuração inteligente:
- **Desenvolvimento:** `localhost:3307` (container MySQL)
- **Container:** `mysql-db:3306` (rede Docker)

## 📋 Estrutura

```
projeto-tupi-games/
├── backend/
│   ├── src/main/
│   │   ├── java/com/bioapark/demo/
│   │   └── resources/
│   │       ├── application.properties
│   │       └── db/migration/
├── docker-compose.yml
└── README.md
```

## ⚙️ Configuração

### application.properties
```properties
# Funciona local E container automaticamente
spring.datasource.url=jdbc:mysql://${MYSQL_HOST:localhost}:${MYSQL_PORT:3307}/tupi-games
spring.jpa.hibernate.ddl-auto=validate
spring.flyway.enabled=true
```

### docker-compose.yml
- MySQL na porta `3307`
- Backend comentado (para desenvolvimento)
- Flyway roda automaticamente

## 🔧 Comandos Úteis

```bash
# Parar containers
docker-compose down

# Ver logs
docker logs mysql-container

# Rebuild completo
docker-compose down
docker-compose up --build

# Limpar volumes (⚠️ perde dados)
docker volume rm projeto-tupi-games_mysql_data
```

## 🎯 Fluxo de Desenvolvimento

1. **MySQL no container** (sempre ligado)
2. **Backend no IntelliJ** (hot reload)
3. **Migrations automáticas** via Flyway
4. **Para testar produção:** descomentar backend no docker-compose
