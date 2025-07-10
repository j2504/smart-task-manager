package com.smarttask.controller;

import com.smarttask.model.Task;
import com.smarttask.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
	
	@GetMapping
	public List<Task> getAllTasks(){
		return taskService.getAllTasks();
	}
	
	@PostMapping
	public Task createTask(@RequestBody Task task) {
		return taskService.addTask(task);
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
