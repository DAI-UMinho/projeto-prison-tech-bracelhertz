package com.app.server.repository;

import com.app.server.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	User findById(long userId);
	
    Optional<User> findByUsername(String username);

	/*
	@Query("Select U.idUtilizador, U.nome, I FROM Utilizador U, Instituicao I WHERE I.idInstituicao = U.idInstituicao AND U.idUtilizador = :idUtilizador")
	Optional<Utilizador> teste(@Param("idUtilizador") Long idUtilizador);
	*/
	
}