package com.sofkau.RetoFinalDesarrolloWeb.services;

import com.sofkau.RetoFinalDesarrolloWeb.models.TareaModel;
import com.sofkau.RetoFinalDesarrolloWeb.repositories.TareaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class TareaService {
    @Autowired
    TareaRepository tareaRepository;

    public ArrayList<TareaModel> obtenerTareas() {
        return (ArrayList<TareaModel>) tareaRepository.findAll();
    }

    public TareaModel guardarTarea(TareaModel tarea) {
        return tareaRepository.save(tarea);
    }

    public Optional<TareaModel> obtenerTareaPorId(Long id) {
        return tareaRepository.findById(id);
    }

    public boolean eliminarTarea(Long id) {
        try {
            tareaRepository.deleteById(id);
            return true;
        } catch (Exception err) {
            return false;
        }
    }

}
