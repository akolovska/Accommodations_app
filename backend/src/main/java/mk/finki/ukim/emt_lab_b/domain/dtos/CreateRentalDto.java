package mk.finki.ukim.emt_lab_b.domain.dtos;

import mk.finki.ukim.emt_lab_b.domain.enums.RentalCategory;
import mk.finki.ukim.emt_lab_b.domain.models.Host;
import mk.finki.ukim.emt_lab_b.domain.models.Rental;

public record CreateRentalDto(String name,
                              RentalCategory category,
                              Host host,
                              Integer numRooms) {
    public Rental toRental() {
        return new Rental(name, category, host, numRooms);
    }
}
