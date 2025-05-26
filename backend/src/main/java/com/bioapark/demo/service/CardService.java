package com.bioapark.demo.service;

import com.bioapark.demo.model.Card;
import com.bioapark.demo.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardService {

    @Autowired
    private CardRepository repository;

    public List<Card> findAllByQuantity(int quantity){
        List<Card> cards = repository.findAllByQuantityOfCards(quantity);
        cards.forEach(this::ensureCompleteImageUrl);
        return cards;
    }

    // Método auxiliar para garantir URL completa
    // Tenho que ver se essa parada aqui esta certa ainda.
    private void ensureCompleteImageUrl(Card card) {
        if (card.getImagemUrl() != null && !card.getImagemUrl().startsWith("http")) {
            card.setImagemUrl("http://localhost:8080/api/images/view/" + card.getImagemUrl());
        }
    }

}
