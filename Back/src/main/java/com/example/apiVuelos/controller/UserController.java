package com.example.apiVuelos.controller;

import com.example.apiVuelos.model.User;
import com.example.apiVuelos.repository.UserRepository;
import com.example.apiVuelos.useCase.ResourceNotFoundExeption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT})
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAllUser(){
        return userRepository.findAll();
    }

    @GetMapping("{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
        User user = userRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Usuario con la id requerida no existe: " + id));
        return ResponseEntity.ok(user);
    }

    @PostMapping
    public User createUser(@RequestBody User user){
        return userRepository.save(user);
    }

    @PutMapping("{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails){
        User updateUser = userRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundExeption("Usuario con la id requerida no existe: " + id));

        updateUser.setFirstName(userDetails.getFirstName());
        updateUser.setLastName(userDetails.getLastName());
        updateUser.setCc(updateUser.getCc());
        updateUser.setEmail(updateUser.getEmail());
        updateUser.setPassword(updateUser.getPassword());

        userRepository.save(updateUser);

        return  ResponseEntity.ok(updateUser);
    }

    @DeleteMapping("{id}")
    public void deleteUserById(@PathVariable Long id){
        userRepository.deleteById(id);
    }
}