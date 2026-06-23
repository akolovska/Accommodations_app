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
@Table(name = "rentals_view")
public class RentalView extends BaseEntity {
    String name;
    @Enumerated(EnumType.STRING)
    RentalCategory category;
    Integer numRooms;
    String hostName;
    String countryName;
}
