package com.bioapark.demo.controller;

import com.bioapark.demo.dto.ScoreDTO;
import com.bioapark.demo.model.Score;
import com.bioapark.demo.service.ScoreService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ScoreController.class)
class ScoreControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ScoreService scoreService;

    @Autowired
    private ObjectMapper objectMapper; // Converte objetos Java para JSON

    @Test
    void getTop10Scores_deveRetornarListaDeScores() throws Exception {
        // Dado
        List<Score> scores = List.of(new Score("Player1", 1000));
        when(scoreService.getTop10Scores()).thenReturn(scores);

        // Quando & Então
        mockMvc.perform(get("/api/scores/top10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].playerName", is("Player1")));
    }

    @Test
    void submitScore_deveRetornarSucesso_quandoScoreEhAdicionado() throws Exception {
        // Dado
        ScoreDTO scoreDTO = new ScoreDTO("Novo Herói", 2000);
        when(scoreService.addScore(any(ScoreDTO.class))).thenReturn(true);

        // Quando & Então
        mockMvc.perform(post("/api/scores")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(scoreDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message", is("Score processed successfully.")));
    }

    @Test
    void submitScore_deveRetornarMensagemDeScoreBaixo_quandoNaoAdicionado() throws Exception {
        // Dado
        ScoreDTO scoreDTO = new ScoreDTO("Coitado", 10);
        when(scoreService.addScore(any(ScoreDTO.class))).thenReturn(false);

        // Quando & Então
        mockMvc.perform(post("/api/scores")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(scoreDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message", is("Score not high enough for Top 10.")));
    }
}