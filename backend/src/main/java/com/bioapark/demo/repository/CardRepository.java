package com.bioapark.demo.repository;

import com.bioapark.demo.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {

    @Query(value = "SELECT * FROM cards ORDER BY RAND() LIMIT :quantity", nativeQuery = true)
    List<Card> findAllByQuantityOfCards(@Param("quantity") int quantity);

}
