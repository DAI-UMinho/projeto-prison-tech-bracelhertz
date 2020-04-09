package com.app.server.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.server.repository.UserLogRepository;
import com.app.server.repository.UserRepository;
import com.app.server.security.CurrentUser;
import com.app.server.security.UserPrincipal;
import com.app.server.model.User;
import com.app.server.model.UserLog;

@RestController
@RequestMapping(value = "/api")
public class UserLogController {

	@Autowired
	UserLogRepository userLogRepository;

	@Autowired
	UserRepository userRepository;

	@PreAuthorize("hasRole('NETWORKMAN')")
	@GetMapping("/user-logs")
	public List<UserLog> listUserLog() {
		return userLogRepository.findAllByOrderByLogTimestampAsc();
	}

	@PreAuthorize("hasRole('MANAGER')")
	@GetMapping("/user-logs/managers")
	public Optional<List<UserLog>> listUserLog(@CurrentUser UserPrincipal currentUser) {
		User userLogged = userRepository.findByUserId(currentUser.getId());
		return userLogRepository.findByUserLogPrisonId(userLogged.getPrison());
	}

	/*
	 * @GetMapping("/user-logs/{userLogId}") public UserLog
	 * listUserLog(@PathVariable(value = "userLogId") long userLogId) { return
	 * userLogRepository.findByUserLogId(userLogId); }
	 */

	/*
	 * @PostMapping("/user-logs") public UserLog saveUserLog(@RequestBody UserLog
	 * userLog) { System.out.println(userLog.toString()); return
	 * userLogRepository.save(userLog); }
	 */

	/*
	 * @PutMapping("/user-logs") public UserLog updateUserLog(@RequestBody UserLog
	 * userLog) { return userLogRepository.save(userLog); }
	 */

	/*
	 * @DeleteMapping("/user-logs/{userLogId}") public void
	 * deleteUserLog(@PathVariable(value = "userLogId") long userLogId) {
	 * userLogRepository.deleteById(userLogId); }
	 */
}