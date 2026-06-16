package mk.finki.ukim.emt_lab_b.service.application;

import mk.finki.ukim.emt_lab_b.domain.dtos.CreateCountryDto;
import mk.finki.ukim.emt_lab_b.domain.dtos.DisplayCountryDto;

import java.util.List;
import java.util.Optional;

public interface ICountryApplicationService {
    Optional<DisplayCountryDto> findById(Long id);

    List<DisplayCountryDto> findAll();

    DisplayCountryDto create(CreateCountryDto countryDto);

    Optional<DisplayCountryDto> update(Long id, CreateCountryDto countryDto);

    Optional<DisplayCountryDto> deleteById(Long id);
}
