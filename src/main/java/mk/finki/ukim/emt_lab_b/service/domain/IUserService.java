package mk.finki.ukim.emt_lab_b.service.domain;

import mk.finki.ukim.emt_lab_b.domain.exceptions.UserNotFoundException;
import mk.finki.ukim.emt_lab_b.domain.models.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface IUserService {
    Optional<User> findByUsername(String username);

    User register(User user);

    User login(String username, String password) throws UserNotFoundException;
    public UserDetails loadUserByUsername(String username);
}
