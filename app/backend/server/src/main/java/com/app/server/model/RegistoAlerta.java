package com.app.server.model;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="registo_alerta")
public class RegistoAlerta {
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long id_registo_alerta;
	
	@ManyToOne
	@JoinColumn(name = "id_recluso", referencedColumnName = "id_recluso", nullable = true)
	@JsonIgnore
	private Recluso id_recluso;
	
	private String nome;
		
	private String descricao;
	
	@CreationTimestamp
	@NotNull
	private LocalDateTime created_timestamp;
	
	@CreationTimestamp
    private LocalDateTime last_updated_timestamp;

	
	public RegistoAlerta() {}


	public RegistoAlerta(Long id_registo_alerta, Recluso id_recluso, String nome, String descricao,
			LocalDateTime created_timestamp, LocalDateTime last_updated_timestamp) {
		super();
		this.id_registo_alerta = id_registo_alerta;
		this.id_recluso = id_recluso;
		this.nome = nome;
		this.descricao = descricao;
		this.created_timestamp = created_timestamp;
		this.last_updated_timestamp = last_updated_timestamp;
	}


	public Long getId_registo_alerta() {
		return id_registo_alerta;
	}


	public void setId_registo_alerta(Long id_registo_alerta) {
		this.id_registo_alerta = id_registo_alerta;
	}


	public Recluso getId_recluso() {
		return id_recluso;
	}


	public void setId_recluso(Recluso id_recluso) {
		this.id_recluso = id_recluso;
	}


	public String getNome() {
		return nome;
	}


	public void setNome(String nome) {
		this.nome = nome;
	}


	public String getDescricao() {
		return descricao;
	}


	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}


	public LocalDateTime getCreated_timestamp() {
		return created_timestamp;
	}


	public void setCreated_timestamp(LocalDateTime created_timestamp) {
		this.created_timestamp = created_timestamp;
	}


	public LocalDateTime getLast_updated_timestamp() {
		return last_updated_timestamp;
	}


	public void setLast_updated_timestamp(LocalDateTime last_updated_timestamp) {
		this.last_updated_timestamp = last_updated_timestamp;
	}



}