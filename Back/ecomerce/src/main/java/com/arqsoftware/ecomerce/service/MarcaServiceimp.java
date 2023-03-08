package com.arqsoftware.ecomerce.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.arqsoftware.ecomerce.model.Marca;
import com.arqsoftware.ecomerce.repository.MarcaRepository;

@Service
public class MarcaServiceimp implements MarcaService{
    @Autowired
    private MarcaRepository mRepository;

    
    @Override
    public List<Marca> getMarcas() {
        
        return mRepository.findAll();
        
    }


    @Override
    public Marca creaMarca(Marca marca) {
        return mRepository.save(marca);
    }


    @Override
    public Marca getMarca(Long id) {
        Optional<Marca> marca=mRepository.findById(id);
        if (marca.isPresent()){
            return marca.get();
        }
        throw new RuntimeException("No se encontró la marca con id:" + id); 

    }


    @Override
    public void deleteMarca(Long id) {
        mRepository.deleteById(id);
    }


    @Override
    public Marca updateMarca(Marca marca) {
        return mRepository.save(marca);
    }
    
}
