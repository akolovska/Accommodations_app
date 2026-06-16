package mk.finki.ukim.emt_lab_b.service.domain;

import mk.finki.ukim.emt_lab_b.domain.models.Country;
import mk.finki.ukim.emt_lab_b.repository.CountryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CountryService implements ICountryService{
    private final CountryRepository countryRepository;

    public CountryService(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    @Override
    public Optional<Country> findById(Long id) {
        return countryRepository.findById(id);
    }

    @Override
    public List<Country> findAll() {
        return countryRepository.findAll();
    }

    @Override
    public Country create(Country country) {
        return countryRepository.save(country);
    }

    @Override
    public Optional<Country> update(Long id, Country country) {
        return countryRepository.findById(id).map(country1 -> {
            country1.setContinent(country.getContinent());
            country1.setName(country.getName());
            return countryRepository.save(country1);
        });
    }

    @Override
    public Optional<Country> deleteById(Long id) {
        Optional<Country> country = findById(id);
        country.ifPresent(countryRepository::delete);
        return country;
    }
}
