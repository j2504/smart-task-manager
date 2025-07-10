package com.smarttask.service;

import com.smarttask.model.Task;
import com.smarttask.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
/**
 * Handles core business logic related to tasks.
 */
@Service
@RequiredArgsConstructor // Injects final fields via constructor 
public class TaskService {

	private final TaskRepository repo;
	
	/**
	 * Fetch all tasks.
	 */
	public List<Task> getAllTasks(){
		return repo.findAll();
	}
	
	/**
	 * Create a new task.
	 */
	public Task addTask(Task task) {
		return repo.save(task);
	}
	
	/**
	 * Update status of an existing task.
	 */
	public Task updateTask(Long id, Task updatedTask) {
		Task task = repo.findById(id).orElseThrow();
		task.setStatus(updatedTask.getStatus());
		return repo.save(task);
	}
	
	/**
	 * Delete a task 
	 */
	public void deleteTask(Long id) {
		repo.deleteById(id);
	}
}
