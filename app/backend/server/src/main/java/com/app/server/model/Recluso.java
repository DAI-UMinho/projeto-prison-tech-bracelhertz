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

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="recluso")
public class Recluso {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_recluso;
	
	@ManyToOne
    @JoinColumn(name = "id_instituicao", referencedColumnName = "id_instituicao", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
	private Instituicao id_instituicao;
	
	private int id_pulseira;
	
	@NotBlank
	private String username;
	
    @Temporal(TemporalType.DATE)
	private Date data_nascimento;
    
    @NotBlank
    private String nacionalidade;
    
    @NotBlank
    private String primeiro_nome;
    
    @NotBlank
    private String ultimo_nome;
    
    @NotBlank
    private String foto;
    
    private int contacto;
    
    private int contacto_alternativo;
    
    private int cela;
    
    private int nivel_ameaca;
    
    private float pulsacao_max;
    
    private float pulsacao_min;
    
	@ManyToOne
    @JoinColumn(name = "id_user", referencedColumnName = "id_user", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
	private Utilizador created_by;
	
	@CreationTimestamp
	private LocalDateTime created_timestamp;
    
    private boolean desligar_alerta;
   
	
	public Recluso() 
	{
	}


	public Recluso(Long id_recluso, Instituicao id_instituicao, int id_pulseira, @NotBlank String username,
			Date data_nascimento, @NotBlank String nacionalidade, @NotBlank String primeiro_nome,
			@NotBlank String ultimo_nome, @NotBlank String foto, int contacto, int contacto_alternativo, int cela,
			int nivel_ameaca, float pulsacao_max, float pulsacao_min, Utilizador created_by,
			LocalDateTime created_timestamp, boolean desligar_alerta) {
		super();
		this.id_recluso = id_recluso;
		this.id_instituicao = id_instituicao;
		this.id_pulseira = id_pulseira;
		this.username = username;
		this.data_nascimento = data_nascimento;
		this.nacionalidade = nacionalidade;
		this.primeiro_nome = primeiro_nome;
		this.ultimo_nome = ultimo_nome;
		this.foto = foto;
		this.contacto = contacto;
		this.contacto_alternativo = contacto_alternativo;
		this.cela = cela;
		this.nivel_ameaca = nivel_ameaca;
		this.pulsacao_max = pulsacao_max;
		this.pulsacao_min = pulsacao_min;
		this.created_by = created_by;
		this.created_timestamp = created_timestamp;
		this.desligar_alerta = desligar_alerta;
	}


	public Long getId_recluso() {
		return id_recluso;
	}


	public void setId_recluso(Long id_recluso) {
		this.id_recluso = id_recluso;
	}


	public Instituicao getId_instituicao() {
		return id_instituicao;
	}


	public void setId_instituicao(Instituicao id_instituicao) {
		this.id_instituicao = id_instituicao;
	}


	public int getId_pulseira() {
		return id_pulseira;
	}


	public void setId_pulseira(int id_pulseira) {
		this.id_pulseira = id_pulseira;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public Date getData_nascimento() {
		return data_nascimento;
	}


	public void setData_nascimento(Date data_nascimento) {
		this.data_nascimento = data_nascimento;
	}


	public String getNacionalidade() {
		return nacionalidade;
	}


	public void setNacionalidade(String nacionalidade) {
		this.nacionalidade = nacionalidade;
	}


	public String getPrimeiro_nome() {
		return primeiro_nome;
	}


	public void setPrimeiro_nome(String primeiro_nome) {
		this.primeiro_nome = primeiro_nome;
	}


	public String getUltimo_nome() {
		return ultimo_nome;
	}


	public void setUltimo_nome(String ultimo_nome) {
		this.ultimo_nome = ultimo_nome;
	}


	public String getFoto() {
		return foto;
	}


	public void setFoto(String foto) {
		this.foto = foto;
	}


	public int getContacto() {
		return contacto;
	}


	public void setContacto(int contacto) {
		this.contacto = contacto;
	}


	public int getContacto_alternativo() {
		return contacto_alternativo;
	}


	public void setContacto_alternativo(int contacto_alternativo) {
		this.contacto_alternativo = contacto_alternativo;
	}


	public int getCela() {
		return cela;
	}


	public void setCela(int cela) {
		this.cela = cela;
	}


	public int getNivel_ameaca() {
		return nivel_ameaca;
	}


	public void setNivel_ameaca(int nivel_ameaca) {
		this.nivel_ameaca = nivel_ameaca;
	}


	public float getPulsacao_max() {
		return pulsacao_max;
	}


	public void setPulsacao_max(float pulsacao_max) {
		this.pulsacao_max = pulsacao_max;
	}


	public float getPulsacao_min() {
		return pulsacao_min;
	}


	public void setPulsacao_min(float pulsacao_min) {
		this.pulsacao_min = pulsacao_min;
	}


	public Utilizador getCreated_by() {
		return created_by;
	}


	public void setCreated_by(Utilizador created_by) {
		this.created_by = created_by;
	}


	public LocalDateTime getCreated_timestamp() {
		return created_timestamp;
	}


	public void setCreated_timestamp(LocalDateTime created_timestamp) {
		this.created_timestamp = created_timestamp;
	}


	public boolean isDesligar_alerta() {
		return desligar_alerta;
	}


	public void setDesligar_alerta(boolean desligar_alerta) {
		this.desligar_alerta = desligar_alerta;
	}



}