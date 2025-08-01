package com.smarttask.repository;


import com.smarttask.model.Task;
import com.smarttask.model.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface for Task.
 * Inherits basic CRUD operations from JpaRepository.
 */
public interface TaskRepository extends JpaRepository<Task, Long> {
	// Custom query method to find tasks owned by a specific user
	List<Task> findByUser(User user);
}
