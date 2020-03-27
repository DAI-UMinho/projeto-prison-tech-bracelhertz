package com.app.server.model;

import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Column;
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
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity(name = "prisoner")
@Table(name = "prisoner")
public class Prisoner {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long prisonerId;

	@NotBlank
	private String identifierId;

	@Temporal(TemporalType.DATE)
	@NotBlank
	private Date birthDate;

	@NotBlank
	private String nationality;

	@NotBlank
	private String name;

	@NotBlank
	private String photo;

	@NotNull
	private int contact;

	private int alternativeContact;

	@NotNull
	private int cell;

	@NotNull
	private int threatLevel;

	@ManyToOne
	@JoinColumn(name = "prisonId", referencedColumnName = "prisonId", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Prison prison;

	private int braceletId;
	// HB=Heart Beat
	private int maxHB;
	// HB=Heart Beat
	private int minHB;

	@Column(columnDefinition = "boolean default false")
	private boolean alertOff;

	@ManyToOne
	@JoinColumn(name = "userId", referencedColumnName = "userId", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private User createdBy;

	@CreationTimestamp
	private LocalDateTime createdTimestamp;

	@Column(columnDefinition = "boolean default false")
	private boolean deleted;

	public Prisoner() {
	}

	public Prisoner(Long prisonerId, String identifierId, Date birthDate,
			String nationality, String name, String photo, int contact,
			int alternativeContact, int cell, int threatLevel, Prison prison, int braceletId,
			int maxHB, int minHB, boolean alertOff, User createdBy, LocalDateTime createdTimestamp, boolean deleted) {
		super();
		this.prisonerId = prisonerId;
		this.identifierId = identifierId;
		this.birthDate = birthDate;
		this.nationality = nationality;
		this.name = name;
		this.photo = photo;
		this.contact = contact;
		this.alternativeContact = alternativeContact;
		this.cell = cell;
		this.threatLevel = threatLevel;
		this.prison = prison;
		this.braceletId = braceletId;
		this.maxHB = maxHB;
		this.minHB = minHB;
		this.alertOff = alertOff;
		this.createdBy = createdBy;
		this.createdTimestamp = createdTimestamp;
		this.deleted = deleted;
	}

	public Long getPrisonerId() {
		return prisonerId;
	}

	public String getIdentifierId() {
		return identifierId;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public String getNationality() {
		return nationality;
	}

	public String getName() {
		return name;
	}

	public String getPhoto() {
		return photo;
	}

	public int getContact() {
		return contact;
	}

	public int getAlternativeContact() {
		return alternativeContact;
	}

	public int getCell() {
		return cell;
	}

	public int getThreatLevel() {
		return threatLevel;
	}

	public Prison getPrison() {
		return prison;
	}

	public int getBraceletId() {
		return braceletId;
	}

	public int getMaxHB() {
		return maxHB;
	}

	public int getMinHB() {
		return minHB;
	}

	public boolean isAlertOff() {
		return alertOff;
	}

	public User getCreatedBy() {
		return createdBy;
	}

	public LocalDateTime getCreatedTimestamp() {
		return createdTimestamp;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setPrisonerId(Long prisonerId) {
		this.prisonerId = prisonerId;
	}

	public void setIdentifierId(String identifierId) {
		this.identifierId = identifierId;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public void setNationality(String nationality) {
		this.nationality = nationality;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public void setContact(int contact) {
		this.contact = contact;
	}

	public void setAlternativeContact(int alternativeContact) {
		this.alternativeContact = alternativeContact;
	}

	public void setCell(int cell) {
		this.cell = cell;
	}

	public void setThreatLevel(int threatLevel) {
		this.threatLevel = threatLevel;
	}

	public void setPrison(Prison prison) {
		this.prison = prison;
	}

	public void setBraceletId(int braceletId) {
		this.braceletId = braceletId;
	}

	public void setMaxHB(int maxHB) {
		this.maxHB = maxHB;
	}

	public void setMinHB(int minHB) {
		this.minHB = minHB;
	}

	public void setAlertOff(boolean alertOff) {
		this.alertOff = alertOff;
	}

	public void setCreatedBy(User createdBy) {
		this.createdBy = createdBy;
	}

	public void setCreatedTimestamp(LocalDateTime createdTimestamp) {
		this.createdTimestamp = createdTimestamp;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	

}