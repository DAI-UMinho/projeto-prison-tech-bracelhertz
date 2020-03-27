package com.app.server.model;

import java.time.LocalDateTime;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import javax.validation.constraints.NotBlank;


import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;


@Entity(name="medicalPrescription")
@Table(name="medicalPrescription")
public class MedicalPrescription{
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long prescriptionId;
	
	@ManyToOne
	@JoinColumn(name = "prisonerId", referencedColumnName = "prisonerId" , nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Prisoner prisoner; 
	
	
	@NotBlank
    private String name;
	
    private String description;
	
	@CreationTimestamp
	private LocalDateTime createdTimestamp;
	
	@CreationTimestamp
	private LocalDateTime lastUpdatedTimestamp;
	
	
	public MedicalPrescription() {
	}


	public MedicalPrescription(Long prescriptionId, Prisoner prisoner, String name, String description,
			LocalDateTime createdTimestamp, LocalDateTime lastUpdatedTimestamp) {
		super();
		this.prescriptionId = prescriptionId;
		this.prisoner = prisoner;
		this.name = name;
		this.description = description;
		this.createdTimestamp = createdTimestamp;
		this.lastUpdatedTimestamp = lastUpdatedTimestamp;
	}


	public Long getPrescriptionId() {
		return prescriptionId;
	}


	public void setPrescriptionId(Long prescriptionId) {
		this.prescriptionId = prescriptionId;
	}


	public Prisoner getPrisoner() {
		return prisoner;
	}


	public void setPrisoner(Prisoner prisoner) {
		this.prisoner = prisoner;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public LocalDateTime getCreatedTimestamp() {
		return createdTimestamp;
	}


	public void setCreatedTimestamp(LocalDateTime createdTimestamp) {
		this.createdTimestamp = createdTimestamp;
	}


	public LocalDateTime getLastUpdatedTimestamp() {
		return lastUpdatedTimestamp;
	}


	public void setLastUpdatedTimestamp(LocalDateTime lastUpdatedTimestamp) {
		this.lastUpdatedTimestamp = lastUpdatedTimestamp;
	}


}