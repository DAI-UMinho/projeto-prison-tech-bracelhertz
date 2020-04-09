package com.app.server.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.server.model.MedicalPrescription;

@Repository
public interface MedicalPrescriptionRepository extends JpaRepository<MedicalPrescription, Long> {

	MedicalPrescription findByPrescriptionId(Long prescriptionId);

	List<MedicalPrescription> findAllByOrderByCreatedTimestampAsc();

	Boolean existsByPrescriptionId(Long prescriptionId);

	@Transactional
	@Modifying
	@Query("UPDATE medicalPrescription SET name = ?1, description = ?2 WHERE prescription_id = ?3 AND prisoner_id = ?4")
	void updateMedicalPrescriptionAsManager(String name, String description, Long prescriptionId, Long prisonerId);

	/*
	 * @Query("Select U.id_user, U.primeiro_nome, I FROM utilizador U, Instituicao I WHERE I.id_instituicao = U.id_instituicao AND I.id_instituicao = :id_instituicao"
	 * ) Optional<List<Instituicao>> findByIdInstituicao(@Param("id_instituicao")
	 * Long id_instituicao);
	 */
}
