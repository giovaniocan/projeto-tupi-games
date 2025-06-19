package com.bioapark.demo.service;

import com.bioapark.demo.dto.ScoreDTO;
import com.bioapark.demo.model.Score;
import com.bioapark.demo.repository.ScoreRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

// Habilita o uso de anotações do Mockito (como @Mock e @InjectMocks)
@ExtendWith(MockitoExtension.class)
class ScoreServiceTest {

    // Cria um objeto simulado (mock) do ScoreRepository.
    // Nenhuma operação de banco de dados real será executada.
    @Mock
    private ScoreRepository scoreRepository;

    // Cria uma instância de ScoreService e injeta os mocks (neste caso, scoreRepository) nela.
    @InjectMocks
    private ScoreService scoreService;

    @Test
    void addScore_deveAdicionarScore_quandoRankingNaoEstaCheio() {
        // Dado (Given)
        ScoreDTO newScoreDto = new ScoreDTO();
        newScoreDto.setPlayerName("Novo Jogador");
        newScoreDto.setScoreValue(50);

        // Configura o mock: quando o método count() for chamado, deve retornar 9.
        when(scoreRepository.count()).thenReturn(9L);

        // Quando (When)
        boolean resultado = scoreService.addScore(newScoreDto);

        // Então (Then)
        assertTrue(resultado, "O resultado deveria ser true, pois o ranking não está cheio.");
        // Verifica se o método save() do repositório foi chamado exatamente uma vez.
        verify(scoreRepository, times(1)).save(any(Score.class));
        // Garante que o método delete() nunca foi chamado.
        verify(scoreRepository, never()).delete(any());
    }

    @Test
    void addScore_deveSubstituirMenorScore_quandoPontuacaoEhAltaOSuficiente() {
        // Dado
        ScoreDTO newScoreDto = new ScoreDTO("Campeão", 1500);
        List<Score> top10 = new ArrayList<>();
        for (int i = 1; i <= 10; i++) {
            top10.add(new Score("Player" + i, 100 * i)); // Menor pontuação é 100
        }
        Score scoreMaisBaixo = top10.get(9);

        when(scoreRepository.count()).thenReturn(10L);
        when(scoreRepository.findTop10ByOrderByScoreValueDesc()).thenReturn(top10);

        // Quando
        boolean resultado = scoreService.addScore(newScoreDto);

        // Então
        assertTrue(resultado, "O resultado deveria ser true, pois a nova pontuação é alta.");
        // Verifica se o método save() foi chamado para o novo score.
        verify(scoreRepository, times(1)).save(any(Score.class));
        // Verifica se o score mais baixo foi deletado.
        verify(scoreRepository, times(1)).delete(scoreMaisBaixo);
    }

    @Test
    void addScore_naoDeveAdicionar_quandoPontuacaoEhMuitoBaixa() {
        // Dado
        ScoreDTO newScoreDto = new ScoreDTO("Azarado", 50);
        List<Score> top10 = new ArrayList<>();
        for (int i = 1; i <= 10; i++) {
            top10.add(new Score("Player" + i, 100 * i)); // Menor pontuação é 100
        }

        when(scoreRepository.count()).thenReturn(10L);
        when(scoreRepository.findTop10ByOrderByScoreValueDesc()).thenReturn(top10);

        // Quando
        boolean resultado = scoreService.addScore(newScoreDto);

        // Então
        assertFalse(resultado, "O resultado deveria ser false, pois a pontuação é baixa.");
        verify(scoreRepository, never()).save(any());
        verify(scoreRepository, never()).delete(any());
    }

    @Test
    void getTop10Scores_deveRetornarListaDoRepositorio() {
        // Dado
        List<Score> scoresEsperados = List.of(new Score("Jogador1", 100));
        when(scoreRepository.findTop10ByOrderByScoreValueDesc()).thenReturn(scoresEsperados);

        // Quando
        List<Score> resultado = scoreService.getTop10Scores();

        // Então
        assertEquals(scoresEsperados, resultado, "A lista retornada deve ser a mesma do repositório.");
        verify(scoreRepository, times(1)).findTop10ByOrderByScoreValueDesc();
    }
}