# Multi-stage build para otimizar o tamanho da imagem
FROM openjdk:17-jdk-slim as build

# Instalar Maven
RUN apt-get update && apt-get install -y maven

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos do Maven
COPY pom.xml .
COPY src ./src

# Build da aplicação
RUN mvn clean package -DskipTests

# Imagem final
FROM openjdk:17-jdk-slim

# Criar usuário não-root
RUN addgroup --system spring && adduser --system spring --ingroup spring

# Diretório de trabalho
WORKDIR /app

# Copiar JAR da fase de build
COPY --from=build /app/target/*.jar app.jar

# Mudar proprietário
RUN chown spring:spring app.jar

# Usuário
USER spring

# Porta
EXPOSE 8080

# Comando para executar
ENTRYPOINT ["java", "-jar", "app.jar"]