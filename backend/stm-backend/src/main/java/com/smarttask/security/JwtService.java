package com.smarttask.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.function.Function;


/*
 * JwtService handles generation and validation of JWT tokens
 */
@Service
public class JwtService {
	
	// Secret Key used to sign the JWT. In production, store securely in environment variables or config
	private static final String SECRET_KEY = "12345678901234567890123456789012"; // Must be at least 256-bit (32 chars)
	
	/*
	 * Extracts the username (subject) from the JWT token
	 */
	public String extractUsername(String token) {
		return extractClaim(token, Claims::getSubject);
	}
	
	/*
	 * Extract a single claim using a resolver
	 */
	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}
	
	/*
	 * Generates a JWT token for the given username
	 */
	public String generateToken(String username) {
		return Jwts.builder()
				.setSubject(username) // Sets the user identifier
				.setIssuedAt(new Date(System.currentTimeMillis())) //Token creation time
				.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) //24 hours expiration
				.signWith(getSignInKey(), SignatureAlgorithm.HS256) //Signs the token
				.compact();
	}
	
	/*
	 *Checks if token is valid (not expired and matches user)
	 */
	public boolean isTokenValid(String token, UserDetails userDetails) {
		final String userName = extractUsername(token);
		return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}
	
	/*
	 * Check if the token has expired
	 */
	private boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}
	
	/*
	 * Extract the expiration date from the token
	 */
	private Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}
	
	/*
	 * Parses and retrieves all claims from the token
	 */
	private Claims extractAllClaims(String token) {
		return Jwts.parserBuilder()
				.setSigningKey(getSignInKey())
				.build()
				.parseClaimsJws(token)
				.getBody();
	}
	
	/*
	 * Returns the signing key used to verify the JWT signature
	 */
	private Key getSignInKey() {
		byte[] keyBytes = SECRET_KEY.getBytes(); //Convert secret key to byte array
		return Keys.hmacShaKeyFor(keyBytes);
				
 	}
}
