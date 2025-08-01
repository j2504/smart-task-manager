package com.smarttask.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
/*
 * LoginRequest- represents login credentials (userName + password)*/

public class LoginRequest {
	private String userName;
	private String password;
}
