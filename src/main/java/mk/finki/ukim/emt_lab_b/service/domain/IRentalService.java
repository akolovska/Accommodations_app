package mk.finki.ukim.emt_lab_b.service.domain;

import mk.finki.ukim.emt_lab_b.domain.dtos.DisplayRentalDto;
import mk.finki.ukim.emt_lab_b.domain.enums.RentalCategory;
import mk.finki.ukim.emt_lab_b.domain.models.Rental;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface IRentalService {
    Optional<Rental> findById(Long id);

    List<Rental> findAll();

    Rental create(Rental rental);

    Optional<Rental> update(Long id, Rental rental);

    Optional<Rental> deleteById(Long id);
    Optional<Rental> rent(Long id);
    Optional<Rental> deleteRental(Long id);
    Boolean isRented(Long id);
    Page<Rental> find(String name, RentalCategory category, Long hostId, Integer numRooms, Integer pageNum, Integer pageSize, String sortBy);
}
