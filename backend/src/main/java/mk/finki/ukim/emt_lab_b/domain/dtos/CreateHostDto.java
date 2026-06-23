package mk.finki.ukim.emt_lab_b.domain.dtos;

import mk.finki.ukim.emt_lab_b.domain.models.Country;
import mk.finki.ukim.emt_lab_b.domain.models.Host;

public record CreateHostDto(String name,
                            String surname,
                            Country country) {
    public Host toHost() {
        return new Host(name, surname, country);
    }
}
