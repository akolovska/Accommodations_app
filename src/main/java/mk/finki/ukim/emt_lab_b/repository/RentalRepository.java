package mk.finki.ukim.emt_lab_b.repository;

import mk.finki.ukim.emt_lab_b.domain.models.Rental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RentalRepository extends JpaRepository<Rental, Long> {
}
