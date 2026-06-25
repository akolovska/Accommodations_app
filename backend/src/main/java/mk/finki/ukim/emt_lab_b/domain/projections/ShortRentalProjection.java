package mk.finki.ukim.emt_lab_b.domain.projections;

import mk.finki.ukim.emt_lab_b.domain.enums.RentalCategory;
import mk.finki.ukim.emt_lab_b.domain.models.Host;

public interface ShortRentalProjection  {
    Long getId();
    String getName();
    RentalCategory getCategory();
    Integer getNumRooms();
    Host getHost();
}
