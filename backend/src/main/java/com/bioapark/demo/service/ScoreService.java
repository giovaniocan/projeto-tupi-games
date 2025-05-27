// backend/src/main/java/com/bioapark/demo/service/ScoreService.java
package com.bioapark.demo.service;

import com.bioapark.demo.dto.ScoreDTO;
import com.bioapark.demo.model.Score;
import com.bioapark.demo.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ScoreService {

    @Autowired
    private ScoreRepository scoreRepository;

    private static final int MAX_TOP_SCORES = 10;

    /**
     * Adiciona um novo score e verifica se ele entra no Top 10.
     * Se entrar e o Top 10 estiver cheio, remove o último colocado.
     * @param scoreDTO O DTO com os dados do novo score.
     * @return true se o score foi adicionado (ou entrou no Top 10), false caso contrário.
     */
    @Transactional
    public boolean addScore(ScoreDTO scoreDTO) {
        List<Score> topScores = scoreRepository.findTop10ByOrderByScoreValueDesc();
        long currentScoreCount = scoreRepository.count();

        Score newScore = new Score(scoreDTO.getPlayerName(), scoreDTO.getScoreValue());

        if (currentScoreCount < MAX_TOP_SCORES) {
            scoreRepository.save(newScore);
            return true;
        }

        Score lowestTopScore = topScores.get(MAX_TOP_SCORES - 1);

        if (newScore.getScoreValue() > lowestTopScore.getScoreValue()) {
            scoreRepository.delete(lowestTopScore);
            scoreRepository.save(newScore);
            return true;
        }

        return false;
    }

    /**
     * Retorna a lista dos 10 melhores scores.
     * @return Uma lista com os scores do Top 10.
     */
    public List<Score> getTop10Scores() {
        return scoreRepository.findTop10ByOrderByScoreValueDesc();
    }
}