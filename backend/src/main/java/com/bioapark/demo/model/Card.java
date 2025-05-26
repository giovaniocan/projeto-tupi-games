package com.bioapark.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "cards")
@NoArgsConstructor
@AllArgsConstructor
public class Card {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "nome_portugues", nullable = false, length = 100)
    private String nomePortugues;

    @Column(name = "nome_tupi", nullable = false, length = 100)
    private String nomeTupi;

    @Column(name = "imagem_url", length = 255)
    private String imagemUrl;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomePortugues() {
        return nomePortugues;
    }

    public void setNomePortugues(String nomePortugues) {
        this.nomePortugues = nomePortugues;
    }

    public String getNomeTupi() {
        return nomeTupi;
    }

    public void setNomeTupi(String nomeTupi) {
        this.nomeTupi = nomeTupi;
    }

    public String getImagemUrl() {
        return imagemUrl;
    }

    public void setImagemUrl(String imagemUrl) {
        this.imagemUrl = imagemUrl;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // toString para debug
    @Override
    public String toString() {
        return "Card{" +
                "id=" + id +
                ", nomePortugues='" + nomePortugues + '\'' +
                ", nomeTupi='" + nomeTupi + '\'' +
                ", imagemUrl='" + imagemUrl + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }

}
