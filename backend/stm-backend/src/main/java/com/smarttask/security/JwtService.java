package com.smarttask.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.smarttask.model.User;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;


import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;


/*
 * JwtService handles generation and validation of JWT tokens
 */

@Service
public class JwtService {

    // Base64-encoded secret key from config (must be ≥256 bits for HS256)
    @Value("${jwt.secret}")
    private String secretKey;

    // Token expiration time in milliseconds (e.g. 1 day)
    @Value("${jwt.expiration}")
    private long jwtExpiration;

    // Secure key object used for signing and parsing JWTs
    private SecretKey key;

    /**
     * Initializes the secure key and expiration fallback.
     * This runs once after bean creation.
     */
    @PostConstruct
    private void init() {
        if (secretKey == null || secretKey.trim().isEmpty()) {
            throw new IllegalStateException("JWT secret key must be set and Base64-encoded");
        }

        // Decode Base64 string and create a secure SecretKey
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        key = Keys.hmacShaKeyFor(keyBytes); // Ensures key meets HS256 spec

        if (jwtExpiration == 0) {
            jwtExpiration = 86400000; // fallback to 1 day
        }
    }

    /**
     * Generates a JWT for a user with optional claims.
     * @param user The authenticated user
     * @return Signed JWT string
     */
    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, user.getUserName());
    }

    /**
     * Validates token and checks if it belongs to the user.
     * @param token JWT string
     * @param userDetails Spring Security user details
     * @return true if valid and matches user
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    /**
     * Extracts username (subject) from token.
     * @param token JWT string
     * @return Username
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Checks if token is expired.
     * @param token JWT string
     * @return true if expired
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Extracts expiration date from token.
     * @param token JWT string
     * @return Expiration date
     */
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Extracts a claim using a resolver function.
     * @param token JWT string
     * @param claimsResolver Function to extract specific claim
     * @param <T> Type of claim
     * @return Extracted claim
     */
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Parses and validates JWT using the secure key.
     * @param token JWT string
     * @return Claims object
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Builds the JWT with claims and signs it securely.
     * @param claims Custom claims
     * @param subject Username or user ID
     * @return Signed JWT string
     */
    private String createToken(Map<String, Object> claims, String subject) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + jwtExpiration);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}
