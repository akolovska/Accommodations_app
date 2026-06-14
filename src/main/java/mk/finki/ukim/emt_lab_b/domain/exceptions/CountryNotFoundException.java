package mk.finki.ukim.emt_lab_b.domain.exceptions;

public class CountryNotFoundException extends RuntimeException {
    public CountryNotFoundException(Long id) {
        super("Country with id %d not found" .formatted(id));
    }
}
