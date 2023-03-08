package com.arqsoftware.ecomerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.arqsoftware.ecomerce.model.Marca;

public interface MarcaRepository extends JpaRepository<Marca,Long> {
    
}
