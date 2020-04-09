package com.app.server.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.app.server.exception.AppException;
import com.app.server.exception.ResourceNotFoundException;
import com.app.server.model.Role;
import com.app.server.model.RoleName;
import com.app.server.model.User;
import com.app.server.payload.request.LoginRequest;
import com.app.server.payload.response.ApiResponse;
import com.app.server.payload.response.JwtAuthenticationResponse;
import com.app.server.payload.response.JwtAuthenticationResponseRole;
import com.app.server.repository.RoleRepository;
import com.app.server.repository.UserRepository;
import com.app.server.security.JwtTokenProvider;
import com.app.server.util.CookieUtils;

@Service
public class AuthService {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	JwtTokenProvider tokenProvider;

	public ResponseEntity<?> authenticateJustUser(@Valid @RequestBody LoginRequest loginRequest,
			HttpServletResponse response) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		User user = userRepository.findByUsername(loginRequest.getUsername())
				.orElseThrow(() -> new ResourceNotFoundException("User", "email", loginRequest.getUsername()));

		Set<Role> roles = user.getRoles();
		Role userRole = roleRepository.findByName(RoleName.ROLE_GUARD)
				.orElseThrow(() -> new AppException("User role not set."));

		if (!isUser(roles, userRole)) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(false, "You're not a User"), HttpStatus.FORBIDDEN);
		}

		Date today = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String strDate = dateFormat.format(today);
		try {
			Date date = dateFormat.parse(strDate);
			user.setLastLogin(date);
		} catch (ParseException e) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Failed to parse Date"),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

		userRepository.save(user);

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String jwt = tokenProvider.generateToken(authentication);
		CookieUtils.addCookie(response, "token", jwt, 604800000);

		return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
	}

	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest,
			HttpServletResponse response) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		User user = userRepository.findByUsername(loginRequest.getUsername())
				.orElseThrow(() -> new ResourceNotFoundException("User", "email", loginRequest.getUsername()));

		Date today = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String strDate = dateFormat.format(today);
		try {
			Date date = dateFormat.parse(strDate);
			user.setLastLogin(date);
		} catch (ParseException e) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Failed to parse Date"),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
		String roleString = "";
		Set<Role> roles = user.getRoles();
		for (Role role : roles) {
			roleString = role.getName().toString();
		}
		userRepository.save(user);

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String jwt = tokenProvider.generateToken(authentication);
		CookieUtils.addCookie(response, "token", jwt, 604800000);

		return ResponseEntity.ok(new JwtAuthenticationResponseRole(jwt, roleString, user.getUserId()));
	}

	public ResponseEntity<ApiResponse> logoutUser(HttpServletRequest request, HttpServletResponse response) {
		boolean isOK = CookieUtils.deleteCookie(request, response, "token");

		if (isOK == true) {
			return ResponseEntity.ok().body(new ApiResponse(true, "User logged out successfully"));
		}

		return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Must be logged in to logout"),
				HttpStatus.PRECONDITION_FAILED);
	}

	private boolean isUser(Set<Role> roles, Role userRole) {
		boolean isUser = false;

		for (Role role : roles) {
			if (role.equals(userRole)) {
				isUser = true;
			}
		}

		return isUser;
	}
}
