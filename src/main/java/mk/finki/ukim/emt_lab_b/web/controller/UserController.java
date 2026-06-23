package mk.finki.ukim.emt_lab_b.web.controller;

import mk.finki.ukim.emt_lab_b.domain.dtos.LoginUserRequestDto;
import mk.finki.ukim.emt_lab_b.domain.dtos.LoginUserResponseDto;
import mk.finki.ukim.emt_lab_b.domain.dtos.RegisterUserRequestDto;
import mk.finki.ukim.emt_lab_b.domain.dtos.RegisterUserResponseDto;
import mk.finki.ukim.emt_lab_b.domain.exceptions.UserNotFoundException;
import mk.finki.ukim.emt_lab_b.domain.models.User;
import mk.finki.ukim.emt_lab_b.service.application.IUserApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final IUserApplicationService userApplicationService;

    public UserController(IUserApplicationService userApplicationService) {
        this.userApplicationService = userApplicationService;
    }

    @GetMapping("/{username}")
    public ResponseEntity<RegisterUserResponseDto> findByUsername(@PathVariable String username) {
        return userApplicationService
                .findByUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/me")
    public ResponseEntity<RegisterUserResponseDto> me(@AuthenticationPrincipal User user) {
        return userApplicationService
                .findByUsername(user.getUsername())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterUserResponseDto> register(@RequestBody RegisterUserRequestDto registerUserRequestDto) {
        return userApplicationService
                .register(registerUserRequestDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

    @PostMapping("/login")
    public ResponseEntity<LoginUserResponseDto> login(@RequestBody LoginUserRequestDto loginUserRequestDto) throws UserNotFoundException {
        return userApplicationService
                .login(loginUserRequestDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }
}

