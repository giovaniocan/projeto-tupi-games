// backend/src/main/java/com/bioapark/demo/repository/ScoreRepository.java
package com.bioapark.demo.repository;

import com.bioapark.demo.model.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {

    /**
     * Busca os 10 maiores scores, ordenados do maior para o menor.
     * O Spring Data JPA cria a query automaticamente a partir do nome do método.
     * @return Uma lista com até 10 scores.
     */
    List<Score> findTop10ByOrderByScoreValueDesc();

    /**
     * Conta quantos registros existem na tabela.
     * @return O número total de scores.
     */
    long count();
}