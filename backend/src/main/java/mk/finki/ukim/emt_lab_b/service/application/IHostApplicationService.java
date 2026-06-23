package mk.finki.ukim.emt_lab_b.service.application;

import mk.finki.ukim.emt_lab_b.domain.dtos.CreateHostDto;
import mk.finki.ukim.emt_lab_b.domain.dtos.DisplayCountryDto;
import mk.finki.ukim.emt_lab_b.domain.dtos.DisplayHostDto;

import java.util.List;
import java.util.Optional;

public interface IHostApplicationService {
    Optional<DisplayHostDto> findById(Long id);

    List<DisplayHostDto> findAll();

    DisplayHostDto create(CreateHostDto hostDto);

    Optional<DisplayHostDto> update(Long id, CreateHostDto hostDto);

    Optional<DisplayHostDto> deleteById(Long id);
}
