package com.sofkau.RetoFinalDesarrolloWeb.controllers;

import com.sofkau.RetoFinalDesarrolloWeb.models.ListaModel;
import com.sofkau.RetoFinalDesarrolloWeb.services.ListaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/lista")
public class ListaController {
    @Autowired
    ListaService listaService;

    @GetMapping()
    public ArrayList<ListaModel> obtenerUsuarios() {
        return listaService.obtenerListas();
    }

    @PostMapping()
    public ListaModel guardarLista(@RequestBody ListaModel lista) {
        return this.listaService.guardarListas(lista);
    }

    @GetMapping(path = "/{id}")
    public Optional<ListaModel> obtenerUsuarioPorId(@PathVariable("id") Long id) {
        return this.listaService.obtenerPorId(id);
    }

    @DeleteMapping(path = "/{id}")
    public String eliminarPorId(@PathVariable("id") Long id) {
        boolean ok = this.listaService.eliminarLista(id);
        if (ok) {
            return "Se eliminó la lista con id " + id;
        } else {
            return "No pudo eliminar la lista con id " + id;
        }
    }

}