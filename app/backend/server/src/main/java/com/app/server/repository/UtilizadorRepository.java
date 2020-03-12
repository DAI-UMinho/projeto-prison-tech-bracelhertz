package com.app.server.repository;

import com.app.server.model.Utilizador;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UtilizadorRepository extends JpaRepository<Utilizador, Long> {

	Utilizador findById(long id_user);
}