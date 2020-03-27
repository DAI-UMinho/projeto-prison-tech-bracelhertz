package com.app.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.app.server.model.CriminalRecord;





@Repository
public interface CriminalRecordRepository extends JpaRepository<CriminalRecord, Long>{

	
	CriminalRecord findById(long criminalRecordId);

	/*
	@Query("Select U.id_user, U.primeiro_nome, I FROM utilizador U, Instituicao I WHERE I.id_instituicao = U.id_instituicao AND I.id_instituicao = :id_instituicao")
	Optional<List<Instituicao>> findByIdInstituicao(@Param("id_instituicao") Long id_instituicao);
	*/
}
