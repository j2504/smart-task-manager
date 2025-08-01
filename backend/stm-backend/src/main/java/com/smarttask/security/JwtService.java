package com.smarttask.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.smarttask.model.User;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;


import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;


/*
 * JwtService handles generation and validation of JWT tokens
 */
@Service
public class JwtService {
	
	// Secret key to sign the JWTs (should be stored securely in env vars or config)
    @Value("${jwt.secret}")
    private String secretKey;

    // Token expiration time in milliseconds (e.g. 1 day)
    @Value("${jwt.expiration}")
    private long jwtExpiration;

    @PostConstruct
    private void init() {
        if (secretKey == null || secretKey.trim().isEmpty()) {
            secretKey = "default_secret_key"; // fallback (not recommended in prod)
        }
        if (jwtExpiration == 0) {
            jwtExpiration = 86400000; // fallback to 1 day
        }
    }

    /**
     * Generates a JWT for a user.
     */
    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, user.getUserName());
    }

    /**
     * Validates token and checks if it belongs to the user.
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    /**
     * Extracts username (subject) from token.
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Checks if token is expired.
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Extracts expiration date from token.
     */
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Extracts a claim using a resolver.
     */
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Parses and validates JWT using the secret key.
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey.getBytes())
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Builds the JWT with claims and signs it.
     */
    private String createToken(Map<String, Object> claims, String subject) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + jwtExpiration);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(SignatureAlgorithm.HS256, secretKey.getBytes())
                .compact();
    }
}
