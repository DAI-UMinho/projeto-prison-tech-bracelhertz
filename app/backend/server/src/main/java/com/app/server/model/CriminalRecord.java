package com.app.server.model;

import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;





@Entity(name="criminalRecord")
@Table(name="criminalRecord")
public class CriminalRecord {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long criminalRecordId;
	
	
	@ManyToOne()
    @JoinColumn(name = "prisonerId", referencedColumnName = "prisonerId", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
	private Prisoner prisoner;
	
	
	@NotBlank
	private String name;

	@NotBlank
	private String description;
	
	@Temporal(TemporalType.DATE)
	@NotBlank
	private Date emissionDate;
	
	@CreationTimestamp
	private LocalDateTime createdTimestamp;
	
	@UpdateTimestamp
    private LocalDateTime lastUpdatedTimestamp;
	

	public CriminalRecord() {}


	public CriminalRecord(Long criminalRecordId, Prisoner prisoner, String name, String description,
			Date emissionDate, LocalDateTime createdTimestamp, LocalDateTime lastUpdatedTimestamp) {
		super();
		this.criminalRecordId = criminalRecordId;
		this.prisoner = prisoner;
		this.name = name;
		this.description = description;
		this.emissionDate = emissionDate;
		this.createdTimestamp = createdTimestamp;
		this.lastUpdatedTimestamp = lastUpdatedTimestamp;
	}


	public Long getCriminalRecordId() {
		return criminalRecordId;
	}


	public void setCriminalRecordId(Long criminalRecordId) {
		this.criminalRecordId = criminalRecordId;
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


	public Date getEmissionDate() {
		return emissionDate;
	}


	public void setEmissionDate(Date emissionDate) {
		this.emissionDate = emissionDate;
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