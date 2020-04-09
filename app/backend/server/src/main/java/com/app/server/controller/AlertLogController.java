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

import com.app.server.model.AlertLog;
import com.app.server.repository.AlertLogRepository;

@RestController
@RequestMapping(value = "/api")
public class AlertLogController {

	@Autowired
	AlertLogRepository alertLogRepository;

	@GetMapping("/alert-logs")
	public List<AlertLog> listAlertLog() {
		return alertLogRepository.findAll();
	}

	@GetMapping("/alert-logs/{alertLogId}")
	public AlertLog listAlertLog(@PathVariable(value = "alertLogId") long alertLogId) {
		return alertLogRepository.findById(alertLogId);
	}

	@PostMapping("/alert-logs")
	public AlertLog saveAlertLog(@RequestBody AlertLog alertLog) {
		return alertLogRepository.save(alertLog);
	}

	@PutMapping("/alert-logs")
	public AlertLog updateAlertLog(@RequestBody AlertLog alertLog) {
		return alertLogRepository.save(alertLog);
	}

	@DeleteMapping("/alert-logs/{alertLogId}")
	public void deleteAlertLog(@PathVariable(value = "alertLogId") long alertLogId) {
		alertLogRepository.deleteById(alertLogId);
	}
}