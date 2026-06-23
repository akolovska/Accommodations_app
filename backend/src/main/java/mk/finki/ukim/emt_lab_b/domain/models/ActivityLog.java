package mk.finki.ukim.emt_lab_b.domain.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "logs")
public class ActivityLog extends BaseAuditableEntity{

    private String rentalName;

    private String eventType;

    public ActivityLog(String rentalName, String eventType) {
        this.rentalName = rentalName;
        this.eventType = eventType;
    }
}
