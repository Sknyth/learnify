package com.example.backend.user;

import java.util.Locale;
import java.util.regex.Pattern;

public final class EmailAddress {
    private static final Pattern FORMAT = Pattern.compile("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");

    private EmailAddress() {}

    public static String normalize(String email) {
        if (email == null) {
            throw new IllegalArgumentException("Email is required");
        }

        String normalized = email.trim().toLowerCase(Locale.ROOT);
        if (!FORMAT.matcher(normalized).matches()) {
            throw new IllegalArgumentException("Invalid email");
        }
        return normalized;
    }
}
