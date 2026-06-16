package mk.finki.ukim.emt_lab_b.web.controller;

import jakarta.validation.Valid;
import mk.finki.ukim.emt_lab_b.domain.dtos.CreateCountryDto;
import mk.finki.ukim.emt_lab_b.domain.dtos.CreateRentalDto;
import mk.finki.ukim.emt_lab_b.domain.dtos.DisplayCountryDto;
import mk.finki.ukim.emt_lab_b.domain.dtos.DisplayRentalDto;
import mk.finki.ukim.emt_lab_b.service.application.ICountryApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/countries")
public class CountryController {
    private final ICountryApplicationService countryApplicationService;

    public CountryController(ICountryApplicationService countryApplicationService) {
        this.countryApplicationService = countryApplicationService;
    }
    @GetMapping("/{id}")
    public ResponseEntity<DisplayCountryDto> findById(@PathVariable Long id) {
        return countryApplicationService
                .findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<DisplayCountryDto>> findAll() {
        return ResponseEntity.ok(countryApplicationService.findAll());
    }

    @PostMapping("/add")
    public ResponseEntity<DisplayCountryDto> create(@RequestBody @Valid CreateCountryDto createCountryDto) {
        return ResponseEntity.ok(countryApplicationService.create(createCountryDto));
    }

    @PutMapping("/{id}/edit")
    public ResponseEntity<DisplayCountryDto> update(
            @PathVariable Long id,
            @RequestBody CreateCountryDto createCountryDto
    ) {
        return countryApplicationService
                .update(id, createCountryDto)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<DisplayCountryDto> deleteById(@PathVariable Long id) {
        return countryApplicationService
                .deleteById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
