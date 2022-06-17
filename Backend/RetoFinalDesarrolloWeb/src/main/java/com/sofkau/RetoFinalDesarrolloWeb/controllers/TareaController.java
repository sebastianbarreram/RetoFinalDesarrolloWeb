package com.sofkau.RetoFinalDesarrolloWeb.controllers;

import com.sofkau.RetoFinalDesarrolloWeb.models.TareaModel;
import com.sofkau.RetoFinalDesarrolloWeb.services.TareaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin
@RestController
@RequestMapping("/tarea")
public class TareaController {

    @Autowired
    TareaService tareaService;

    @GetMapping()
    public ArrayList<TareaModel> obtenerTareas() {
        return tareaService.obtenerTareas();
    }

    @PostMapping()
    public TareaModel guardarTarea(@RequestBody TareaModel tarea) {
        return this.tareaService.guardarTarea(tarea);
    }

    @DeleteMapping(path = "/{id}")
    public String eliminarPorId(@PathVariable("id") Long id) {
        boolean ok = this.tareaService.eliminarTarea(id);
        if (ok) {
            return "Se eliminó la tarea con id " + id;
        } else {
            return "No pudo eliminar la tarea con id " + id;
        }
    }

}

