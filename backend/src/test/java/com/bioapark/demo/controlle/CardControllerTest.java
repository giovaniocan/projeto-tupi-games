package com.bioapark.demo.controller;

import com.bioapark.demo.model.Card;
import com.bioapark.demo.service.CardService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CardController.class) // Testa apenas o CardController, não carrega a aplicação toda.
class CardControllerTest {

    @Autowired
    private MockMvc mockMvc; // Ferramenta para simular requisições HTTP.

    @MockBean // Cria um mock do CardService e o injeta no contexto do teste.
    private CardService cardService;

    @Test
    void getAllCards_deveRetornarCartasDoServico_quandoEncontradas() throws Exception {
        // Dado
        Card onca = new Card();
        onca.setId(1L);
        onca.setNomePortugues("Onça");
        onca.setNomeTupi("Jaguarete");

        List<Card> cartasMock = List.of(onca);
        when(cardService.findAllByQuantity(anyInt())).thenReturn(cartasMock);

        // Quando & Então
        mockMvc.perform(get("/api/cards/1"))
                .andExpect(status().isOk()) // Espera HTTP 200
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(1))) // Verifica se a lista JSON tem 1 item
                .andExpect(jsonPath("$[0].nomePortugues", is("Onça"))); // Verifica o nome
    }

    @Test
    void getAllCards_deveRetornarDadosMockados_quandoServicoNaoRetornaNada() throws Exception {
        // Dado: O serviço retorna uma lista vazia, forçando o fallback do controller.
        when(cardService.findAllByQuantity(anyInt())).thenReturn(Collections.emptyList());

        // Quando & Então
        mockMvc.perform(get("/api/cards/4")) // Pede 4 cartas
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(4))); // Verifica se o controller gerou 4 cartas mockadas
    }
}