package mk.finki.ukim.emt_lab_b.domain.dtos;

import mk.finki.ukim.emt_lab_b.domain.enums.RentalCategory;
import mk.finki.ukim.emt_lab_b.domain.models.Host;
import mk.finki.ukim.emt_lab_b.domain.models.Rental;

import java.util.List;

public record DisplayRentalDto(Long id,
                               String name,
                               RentalCategory category,
                               Host host,
                               Integer numRooms) {
    public static DisplayRentalDto from(Rental rental) {
        return new DisplayRentalDto(rental.getId(), rental.getName(),
                rental.getCategory(),
                rental.getHost(),
                rental.getNumRooms());
    }

    public static List<DisplayRentalDto> from(List<Rental> rentals) {
        return rentals.stream().map(DisplayRentalDto::from).toList();
    }
}
