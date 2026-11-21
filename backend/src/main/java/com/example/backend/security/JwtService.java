package com.example.backend.security;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    private final SecretKey key;
    private final JwtParser parser;

    public JwtService(@Value("${jwt.secret}") String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.parser = Jwts.parser().verifyWith(key).build();
    }

    public String generateToken(String userId, String role) {
        return Jwts.builder()
                .subject(userId)
                .claim("role", role)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 7L * 24 * 60 * 60 * 1000))
                .signWith(key)
                .compact();
    }

    public String verifyAndGetUserId(String token) {
        try {
            var claims = parser.parseSignedClaims(token).getPayload();
            String userId = claims.getSubject();
            return claims.getExpiration() != null && userId != null && !userId.isBlank() ? userId : null;
        } catch (JwtException | IllegalArgumentException e) {
            return null;
        }
    }
}
