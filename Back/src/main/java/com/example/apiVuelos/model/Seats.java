package com.example.apiVuelos.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "seats")

public class Seats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "id_seats")
    private String idSeats;
    @Column(name = "id_user")
    private String IdUser;
    @Column(name = "total_price")
    private Float totalPrice;
    @Column(name = "total_seats")
    private Integer totalSeats;
}
