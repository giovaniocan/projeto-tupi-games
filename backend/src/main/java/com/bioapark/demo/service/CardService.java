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
        return cards;
    }
}
