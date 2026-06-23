package mk.finki.ukim.emt_lab_b.domain.exceptions;

public class UserNotFoundException extends Exception {
    public UserNotFoundException(String username) {
        super("User with username '%s' does not exist.".formatted(username));
    }
}
