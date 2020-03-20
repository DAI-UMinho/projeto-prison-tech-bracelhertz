package com.app.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.server.model.Instituicao;

@Repository
public interface InstituicaoRepository extends JpaRepository<Instituicao, Long>{

	Instituicao findById(long id_instituicao);
}
