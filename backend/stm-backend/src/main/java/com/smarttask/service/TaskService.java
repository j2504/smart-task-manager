package com.smarttask.service;

import com.smarttask.model.Task;
import com.smarttask.model.User;
import com.smarttask.repository.TaskRepository;
import com.smarttask.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Handles core business logic related to tasks.
 */
@Service
@RequiredArgsConstructor // Injects final fields via constructor
public class TaskService {

    private final TaskRepository repo;
    private final UserRepository userRepo;

    /**
     * Fetch all tasks for the currently authenticated user.
     */
    public List<Task> getAllTasks() {
        User currentUser = getCurrentUser();
        return repo.findByUser(currentUser);
    }

    /**
     * Adds a new task and assigns it to the authenticated user.
     */
    public Task addTask(Task task, User user) {
        
        task.setUser(user); // Associate task with the logged-in user
        return repo.save(task);
    }

    /**
     * Update status of an existing task (only if owned by current user).
     */
    public Task updateTask(Long id, Task updatedTask) {
        User currentUser = getCurrentUser();
        Task task = repo.findById(id).orElseThrow();
        if (!task.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized to update this task");
        }
        task.setStatus(updatedTask.getStatus());
        return repo.save(task);
    }

    /**
     * Delete a task (only if owned by current user).
     */
    public void deleteTask(Long id) {
        User currentUser = getCurrentUser();
        Task task = repo.findById(id).orElseThrow();
        if (!task.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized to delete this task");
        }
        repo.delete(task);
    }

    /**
     * Helper: Get the currently authenticated User from DB.
     */
    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepo.findByUserName(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
