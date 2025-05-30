// backend/src/main/java/com/bioapark/demo/controller/ScoreController.java
package com.bioapark.demo.controller;

import com.bioapark.demo.dto.ScoreDTO;
import com.bioapark.demo.model.Score;
import com.bioapark.demo.service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/scores")
@CrossOrigin(origins = "*")
public class ScoreController {

    @Autowired
    private ScoreService scoreService;

    /**
     * Endpoint para submeter um novo score.
     * Recebe um JSON com playerName e scoreValue.
     * @param scoreDTO O DTO com os dados do score.
     * @return Uma resposta indicando sucesso ou falha.
     */
    @PostMapping
    public ResponseEntity<Map<String, String>> submitScore(@RequestBody ScoreDTO scoreDTO) {
        try {
            // Validação básica
            if (scoreDTO.getPlayerName() == null || scoreDTO.getPlayerName().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Player name cannot be empty."));
            }
            if (scoreDTO.getScoreValue() < 0) {
                return ResponseEntity.badRequest().body(Map.of("message", "Score cannot be negative."));
            }

            boolean added = scoreService.addScore(scoreDTO);
            if (added) {
                return ResponseEntity.ok().body(Map.of("message", "Score processed successfully."));
            } else {
                return ResponseEntity.ok().body(Map.of("message", "Score not high enough for Top 10."));
            }
        } catch (Exception e) {
            System.err.println("Error processing score: " + e.getMessage());
            return ResponseEntity.status(500).body(Map.of("message", "Error processing score."));
        }
    }

    /**
     * Endpoint para buscar o Top 10 scores.
     * @return Uma lista com os 10 melhores scores.
     */
    @GetMapping("/top10")
    public ResponseEntity<List<Score>> getTop10Scores() {
        try {
            List<Score> topScores = scoreService.getTop10Scores();
            return ResponseEntity.ok(topScores);
        } catch (Exception e) {
            // Idealmente, logar o erro
            System.err.println("Error fetching Top 10: " + e.getMessage());
            return ResponseEntity.status(500).build();
        }
    }
}