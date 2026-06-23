package mk.finki.ukim.emt_lab_b.domain.dtos;

import mk.finki.ukim.emt_lab_b.domain.enums.Role;
import mk.finki.ukim.emt_lab_b.domain.models.User;

public record RegisterUserResponseDto(
        String username,
        String name,
        String surname,
        String email,
        Role role
) {
    public static RegisterUserResponseDto from(User user) {
        return new RegisterUserResponseDto(
                user.getUsername(),
                user.getName(),
                user.getSurname(),
                user.getEmail(),
                user.getRole()
        );
    }
}

