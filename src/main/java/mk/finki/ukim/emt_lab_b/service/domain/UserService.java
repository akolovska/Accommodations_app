package mk.finki.ukim.emt_lab_b.service.domain;

import mk.finki.ukim.emt_lab_b.domain.exceptions.IncorrectPasswordException;
import mk.finki.ukim.emt_lab_b.domain.exceptions.UserNotFoundException;
import mk.finki.ukim.emt_lab_b.domain.exceptions.UsernameAlreadyExistsException;
import mk.finki.ukim.emt_lab_b.domain.models.User;
import mk.finki.ukim.emt_lab_b.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User register(User user) {
        if (userRepository.existsByUsername(user.getUsername()))
            throw new UsernameAlreadyExistsException(user.getUsername());
        return userRepository.save(new User(
                user.getName(),
                user.getSurname(),
                user.getEmail(),
                user.getUsername(),
                passwordEncoder.encode(user.getPassword())
        ));
    }

    @Override
    public User login(String username, String password) throws UserNotFoundException {
        User user = userRepository
                .findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException(username));
        if (!passwordEncoder.matches(password, user.getPassword()))
            throw new IncorrectPasswordException();
        return user;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository
                .findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
    }

}
