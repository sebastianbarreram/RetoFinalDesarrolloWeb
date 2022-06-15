package com.sofkau.RetoFinalDesarrolloWeb.repositories;

import com.sofkau.RetoFinalDesarrolloWeb.models.TareaModel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TareaRepository extends CrudRepository<TareaModel,Long> {

}
