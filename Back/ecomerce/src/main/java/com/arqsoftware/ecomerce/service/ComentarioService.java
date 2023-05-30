package com.arqsoftware.ecomerce.service;

import java.util.List;

import com.arqsoftware.ecomerce.model.Comentario;

public interface ComentarioService {    
        
        List<Comentario> buscarPorIdProducto(Long idproducto);
        
        Comentario creaComentario(Comentario comentario);
}
    
