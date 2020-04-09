package com.app.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.server.payload.request.ListDashboard;
import com.app.server.repository.AlertLogRepository;
import com.app.server.repository.PrisonerRepository;
import com.app.server.repository.UserRepository;

@RestController
@RequestMapping(value = "/api")
public class DashboardController {

	@Autowired
	UserRepository userRepository;

	@Autowired
	PrisonerRepository prisonerRepository;

	@Autowired
	AlertLogRepository alertLogRepository;

	@PreAuthorize("hasRole('MANAGER') or hasRole('NETWORKMAN')")
	@GetMapping("/dashboard")
	public ListDashboard listDashboard() {
		int totalUsers = userRepository.findAll().size();
		int totalPrisoners = prisonerRepository.findAll().size();
		int totalAlertLogs = alertLogRepository.findAll().size();

		ListDashboard dashboard = new ListDashboard(totalUsers, totalPrisoners, totalAlertLogs);

		return dashboard;
	}
}
