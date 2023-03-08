package com.arqsoftware.ecomerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.arqsoftware.ecomerce.model.Marca;
import com.arqsoftware.ecomerce.service.MarcaService;

@RestController
public class MarcaController {
    
    @Autowired
    private MarcaService mService;

    @GetMapping("/marcas")
    public List<Marca> getMarcas (){
        return mService.getMarcas();
    }
    @GetMapping("/marcas/{id}")
    public Marca getMarca (@PathVariable("id") Long id){
        return mService.getMarca(id);
    }

    @DeleteMapping("/marcas")    
    public void deleteMarca (@RequestParam("id") Long id){
      mService.deleteMarca(id);
    }

    @PostMapping("/marcas")    
    public Marca createMarca (@RequestBody Marca marca){
        return mService.creaMarca(marca);
    }

    @PutMapping("/marcas/{id}")    
    public Marca updateMarca (@PathVariable("id") Long id,@RequestBody Marca marca){
        marca.setId(id);
        return mService.updateMarca (marca);
    }
}
