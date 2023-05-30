package com.arqsoftware.ecomerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.arqsoftware.ecomerce.model.Comentario;
import com.arqsoftware.ecomerce.service.ComentarioService;

@RestController
@CrossOrigin("*")
public class ComentarioController {
    @Autowired
    private ComentarioService cService;

    @GetMapping("/comentarios/{idproducto}")
    public List<Comentario> buscarPorIdProducto(@PathVariable Long idproducto) {
        return cService.buscarPorIdProducto(idproducto);
    }
   

    @PostMapping("/comentarios")    
    public Comentario createComentario (@RequestBody Comentario comentario){
        return cService.creaComentario(comentario);
    }
}
