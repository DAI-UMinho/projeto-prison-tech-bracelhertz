package com.app.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.server.model.Schedule;


@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long>{

	Schedule findById(long scheduleId);
	
	/*
	@Query("Select U.id_user, I.nome, A FROM utilizador U, Recluso R,  Agenda A, Instituicao I WHERE R.id_instituicao = U.id_instituicao  AND A.id_agenda = :id_agenda")
	Optional<List<Agenda>> findByIdAgenda(@Param("idAgenda") Long idAgenda);
	*/
	
}
