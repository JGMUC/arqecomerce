package com.arqsoftware.ecomerce.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {
    @GetMapping("/productos")
    public String getProducts (){
        return "Mostrando lista de productos";
    }
    @GetMapping("/productos/{id}")
    public String getProduct (@PathVariable("id") long id){
        return "Mostrando lista de productos" + id;
    }
}
