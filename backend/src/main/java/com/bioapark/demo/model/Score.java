package com.bioapark.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "scores")
@Data
@NoArgsConstructor
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "player_name", nullable = false, length = 100)
    private String playerName;

    @Column(name = "score_value", nullable = false)
    private int scoreValue;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public Score(String playerName, int scoreValue) {
        this.playerName = playerName;
        this.scoreValue = scoreValue;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}