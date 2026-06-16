package mk.finki.ukim.emt_lab_b.domain.dtos;

import mk.finki.ukim.emt_lab_b.domain.models.Country;
import mk.finki.ukim.emt_lab_b.domain.models.Host;

import java.util.List;

public record DisplayHostDto(String name,
                             String surname,
                             Country country) {
    public static DisplayHostDto from(Host host) {
        return new DisplayHostDto(host.getName(), host.getSurname(), host.getCountry());
    }
    public static List<DisplayHostDto> from(List<Host> hosts) {
        return hosts
                .stream()
                .map(DisplayHostDto::from)
                .toList();
    }

}
