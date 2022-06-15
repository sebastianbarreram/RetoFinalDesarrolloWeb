package com.sofkau.RetoFinalDesarrolloWeb.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "lista")
public class ListaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    @Column
    private String nombreLista;

    // @OneToMany(
    // fetch = FetchType.EAGER,
    // targetEntity = UsuarioRolModel.class,
    // cascade = CascadeType.REMOVE,
    // mappedBy = "idUsuario"
    // )
    // @JsonManagedReference
    // private List<UsuarioRolModel> usuarioRolModel = new ArrayList<>();

    public ListaModel() {
    }

    public ListaModel(String nombreLista) {
        this.nombreLista = nombreLista;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreLista() {
        return nombreLista;
    }

    public void setNombreLista(String nombreLista) {
        this.nombreLista = nombreLista;
    }

}