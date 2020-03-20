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

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="receita_medica")
public class ReceitaMedica{
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_receita;
	
	@ManyToOne
	@JoinColumn(name = "id_recluso", referencedColumnName = "id_recluso" , nullable = true)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private Recluso id_recluso; 
	
	
	@NotBlank
    private String nome;
	
    private String descricao;
	
	@NotBlank
	@CreationTimestamp
	private LocalDateTime created_timestamp;
	
	@CreationTimestamp
	private LocalDateTime last_updated_timestamp;
	
	public ReceitaMedica() {
		
	}

	public ReceitaMedica(Long id_receita, Recluso id_recluso, @NotBlank String nome, String descricao,
			@NotBlank LocalDateTime created_timestamp, LocalDateTime last_updated_timestamp) {
		super();
		this.id_receita = id_receita;
		this.id_recluso = id_recluso;
		this.nome = nome;
		this.descricao = descricao;
		this.created_timestamp = created_timestamp;
		this.last_updated_timestamp = last_updated_timestamp;
	}

	public Long getId_receita() {
		return id_receita;
	}

	public void setId_receita(Long id_receita) {
		this.id_receita = id_receita;
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
