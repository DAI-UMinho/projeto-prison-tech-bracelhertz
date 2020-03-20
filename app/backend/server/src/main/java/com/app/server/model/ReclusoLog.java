package com.app.server.model;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="recluso_log")
public class ReclusoLog {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_recluso_log;
	
	@ManyToOne
    @JoinColumn(name = "updated_by", referencedColumnName = "id_user", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
	private Utilizador updated_by;
	
	@ManyToOne
    @JoinColumn(name = "recluso_updated", referencedColumnName = "id_recluso", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
	private Recluso recluso_updated;
	
	private String descricao;
	
	@CreationTimestamp
	private LocalDateTime updated_timestamp;

	public ReclusoLog(Long id_recluso_log, Utilizador updated_by, Recluso recluso_updated, String descricao,
			LocalDateTime updated_timestamp) {
		super();
		this.id_recluso_log = id_recluso_log;
		this.updated_by = updated_by;
		this.recluso_updated = recluso_updated;
		this.descricao = descricao;
		this.updated_timestamp = updated_timestamp;
	}

	public Long getId_recluso_log() {
		return id_recluso_log;
	}

	public void setId_recluso_log(Long id_recluso_log) {
		this.id_recluso_log = id_recluso_log;
	}

	public Utilizador getUpdated_by() {
		return updated_by;
	}

	public void setUpdated_by(Utilizador updated_by) {
		this.updated_by = updated_by;
	}

	public Recluso getRecluso_updated() {
		return recluso_updated;
	}

	public void setRecluso_updated(Recluso recluso_updated) {
		this.recluso_updated = recluso_updated;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public LocalDateTime getUpdated_timestamp() {
		return updated_timestamp;
	}

	public void setUpdated_timestamp(LocalDateTime updated_timestamp) {
		this.updated_timestamp = updated_timestamp;
	}

	
}
