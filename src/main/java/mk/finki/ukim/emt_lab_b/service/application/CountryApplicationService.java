package mk.finki.ukim.emt_lab_b.service.application;

import mk.finki.ukim.emt_lab_b.domain.dtos.CreateCountryDto;
import mk.finki.ukim.emt_lab_b.domain.dtos.DisplayCountryDto;
import mk.finki.ukim.emt_lab_b.service.domain.ICountryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CountryApplicationService implements ICountryApplicationService{
    private final ICountryService countryService;

    public CountryApplicationService(ICountryService countryService) {
        this.countryService = countryService;
    }

    @Override
    public Optional<DisplayCountryDto> findById(Long id) {
        return countryService.findById(id).map(DisplayCountryDto::from);
    }

    @Override
    public List<DisplayCountryDto> findAll() {
        return DisplayCountryDto.from(countryService.findAll());
    }

    @Override
    public DisplayCountryDto create(CreateCountryDto countryDto) {
        return DisplayCountryDto.from(countryService.create(countryDto.toCountry()));
    }

    @Override
    public Optional<DisplayCountryDto> update(Long id, CreateCountryDto countryDto) {
        return countryService.update(id, countryDto.toCountry()).map(DisplayCountryDto::from);
    }

    @Override
    public Optional<DisplayCountryDto> deleteById(Long id) {
        return countryService.deleteById(id).map(DisplayCountryDto::from);
    }
}
