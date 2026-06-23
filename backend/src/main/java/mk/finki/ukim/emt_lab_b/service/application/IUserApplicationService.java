package mk.finki.ukim.emt_lab_b.service.application;

import mk.finki.ukim.emt_lab_b.domain.dtos.LoginUserRequestDto;
import mk.finki.ukim.emt_lab_b.domain.dtos.LoginUserResponseDto;
import mk.finki.ukim.emt_lab_b.domain.dtos.RegisterUserRequestDto;
import mk.finki.ukim.emt_lab_b.domain.dtos.RegisterUserResponseDto;
import mk.finki.ukim.emt_lab_b.domain.exceptions.UserNotFoundException;

import java.util.Optional;

public interface IUserApplicationService {
    Optional<RegisterUserResponseDto> register(RegisterUserRequestDto registerUserRequestDto);

    Optional<LoginUserResponseDto> login(LoginUserRequestDto loginUserRequestDto) throws UserNotFoundException;

    Optional<RegisterUserResponseDto> findByUsername(String username);
}

