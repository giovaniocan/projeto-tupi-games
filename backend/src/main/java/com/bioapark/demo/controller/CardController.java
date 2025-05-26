package com.bioapark.demo.controller;

import com.bioapark.demo.model.Card;
import com.bioapark.demo.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
            return ResponseEntity.ok(cards);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
