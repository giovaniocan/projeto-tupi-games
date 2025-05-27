
CREATE TABLE scores (
                        id BIGINT PRIMARY KEY AUTO_INCREMENT,
                        player_name VARCHAR(100) NOT NULL,
                        score_value INT NOT NULL,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
/*Busca top 10 scores*/

CREATE INDEX idx_score_value ON scores (score_value DESC);