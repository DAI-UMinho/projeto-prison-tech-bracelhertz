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

import com.app.server.repository.PrisonRepository;
import com.app.server.model.Prison;



@RestController
@RequestMapping(value = "/api")
public class PrisonController {

	@Autowired
	PrisonRepository prisonRepository;
	
	@GetMapping("/prison")
	public List<Prison> listPrison(){
		return prisonRepository.findAll();
	}
	

	@GetMapping("/prison/{idPrison}")
	public Prison listPrison(@PathVariable(value="PrisonId") long prisonId){
		return prisonRepository.findById(prisonId);
	}
	
	/*
	@GetMapping("/prison/{id_prison}")
	public Optional<List<Prison>> listPrison(@PathVariable(value="id_prison") long id_prison){
		return prisonRepository.findByIdprison(id_prison);
	}
	*/

	
	@PostMapping("/prison")
	public Prison savePrison(@RequestBody Prison prison) {
		return prisonRepository.save(prison);
	}
	
	@PutMapping("/prison")
	public Prison updatePrison(@RequestBody Prison prison) {
		return prisonRepository.save(prison);
	}
	
	@DeleteMapping("/prison/{prisonId}")
	public void deletePrison(@PathVariable(value="prisonId") long prisonId) {
		prisonRepository.deleteById(prisonId);
	}
}