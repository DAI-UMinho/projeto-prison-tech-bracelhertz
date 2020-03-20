package com.app.server.model;

import java.util.Date;

import javax.persistence.Entity;
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
import com.sun.istack.NotNull;



@Entity
@Table(name="registo_criminal")
public class RegistoCriminal {

	@Id
	private Long id_registo_criminal;
	
	
	@ManyToOne()
    @JoinColumn(name = "id_recluso", referencedColumnName = "id_recluso", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore()
	private Recluso id_recluso;
	
	
	@NotBlank
	@NotNull
	private String nome;

	
	private String descrição;
	
	@Temporal(TemporalType.DATE)
	private Date data_imitido;

	public RegistoCriminal() {}

	public RegistoCriminal(Long id_registo_criminal, Recluso id_recluso, @NotBlank String nome, String descrição,
			Date data_imitido) {
		super();
		this.id_registo_criminal = id_registo_criminal;
		this.id_recluso = id_recluso;
		this.nome = nome;
		this.descrição = descrição;
		this.data_imitido = data_imitido;
	}

	public Long getId_registo_criminal() {
		return id_registo_criminal;
	}

	public void setId_registo_criminal(Long id_registo_criminal) {
		this.id_registo_criminal = id_registo_criminal;
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

	public String getDescrição() {
		return descrição;
	}

	public void setDescrição(String descrição) {
		this.descrição = descrição;
	}

	public Date getData_imitido() {
		return data_imitido;
	}

	public void setData_imitido(Date data_imitido) {
		this.data_imitido = data_imitido;
	}


}