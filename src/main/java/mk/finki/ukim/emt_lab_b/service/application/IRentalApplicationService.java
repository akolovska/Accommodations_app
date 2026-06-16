package mk.finki.ukim.emt_lab_b.service.application;

import mk.finki.ukim.emt_lab_b.domain.dtos.CreateRentalDto;
import mk.finki.ukim.emt_lab_b.domain.dtos.DisplayHostDto;
import mk.finki.ukim.emt_lab_b.domain.dtos.DisplayRentalDto;
import mk.finki.ukim.emt_lab_b.domain.enums.RentalCategory;
import mk.finki.ukim.emt_lab_b.domain.models.Rental;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface IRentalApplicationService {
    Optional<DisplayRentalDto> findById(Long id);

    List<DisplayRentalDto> findAll();

    DisplayRentalDto create(CreateRentalDto rentalDto);

    Optional<DisplayRentalDto> update(Long id, CreateRentalDto rentalDto);

    Optional<DisplayRentalDto> deleteById(Long id);
    Optional<DisplayRentalDto> rent(Long id);
    Optional<DisplayRentalDto> deleteRental(Long id);
    Boolean isRented(Long id);
    Page<DisplayRentalDto> find(String name, RentalCategory category, Long hostId, Integer numRooms, int page, int size, String sortBy);
}
