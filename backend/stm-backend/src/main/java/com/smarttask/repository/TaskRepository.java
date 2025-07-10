package com.smarttask.repository;


import com.smarttask.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface for Task.
 * Inherits basic CRUD operations from JpaRepository.
 */
public interface TaskRepository extends JpaRepository<Task, Long> {
	//No extra code needed - JpaRepository provides all common operations
}
