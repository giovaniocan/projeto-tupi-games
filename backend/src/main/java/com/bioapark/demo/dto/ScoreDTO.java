package com.bioapark.demo.dto;

import lombok.AllArgsConstructor; // 1. IMPORTE A ANOTAÇÃO
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor // 2. ADICIONE ESTA LINHA
public class ScoreDTO {
    private String playerName;
    private int scoreValue;
}