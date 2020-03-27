package com.app.server.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.server.payload.request.LoginRequest;
import com.app.server.payload.response.ApiResponse;
import com.app.server.service.AuthService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;
    
    @GetMapping("/sv")
    public String index() {
        return "Hello there! I'm running.";
    }
    
    @PreAuthorize("isAnonymous()")
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        return authService.authenticateUser(loginRequest, response);
    }
    
    @PreAuthorize("isAnonymous()")
    @PostMapping("/signin/user")
    public ResponseEntity<?> authenticateJustUser(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        return authService.authenticateJustUser(loginRequest, response);
    }  
    
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/logout")
    public ResponseEntity<ApiResponse> logoutUser(HttpServletRequest request, HttpServletResponse response) {
    	return authService.logoutUser(request, response);
    }
       
}