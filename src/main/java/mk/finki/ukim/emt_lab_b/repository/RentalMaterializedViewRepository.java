package mk.finki.ukim.emt_lab_b.repository;

import mk.finki.ukim.emt_lab_b.domain.views.RentalMaterializedView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RentalMaterializedViewRepository extends JpaRepository<RentalMaterializedView, Long> {
    @Modifying
    @Query(value = "call refresh_rentals_materialized_view()", nativeQuery = true)
    void refresh();
}
