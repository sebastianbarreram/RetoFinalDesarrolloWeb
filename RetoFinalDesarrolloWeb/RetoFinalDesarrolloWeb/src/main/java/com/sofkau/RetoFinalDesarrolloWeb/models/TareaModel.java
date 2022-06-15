package com.sofkau.RetoFinalDesarrolloWeb.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Entity
@Table(name="tarea")
public class TareaModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long idTarea;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "idLista", nullable = false)
    @JsonBackReference
    private ListaModel idLista;

    @Column
    private String descripcionTarea;

    public TareaModel() {
    }
    
    public TareaModel(Long idTarea, ListaModel idLista, String descripcionTarea) {
        this.idTarea = idTarea;
        this.idLista = idLista;
        this.descripcionTarea = descripcionTarea;
    }

    public Long getIdTarea() {
        return idTarea;
    }

    public void setIdTarea(Long idTarea) {
        this.idTarea = idTarea;
    }

    public String getDescripcionTarea() {
        return descripcionTarea;
    }

    public void setDescripcionTarea(String descripcionTarea) {
        this.descripcionTarea = descripcionTarea;
    }


}
