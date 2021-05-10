package com.rafadev.rdvendas.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rafadev.rdvendas.entities.Sale;

public interface SaleRepository extends JpaRepository<Sale, Long>{

}
