package mk.finki.ukim.emt_lab_b.domain.dtos;

import mk.finki.ukim.emt_lab_b.domain.models.Country;

public record CreateCountryDto(String name,
                               String continent) {
    public Country toCountry() {
        return new Country(name, continent);
    }
}
