package com.sofkau.RetoFinalDesarrolloWeb.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.sofkau.RetoFinalDesarrolloWeb.models.ListaModel;

@Repository
public interface ListaRepository extends CrudRepository<ListaModel, Long> {

}