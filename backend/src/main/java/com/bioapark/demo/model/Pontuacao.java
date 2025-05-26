package com.bioapark.demo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "pontuacoes")
public class Pontuacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nomeJogador;

    @Column(nullable = false)
    private Integer tempoSegundos;

    @Column(nullable = false)
    private Integer pontuacao;

    @Column(nullable = false)
    private LocalDateTime dataRegistro;

    public Pontuacao() {}

    public Pontuacao(String nomeJogador, Integer tempoSegundos, Integer pontuacao, LocalDateTime dataRegistro) {
        this.nomeJogador = nomeJogador;
        this.tempoSegundos = tempoSegundos;
        this.pontuacao = pontuacao;
        this.dataRegistro = dataRegistro;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeJogador() {
        return nomeJogador;
    }

    public void setNomeJogador(String nomeJogador) {
        this.nomeJogador = nomeJogador;
    }

    public Integer getTempoSegundos() {
        return tempoSegundos;
    }

    public void setTempoSegundos(Integer tempoSegundos) {
        this.tempoSegundos = tempoSegundos;
    }

    public Integer getPontuacao() {
        return pontuacao;
    }

    public void setPontuacao(Integer pontuacao) {
        this.pontuacao = pontuacao;
    }

    public LocalDateTime getDataRegistro() {
        return dataRegistro;
    }

    public void setDataRegistro(LocalDateTime dataRegistro) {
        this.dataRegistro = dataRegistro;
    }
}

