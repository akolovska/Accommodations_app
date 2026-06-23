package mk.finki.ukim.emt_lab_b.repository;

import mk.finki.ukim.emt_lab_b.domain.views.RentalView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RentalViewRepository extends JpaRepository<RentalView, Long> {
}
