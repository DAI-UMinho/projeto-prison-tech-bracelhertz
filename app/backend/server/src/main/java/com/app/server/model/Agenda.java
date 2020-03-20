package com.app.server.model;

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

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="agenda")
public class Agenda {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long id_agenda;
	
	@ManyToOne
    @JoinColumn(name = "id_user", referencedColumnName = "id_user", nullable = true)
	@OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
	private Utilizador id_user;
	
	@ManyToOne
    @JoinColumn(name = "id_recluso", referencedColumnName = "id_recluso", nullable = true)
	@OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
	private Recluso id_recluso;
	
	@NotBlank
	private String nome;
	
	private String descricao;
	
	@Temporal(TemporalType.DATE)
	@NotBlank
	private Date data_inicio;
	
	@Temporal(TemporalType.DATE)
	@NotBlank
	private Date data_fim;

	public Agenda() {
		
	}

	public Agenda(Long id_agenda, Utilizador id_user, Recluso id_recluso, String nome, String descricao,
			Date data_inicio, Date data_fim) {
		super();
		this.id_agenda = id_agenda;
		this.id_user = id_user;
		this.id_recluso = id_recluso;
		this.nome = nome;
		this.descricao = descricao;
		this.data_inicio = data_inicio;
		this.data_fim = data_fim;
	}

	public Long getId_agenda() {
		return id_agenda;
	}

	public void setId_agenda(Long id_agenda) {
		this.id_agenda = id_agenda;
	}

	public Utilizador getId_user() {
		return id_user;
	}

	public void setId_user(Utilizador id_user) {
		this.id_user = id_user;
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

	public Date getData_inicio() {
		return data_inicio;
	}

	public void setData_inicio(Date data_inicio) {
		this.data_inicio = data_inicio;
	}

	public Date getData_fim() {
		return data_fim;
	}

	public void setData_fim(Date data_fim) {
		this.data_fim = data_fim;
	}

	
}
