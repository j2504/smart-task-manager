package com.smarttask.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.smarttask.dto.AuthResponse;
import com.smarttask.dto.LoginRequest;
import com.smarttask.dto.RegisterRequest;
import com.smarttask.model.User;
import com.smarttask.repository.UserRepository;
import com.smarttask.security.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
/*
 * AuthService handles user registration and login.
 * It generates JWT tokens after successful authentication*
 */
public class AuthService {
	
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;
	
	/*
	 * Registers a new user and returns a JWT token.
	 */
	public AuthResponse register(RegisterRequest request) {
		User user = User.builder()
				.firstName(request.getFirstName())
				.lastName(request.getLastName())
				.userName(request.getUserName())
				.password(passwordEncoder.encode(request.getPassword()))
				.build();
		
		userRepository.save(user);
		
		String token = jwtService.generateToken(user);
		return new AuthResponse(token);
	}
	
	/*
	 * Authenticates an existing user and returns a JWT token.
	 */
	public AuthResponse login(LoginRequest request) {
		//Perform authentication
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						request.getUserName(), 
						request.getPassword()
				)	
		);
		
		//Load user and generate JWT
		User user = userRepository.findByUserName(request.getUserName())
				.orElseThrow(() -> new RuntimeException("User not found"));
		String token = jwtService.generateToken(user);
		
		return new AuthResponse(token);
	}
}
