package com.smarttask.model;

import lombok.*;

import java.time.LocalDate;

import jakarta.persistence.*;

/**
 * Represents a Task in the system.
 * Mapped to a database table via JPA.
 */
@Entity
@AllArgsConstructor //Allows full-args constructor for fast object creation
@NoArgsConstructor //Required by JPA
@Data //Generates getters, setters, toString, equals, hashCode
@Builder //Enables builder pattern
public class Task {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) //Auto-incremented ID
	private Long id;
	private String title;
	/**
	 * Task status can be:
	 * - pending
	 * - in-progress
	 * - completed
	 */
	private String status;
	//used to track when a task is due
	private LocalDate dueDate;
	
}
