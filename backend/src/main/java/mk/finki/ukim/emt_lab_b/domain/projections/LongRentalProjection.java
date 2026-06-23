package mk.finki.ukim.emt_lab_b.domain.projections;

import mk.finki.ukim.emt_lab_b.domain.enums.RentalCategory;

public interface LongRentalProjection {
    String getName();
    RentalCategory getCategory();
    Integer getNumRooms();
    String getHostName();
    String getHostSurname();
    String getHostCountry();
}
