package com.smarttask.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smarttask.model.User;
import com.smarttask.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	
	@PostMapping("/register")
	public User registerUser(@RequestBody User user) {
		return userRepository.save(user);
	}
}