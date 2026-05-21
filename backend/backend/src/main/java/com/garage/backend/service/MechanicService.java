package com.garage.backend.service;

import com.garage.backend.entity.Mechanic;
import com.garage.backend.repository.MechanicRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MechanicService {
    private final MechanicRepository repository;

    public MechanicService(MechanicRepository repository) {
        this.repository = repository;
    }

    public List<Mechanic> getAllMechanics() {
        return repository.findAll();
    }

    public Mechanic saveMechanic(Mechanic mechanic) {
        return repository.save(mechanic);
    }

    public Mechanic getMechanic(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void deleteMechanic(Long id) {
        repository.deleteById(id);
    }
}
