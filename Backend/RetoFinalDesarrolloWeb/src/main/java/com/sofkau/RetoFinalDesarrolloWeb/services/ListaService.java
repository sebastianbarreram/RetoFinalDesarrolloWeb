package com.sofkau.RetoFinalDesarrolloWeb.services;

import com.sofkau.RetoFinalDesarrolloWeb.models.ListaModel;
import com.sofkau.RetoFinalDesarrolloWeb.repositories.ListaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class ListaService {
    @Autowired
    ListaRepository listaRepository;

    public ArrayList<ListaModel> obtenerListas() {
        return (ArrayList<ListaModel>) listaRepository.findAll();
    }

    public ListaModel guardarListas(ListaModel lista) {
        return listaRepository.save(lista);
    }

    public Optional<ListaModel> obtenerPorId(Long id) {
        return listaRepository.findById(id);
    }

    public boolean eliminarLista(Long id) {
        try {
            listaRepository.deleteById(id);
            return true;
        } catch (Exception err) {
            return false;
        }
    }

}