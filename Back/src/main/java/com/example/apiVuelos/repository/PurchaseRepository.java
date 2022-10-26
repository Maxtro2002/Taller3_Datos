package com.example.apiVuelos.repository;

import com.example.apiVuelos.model.Purchases;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseRepository extends JpaRepository<Purchases, Long> {
}
