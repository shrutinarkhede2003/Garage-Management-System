package com.garage.backend.service;

import com.garage.backend.entity.InventoryItem;
import com.garage.backend.repository.InventoryItemRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class InventoryService {
    private final InventoryItemRepository repository;

    public InventoryService(InventoryItemRepository repository) {
        this.repository = repository;
    }

    public List<InventoryItem> getAllItems() {
        return repository.findAll();
    }

    public InventoryItem saveItem(InventoryItem item) {
        return repository.save(item);
    }

    public InventoryItem getItem(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void deleteItem(Long id) {
        repository.deleteById(id);
    }
}
