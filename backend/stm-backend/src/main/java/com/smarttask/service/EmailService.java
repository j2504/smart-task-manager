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
		 * Sends a simple text email
		 */
		public void sendEmail(String to, String subject, String text) {
			SimpleMailMessage message = new SimpleMailMessage();
			message.setTo(to);
			message.setSubject(subject);
			message.setText(text);
			message.setFrom("jerryjr0425@gmail.com");
			mailSender.send(message);
		}
}
