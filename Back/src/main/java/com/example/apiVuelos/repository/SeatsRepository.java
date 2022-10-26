package com.example.apiVuelos.repository;

import com.example.apiVuelos.model.Seats;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatsRepository extends JpaRepository<Seats, Long> {
}
