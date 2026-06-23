package mk.finki.ukim.emt_lab_b.repository;

import mk.finki.ukim.emt_lab_b.domain.models.Rental;
import mk.finki.ukim.emt_lab_b.domain.projections.ShortRentalProjection;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RentalRepository extends JpaSpecificationRepository<Rental, Long> {
    @Query("select r from Rental r where r.id = :id")
    ShortRentalProjection findByIdProjection(@Param("id") Long id);
}
