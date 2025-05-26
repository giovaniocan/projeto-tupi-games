package com.bioapark.demo.controller;

import com.bioapark.demo.model.Pontuacao;
import com.bioapark.demo.repository.PontuacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/pontuacoes")
public class PontuacaoController {
    @Autowired
    private PontuacaoRepository repository;

    @GetMapping
    public List<Pontuacao> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Pontuacao salvar(@RequestBody Pontuacao pontuacao) {
        return repository.save(pontuacao);
    }
}

