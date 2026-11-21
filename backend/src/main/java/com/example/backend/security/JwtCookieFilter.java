package com.example.backend.security;

import com.example.backend.user.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
public class JwtCookieFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws ServletException, IOException {
        if (req.getCookies() != null) {
            for (Cookie cookie : req.getCookies()) {
                if (!"token".equals(cookie.getName())) {
                    continue;
                }

                String userId = jwtService.verifyAndGetUserId(cookie.getValue());
                if (userId != null) {
                    userRepository.findById(userId).ifPresent(user -> {
                        var authentication = new UsernamePasswordAuthenticationToken(
                                userId, null,
                                List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name())));
                        var context = SecurityContextHolder.createEmptyContext();
                        context.setAuthentication(authentication);
                        SecurityContextHolder.setContext(context);
                    });
                }
                break;
            }
        }
        chain.doFilter(req, res);
    }
}
