package com.app.server.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.server.model.Anotation;
import com.app.server.repository.AnotationRepository;


@RestController
@RequestMapping(value = "/api")
public class AnotationController {

	@Autowired
	AnotationRepository anotationRepository;
	
	@GetMapping("/anotations")
	public List<Anotation> listAnotation(){
		return anotationRepository.findAll();
	}
	
	/*
	@GetMapping("/anotacao/{id_anotacao}")
	public Optional<List<Agenda>> listAgenda(@PathVariable(value="id_anotacao") long id_anotacao){
		return anotacaoController.findByIdAnotacao(id_agenda);
	}
	*/

	@GetMapping("/anotations/{anotationId}")
	public Anotation listAnotation(@PathVariable(value="anotationId") long anotationId){
		return anotationRepository.findById(anotationId);
	}
	
	@PostMapping("/anotations")
	public Anotation saveAnotation(@RequestBody Anotation anotation) {
		return anotationRepository.save(anotation);
	}
	
	@PutMapping("/anotations")
	public Anotation updateAnotation(@RequestBody Anotation anotation) {
		return anotationRepository.save(anotation);
	}
	
	@DeleteMapping("/anotations/{anotationId}")
	public void deleteAnotation(@PathVariable(value="anotationId") long anotationId){
		anotationRepository.deleteById(anotationId);
	}
	

}