package com.example.apiVuelos.repository;

import com.example.apiVuelos.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
