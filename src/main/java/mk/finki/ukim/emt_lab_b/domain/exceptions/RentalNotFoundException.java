package mk.finki.ukim.emt_lab_b.domain.exceptions;

public class RentalNotFoundException extends RuntimeException {
    public RentalNotFoundException(Long rentalId) {
        super("Rental with id %d not found" .formatted(rentalId));
    }
}
