package com.garage.backend.service;

import com.garage.backend.entity.Invoice;
import com.garage.backend.repository.InvoiceRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class InvoiceService {
    private final InvoiceRepository repository;

    public InvoiceService(InvoiceRepository repository) {
        this.repository = repository;
    }

    public List<Invoice> getAllInvoices() {
        return repository.findAll();
    }

    public Invoice saveInvoice(Invoice invoice) {
        return repository.save(invoice);
    }

    public Invoice getInvoice(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void deleteInvoice(Long id) {
        repository.deleteById(id);
    }
}
