package com.smarttask.service;

import com.smarttask.model.Task;
import com.smarttask.model.User;
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
	 * Adds a new task and assigns it to the authenticated user.
	 */
	public Task addTask(Task task, User user) {
		task.setUser(user); // Associate the task with the user
		return repo.save(task); // Save and return the task
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
	
	/*
	 * Retrieves all tasks that belong to a specific user
	 */
	public List<Task> getTasksByUser(User user){
		return repo.findByUser(user);
	}
}
