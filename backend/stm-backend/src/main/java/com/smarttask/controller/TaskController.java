package com.smarttask.controller;

import com.smarttask.model.Task;
import com.smarttask.model.User;
import com.smarttask.service.TaskService;
import com.smarttask.service.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import java.util.List;

/**
 * Exposes RESTful API endpoints for Task management.
 */

@CrossOrigin(origins = "*") // Allow frontend (React) to call this API 
@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {
	
	private final TaskService taskService;
	private final UserService userService;
	
	/*
	 * Get all tasks for the currently authenticated user
	 */
	@GetMapping
	public ResponseEntity<List<Task>> getAllUserTasks(Authentication authentication){
		String username = authentication.getName();
		User user = userService.findByUserName(username);
		
		List<Task> tasks = taskService.getTasksByUser(user);
		return ResponseEntity.ok(tasks);
	}
	
	/*
	 * Creates a new task and assigns it to the authenticated user
	 */
	@PostMapping
	public ResponseEntity<Task> createTask(@RequestBody Task task, Authentication authentication) {
		// Retrieve the current user based on the authentication
		String username = authentication.getName();
		User user = userService.findByUserName(username);
		
		// Call the service to save task and assign it to user
		Task savedTask = taskService.addTask(task, user);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(savedTask);
	}
	
	@PutMapping("/{id}")
	public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
		return taskService.updateTask(id, task);
	}
	
	@DeleteMapping("/{id}")
	public void deleteTask(@PathVariable Long id) {
		taskService.deleteTask(id);
	}
}
