package com.app.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.app.server.model.Anotation;


@Repository
public interface AnotationRepository extends JpaRepository<Anotation, Long>{

	
	Anotation findById(long anotationId);
	
	/*
	@Query("Select U.id_user, I.nome, A FROM utilizador U, Recluso R,  Agenda A, Instituicao I WHERE R.id_instituicao = U.id_instituicao  AND A.id_agenda = :id_agenda")
	Optional<List<Agenda>> findByIdAnotacao(@Param("id_agenda") Long id_agenda);
	*/
	
}
