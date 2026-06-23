package mk.finki.ukim.emt_lab_b.domain.views;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import mk.finki.ukim.emt_lab_b.domain.enums.RentalCategory;
import mk.finki.ukim.emt_lab_b.domain.models.BaseEntity;
import org.hibernate.annotations.Immutable;

@Entity
@Getter
@Immutable
@Table(name = "rentals_materialized_view")
public class RentalMaterializedView extends BaseEntity {
    @Enumerated(EnumType.STRING)
    RentalCategory category;
    Integer numRentals, numRooms, avgNumRooms;
}
