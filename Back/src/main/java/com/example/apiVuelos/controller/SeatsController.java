package com.example.apiVuelos.controller;


import com.example.apiVuelos.model.Seats;
import com.example.apiVuelos.repository.SeatsRepository;
import com.example.apiVuelos.useCase.ResourceNotFoundExeption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT})
@RequestMapping("/api/seats")
public class SeatsController {

    @Autowired
    private SeatsRepository seatsRepository;

    @GetMapping
    public List<Seats> getAllSeats(){
        return seatsRepository.findAll();
    }

    @GetMapping("{id}")
    public ResponseEntity<Seats> getSeatById(@PathVariable Long id){
        Seats seats = seatsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundExeption("Asientos con la siguiente ente id no existe: " + id));
        return ResponseEntity.ok(seats);
    }

    @PostMapping
    public Seats createSeats(@RequestBody Seats seats){
        return seatsRepository.save(seats);
    }

    @PutMapping("{id}")
    public ResponseEntity<Seats> updateSeats(@PathVariable Long id, @RequestBody Seats seatDetails){
        Seats updateSeat = seatsRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundExeption("Asiento no existe: " + id));
        updateSeat.setIdSeats(updateSeat.getIdSeats());
        updateSeat.setIdUser(updateSeat.getIdUser());
        updateSeat.setTotalPrice(updateSeat.getTotalPrice());
        updateSeat.setTotalSeats(updateSeat.getTotalSeats());

        seatsRepository.save(updateSeat);

        return ResponseEntity.ok(updateSeat);
    }

    @DeleteMapping("{id}")
    public void deleteSeatsById(@PathVariable Long id){
        seatsRepository.deleteById(id);
    }
}
