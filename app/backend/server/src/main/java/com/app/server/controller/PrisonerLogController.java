package com.app.server.controller;

import java.util.List;
//import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.server.repository.PrisonerLogRepository;
import com.app.server.model.PrisonerLog;


@RestController
@RequestMapping(value = "/api")
public class PrisonerLogController {

	@Autowired
	PrisonerLogRepository prisonerLogRepository;
	
	@GetMapping("/prisoner-logs")
	public List<PrisonerLog> listPrisonerLog(){
		return prisonerLogRepository.findAll();
	}
	
	@GetMapping("/prisoner-logs/{prisonerLogId}")
	public PrisonerLog listPrisonerLog(@PathVariable(value="prisonerLogId") long prisonerLogId){
		return prisonerLogRepository.findById(prisonerLogId);
	}
	
	@PostMapping("/prisoner-logs")
	public PrisonerLog savePrisonerLog(@RequestBody PrisonerLog prisonerLog) {
		return prisonerLogRepository.save(prisonerLog);
	}
	
	@PutMapping("/prisoner-logs")
	public PrisonerLog updatePrisonerLog(@RequestBody PrisonerLog prisonerLog) {
		return prisonerLogRepository.save(prisonerLog);
	}
	
	@DeleteMapping("/prisoner-logs/{prisonerLogId}")
	public void deletePrisonerLog(@PathVariable(value="prisonerLogId") long prisonerLogId){
		prisonerLogRepository.deleteById(prisonerLogId);
	}
}