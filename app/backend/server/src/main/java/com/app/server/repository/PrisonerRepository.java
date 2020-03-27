package com.app.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.server.model.Prisoner;


@Repository
public interface PrisonerRepository extends JpaRepository<Prisoner, Long>{

	Prisoner findById(long prisonerId);

	/*
	@Query("Select R.id_prisoner, R.primeiro_nome, I FROM prisoner R, Instituicao I WHERE I.id_instituicao= R.id_instituicao AND R.id_prisoner = :id_prisoner")
	Optional<prisoner> findByIdprisoner(@Param("id_prisoner") Long id_prisoner);
	*/
}
