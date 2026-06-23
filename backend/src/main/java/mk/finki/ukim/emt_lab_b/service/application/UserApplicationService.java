package mk.finki.ukim.emt_lab_b.service.application;

import mk.finki.ukim.emt_lab_b.domain.dtos.LoginUserRequestDto;
import mk.finki.ukim.emt_lab_b.domain.dtos.LoginUserResponseDto;
import mk.finki.ukim.emt_lab_b.domain.dtos.RegisterUserRequestDto;
import mk.finki.ukim.emt_lab_b.domain.dtos.RegisterUserResponseDto;
import mk.finki.ukim.emt_lab_b.domain.exceptions.UserNotFoundException;
import mk.finki.ukim.emt_lab_b.domain.models.User;
import mk.finki.ukim.emt_lab_b.helpers.JwtHelper;
import mk.finki.ukim.emt_lab_b.service.domain.UserService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserApplicationService implements IUserApplicationService{
    private final UserService userService;
    private final JwtHelper jwtHelper;

    public UserApplicationService(UserService userService, JwtHelper jwtHelper) {
        this.userService = userService;
        this.jwtHelper = jwtHelper;
    }

    @Override
    public Optional<RegisterUserResponseDto> register(RegisterUserRequestDto registerUserRequestDto) {
        User user = userService.register(registerUserRequestDto.toUser());
        RegisterUserResponseDto displayUserDto = RegisterUserResponseDto.from(user);
        return Optional.of(displayUserDto);
    }

    @Override
    public Optional<LoginUserResponseDto> login(LoginUserRequestDto loginUserRequestDto) throws UserNotFoundException {
        User user = userService.login(loginUserRequestDto.username(), loginUserRequestDto.password());

        String token = jwtHelper.generateToken(user);

        return Optional.of(new LoginUserResponseDto(token));
    }

    @Override
    public Optional<RegisterUserResponseDto> findByUsername(String username) {
        return userService
                .findByUsername(username)
                .map(RegisterUserResponseDto::from);
    }

}
