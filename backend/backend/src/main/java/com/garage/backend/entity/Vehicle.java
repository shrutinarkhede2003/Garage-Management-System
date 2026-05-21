package com.garage.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String licensePlate;

    private String make;

    private String model;

    private int year;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
}