package com.bioapark.demo.controller;

import com.bioapark.demo.model.Card;
import com.bioapark.demo.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/api/cards")
@CrossOrigin(origins = "*")
public class CardController {

    @Autowired
    private CardService cardService;

    // GET /api/cards - Buscar todos os cards
    @GetMapping("/{quantity}")
    public ResponseEntity<List<Card>> getAllCards(@PathVariable int quantity) {
        try {
            List<Card> cards = cardService.findAllByQuantity(quantity);

            System.out.println("Quantidade solicitada de cards: " + quantity);
            System.out.println("Quantidade de cards retornados: " + cards.size());

            // Se não houver dados no banco, retorna dados mockados
            if (cards.isEmpty()) {
                System.out.println("Banco vazio, retornando dados mockados...");
                cards = generateMockCards(quantity);
            }

            return ResponseEntity.ok(cards);
        } catch (Exception e) {
            System.out.println("Erro no banco, retornando dados mockados...");
            e.printStackTrace();
            // Em caso de erro, também retorna dados mockados
            List<Card> mockCards = generateMockCards(quantity);
            return ResponseEntity.ok(mockCards);
        }
    }

    /**
     * Gera cards mockados com nomes em português e tupi
     */
    private List<Card> generateMockCards(int quantity) {
        List<Card> mockCards = new ArrayList<>();
        Random random = new Random();

        // Arrays com dados para gerar cards aleatórios
        String[] nomesPortugues = {
                "Onça", "Jaguar", "Capivara", "Tucano", "Arara", "Boto", "Preguiça",
                "Tamandua", "Anta", "Quati", "Macaco", "Papagaio", "Jacaré", "Pirarucu",
                "Guariba", "Jaguatirica", "Cutia", "Paca", "Tatu", "Sucuri"
        };

        String[] nomesTupi = {
                "Jaguarete", "Jaguara", "Kapiwara", "Tukana", "Arara", "Boto", "Ai",
                "Tamanduá", "Tapira", "Kuati", "Káu", "Ajuru", "Jakaré", "Pirarucu",
                "Guariba", "Jaguatirika", "Akutí", "Paka", "Tatu", "Sucuri"
        };

        String[] imagensUrl = {
                "jaguar.jpg", "capivara.jpg", "tucano.jpg", "arara.jpg", "boto.jpg",
                "preguica.jpg", "tamandua.jpg", "anta.jpg", "quati.jpg", "macaco.jpg",
                "papagaio.jpg", "jacare.jpg", "pirarucu.jpg", "guariba.jpg", "jaguatirica.jpg",
                "cutia.jpg", "paca.jpg", "tatu.jpg", "sucuri.jpg", "onca.jpg"
        };

        for (int i = 0; i < quantity && i < nomesPortugues.length; i++) {
            Card card = new Card();

            // Usa índice sequencial para evitar repetições, mas com um pouco de aleatoriedade
            int index = (i + random.nextInt(3)) % nomesPortugues.length;

            card.setId((long) (i + 1));
            card.setNomePortugues(nomesPortugues[index]);
            card.setNomeTupi(nomesTupi[index]);
            card.setImagemUrl(imagensUrl[index]);
            card.setCreatedAt(LocalDateTime.now().minusDays(random.nextInt(30)));

            mockCards.add(card);
        }

        // Se pediram mais cards do que temos nomes, repete alguns com variações
        if (quantity > nomesPortugues.length) {
            for (int i = nomesPortugues.length; i < quantity; i++) {
                Card card = new Card();
                int index = i % nomesPortugues.length;

                card.setId((long) (i + 1));
                card.setNomePortugues(nomesPortugues[index] + " " + (i / nomesPortugues.length + 1));
                card.setNomeTupi(nomesTupi[index] + " " + (i / nomesPortugues.length + 1));
                card.setImagemUrl(imagensUrl[index]);
                card.setCreatedAt(LocalDateTime.now().minusDays(random.nextInt(30)));

                mockCards.add(card);
            }
        }

        System.out.println("Gerados " + mockCards.size() + " cards mockados");
        return mockCards;
    }
}