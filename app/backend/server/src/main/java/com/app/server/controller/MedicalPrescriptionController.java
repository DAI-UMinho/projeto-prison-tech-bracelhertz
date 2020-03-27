package com.app.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.server.model.MedicalPrescription;

import com.app.server.repository.MedicalPrescriptionRepository;


@RestController
@RequestMapping(value = "/api")
public class MedicalPrescriptionController {

	@Autowired
	MedicalPrescriptionRepository medicalPrescriptionRepository;
	
	@GetMapping("/prescription")
	public List<MedicalPrescription> listPrescription(){
		return medicalPrescriptionRepository.findAll();
	}
	
	@GetMapping("/prescription/{prescriptionId}")
	public MedicalPrescription listPrescription(@PathVariable(value="prescriptionId") long prescriptionId){
		return medicalPrescriptionRepository.findById(prescriptionId);
	}
	
	@PostMapping("/prescription")
	public MedicalPrescription savePrescription(@RequestBody MedicalPrescription prescription) {
		return medicalPrescriptionRepository.save(prescription);
	}
	
	@PutMapping("/prescription")
	public MedicalPrescription updatePrescription(@RequestBody MedicalPrescription prescription) {
		return medicalPrescriptionRepository.save(prescription);
	}
	
	@DeleteMapping("/prescription/{prescriptionId}")
	public void deletePrescription(@PathVariable(value="prescriptionId") long prescriptionId){
		medicalPrescriptionRepository.deleteById(prescriptionId);
	}
}