package com.app.server.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;

@Entity
@Table(name="anotacao")
public class Anotacao{
	
	
	@Id
	private Long id_anotacao;
	
	
	@ManyToOne()
    @JoinColumn(name = "created_by", referencedColumnName = "id_user", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore()
	private Utilizador created_by;
	
	@ManyToOne()
    @JoinColumn(name = "id_utilizador_destino", referencedColumnName = "id_user", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore()
	private Utilizador id_utilizador_destino;
	
	
	@ManyToOne()
    @JoinColumn(name = "id_instituicao", referencedColumnName = "id_instituicao", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore()
	private Instituicao id_instituicao;
	
	
	@ManyToOne()
    @JoinColumn(name = "id_recluso", referencedColumnName = "id_recluso", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore()
	private Recluso id_recluso;
	
	
	@NotNull
	private String titulo;
	
	
	@NotNull
	private String descricao;
	
	@CreationTimestamp
	private Date created_timestamp;
	
	@UpdateTimestamp
	private Date last_updated_timestamp;

	public Anotacao() {
	}

	public Anotacao(Long id_anotacao, Utilizador created_by, Utilizador id_utilizador_destino, Instituicao id_instituicao,
			Recluso id_recluso, String titulo, String descricao, Date created_timestamp, Date last_updated_timestamp) {
		super();
		this.id_anotacao = id_anotacao;
		this.created_by = created_by;
		this.id_utilizador_destino = id_utilizador_destino;
		this.id_instituicao = id_instituicao;
		this.id_recluso = id_recluso;
		this.titulo = titulo;
		this.descricao = descricao;
		this.created_timestamp = created_timestamp;
		this.last_updated_timestamp = last_updated_timestamp;
	}

	public Long getId_anotacao() {
		return id_anotacao;
	}

	public void setId_anotacao(Long id_anotacao) {
		this.id_anotacao = id_anotacao;
	}

	public Utilizador getCreated_by() {
		return created_by;
	}

	public void setCreated_by(Utilizador created_by) {
		this.created_by = created_by;
	}

	public Utilizador getId_Utilizador_destino() {
		return id_utilizador_destino;
	}

	public void setId_Utilizador_destino(Utilizador id_utilizador_destino) {
		this.id_utilizador_destino = id_utilizador_destino;
	}

	public Instituicao getId_instituicao() {
		return id_instituicao;
	}

	public void setId_instituicao(Instituicao id_instituicao) {
		this.id_instituicao = id_instituicao;
	}

	public Recluso getId_recluso() {
		return id_recluso;
	}

	public void setId_recluso(Recluso id_recluso) {
		this.id_recluso = id_recluso;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Date getCreated_timestamp() {
		return created_timestamp;
	}

	public void setCreated_timestamp(Date created_timestamp) {
		this.created_timestamp = created_timestamp;
	}

	public Date getLast_updated_timestamp() {
		return last_updated_timestamp;
	}

	public void setLast_updated_timestamp(Date last_updated_timestamp) {
		this.last_updated_timestamp = last_updated_timestamp;
	}


}