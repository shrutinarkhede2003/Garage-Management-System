package com.garage.backend.controller;

import com.garage.backend.entity.Mechanic;
import com.garage.backend.service.MechanicService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/mechanics")
@CrossOrigin("*")
public class MechanicController {

    private final MechanicService service;

    public MechanicController(MechanicService service) {
        this.service = service;
    }

    @GetMapping
    public List<Mechanic> getAllMechanics() {
        return service.getAllMechanics();
    }

    @PostMapping
    public Mechanic createMechanic(@RequestBody Mechanic mechanic) {
        return service.saveMechanic(mechanic);
    }

    @GetMapping("/{id}")
    public Mechanic getMechanic(@PathVariable Long id) {
        return service.getMechanic(id);
    }

    @DeleteMapping("/{id}")
    public void deleteMechanic(@PathVariable Long id) {
        service.deleteMechanic(id);
    }
}
