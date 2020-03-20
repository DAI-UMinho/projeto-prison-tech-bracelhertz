package com.app.server.repository;

import com.app.server.model.Utilizador;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface UtilizadorRepository extends JpaRepository<Utilizador, Long> {

	Utilizador findById(long id_user);

	@Query("Select U.id_user, I.nome FROM utilizador U, Instituicao I WHERE I.id_instituicao = U.id_instituicao AND U.id_user = :id_user")
	Optional<Utilizador> teste(@Param("id_user") Long id_user);
}