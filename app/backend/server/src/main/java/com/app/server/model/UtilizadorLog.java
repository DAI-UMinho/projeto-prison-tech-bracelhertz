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
@Table(name="utilizador_log")
public class UtilizadorLog {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_user_log;
	
	@ManyToOne
    @JoinColumn(name = "updated_by", referencedColumnName = "id_user", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
	private Utilizador updated_by;
	
	@ManyToOne
    @JoinColumn(name = "user_updated", referencedColumnName = "id_user", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
	private Utilizador user_updated;
	
	private String descricao;
	
	
	@CreationTimestamp
	private LocalDateTime updated_timestamp;

	public UtilizadorLog(Long id_user_log, Utilizador updated_by, Utilizador user_updated, String descricao,
			LocalDateTime updated_timestamp) {
		super();
		this.id_user_log = id_user_log;
		this.updated_by = updated_by;
		this.user_updated = user_updated;
		this.descricao = descricao;
		this.updated_timestamp = updated_timestamp;
	}

	public Long getId_user_log() {
		return id_user_log;
	}

	public void setId_user_log(Long id_user_log) {
		this.id_user_log = id_user_log;
	}

	public Utilizador getUpdated_by() {
		return updated_by;
	}

	public void setUpdated_by(Utilizador updated_by) {
		this.updated_by = updated_by;
	}

	public Utilizador getUser_updated() {
		return user_updated;
	}

	public void setUser_updated(Utilizador user_updated) {
		this.user_updated = user_updated;
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
