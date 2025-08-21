package com.smarttask.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {

		private final JavaMailSender mailSender;
		/**
		 * Sends a welcome email
		 */
		public void sendWelcomeEmail(String toEmail, String userName) {
			SimpleMailMessage message = new SimpleMailMessage();
			message.setTo(toEmail);
			message.setSubject("Welcome to Smart Task Manager 🎉 ");
			message.setText( "Hello " + userName + ", thanks for registering! You can now log in and manage your tasks 🚀");
			mailSender.send(message);
		}
}
