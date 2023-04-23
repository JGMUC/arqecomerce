package com.arqsoftware.ecomerce.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter 
@Getter
@ToString
@Entity
@Table(name = "productos")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prd_id")
    private Long id;

    @Column(name = "prd_ean")
    private Long ean;
    
    @Column(name = "prd_nombre")
    private String nombre;
    
    @Column(name = "prd_descripcion")
    private String descripcion;
    
    @Column(name = "prd_valor_unitario")
    private Float valor_unitario;
    
    @Column(name = "prd_cantidad")
    private Long cantidad;
    
    @Column(name = "prd_mar_id")
    private Long marca;
    
    @Column(name = "prd_imagen")
    private String imagen; 

    @Column(name = "imagenes")
    private String imagenes;
}
