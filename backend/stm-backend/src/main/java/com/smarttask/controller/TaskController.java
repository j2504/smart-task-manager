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

	
	/**
     * Get all tasks for the currently logged-in user.
     */
    @GetMapping
    public ResponseEntity<List<Task>> getTasks(Authentication authentication) {
     
    	return ResponseEntity.ok(taskService.getAllTasks());
    }
	
	/*
	 * Creates a new task and assigns it to the authenticated user
	 */
	@PostMapping
	public ResponseEntity<Task> createTask(@RequestBody Task task, Authentication authentication) {
		
		// Call the service to save task and assign it to user
		Task savedTask = taskService.addTask(task);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(savedTask);
	}
	
	/**
     * Update the status of an existing task (must be owned by current user).
     */
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        return ResponseEntity.ok(taskService.updateTask(id, updatedTask));
    }

    /**
     * Delete a task (must be owned by current user).
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}
