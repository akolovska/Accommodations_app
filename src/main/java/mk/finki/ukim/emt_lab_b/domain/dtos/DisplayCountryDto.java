package mk.finki.ukim.emt_lab_b.domain.dtos;

import mk.finki.ukim.emt_lab_b.domain.models.Country;

import java.util.List;

public record DisplayCountryDto(String name,
                                String continent) {
    public static DisplayCountryDto from(Country country) {
        return new DisplayCountryDto(country.getName(), country.getContinent());
    }
    public static List<DisplayCountryDto> from(List<Country> countries) {
        return countries.stream().map(DisplayCountryDto::from).toList();
    }
}
