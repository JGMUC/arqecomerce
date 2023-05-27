package com.arqsoftware.ecomerce.service;

import java.util.List;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.arqsoftware.ecomerce.model.Comentario;
import com.arqsoftware.ecomerce.repository.ComentarioRepository;

@Service
public class ComentarioServiceImp implements ComentarioService{
    
    @Autowired
    private ComentarioRepository cRepository;
    
    @Override
    public List<Comentario> buscarPorIdProducto(Long idproducto) {
        return cRepository.findByProductoId(idproducto);
    }

    @Override
    public Comentario creaComentario(Comentario comentario) {
        return cRepository.save(comentario);
    } 
}
