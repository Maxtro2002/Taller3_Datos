package com.example.apiVuelos.controller;

import com.example.apiVuelos.model.Purchases;
import com.example.apiVuelos.repository.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT})
@RequestMapping("/api/purchase")
public class PurchasesController {
    @Autowired
    private PurchaseRepository purchaseRepository;

    @GetMapping
    public List<Purchases> getAllPurchases(){
        return purchaseRepository.findAll();
    }

    @GetMapping("{id}")
    public ResponseEntity<Purchases> getPurchaseById(@PathVariable Long id){
        Purchases purchase = purchaseRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Compra no existente: " + id));
        return ResponseEntity.ok(purchase);
    }

    @PostMapping
    public Purchases createPurchase(@RequestBody Purchases purchase){
        return purchaseRepository.save(purchase);
    }

    @PutMapping("{id}")
    public ResponseEntity<Purchases> updatePurchase(@PathVariable Long id, @RequestBody Purchases purchasDetails){
        Purchases updatePurchase = purchaseRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Compra no existente: " + id));
        updatePurchase.setNumber(purchasDetails.getNumber());
        updatePurchase.setClassType(purchasDetails.getClassType());
        updatePurchase.setPrice(purchasDetails.getPrice());
        updatePurchase.setSpot(purchasDetails.getSpot());

        purchaseRepository.save(updatePurchase);

        return ResponseEntity.ok(updatePurchase);
    }

    @DeleteMapping("{id}")
    public void deletePurchaseById(@PathVariable Long id){
        purchaseRepository.deleteById(id);
    }
}
