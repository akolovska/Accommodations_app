package mk.finki.ukim.emt_lab_b.domain.exceptions;

public class HostNotFoundException extends RuntimeException {
    public HostNotFoundException(Long id) {
        super("Host with id %d not found" .formatted(id));
    }
}
