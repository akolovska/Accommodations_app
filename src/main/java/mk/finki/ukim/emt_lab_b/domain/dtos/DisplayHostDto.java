package mk.finki.ukim.emt_lab_b.domain.dtos;

import mk.finki.ukim.emt_lab_b.domain.models.Country;
import mk.finki.ukim.emt_lab_b.domain.models.Host;

public record DisplayHostDto(String name,
                             String surname,
                             Country country) {
    public static DisplayHostDto from(Host host) {

    }
}
