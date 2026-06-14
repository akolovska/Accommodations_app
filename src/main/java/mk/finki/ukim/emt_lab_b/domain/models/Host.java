package mk.finki.ukim.emt_lab_b.domain.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "hosts")
public class Host extends BaseAuditableEntity {
    @Column(nullable = false)
    String name;
    @Column(nullable = false)
    String surname;
    @ManyToOne
    @JoinColumn(name = "country_id", nullable = false)
    Country country;

    public Host(String name, String surname, Country country) {
        this.name = name;
        this.surname = surname;
        this.country = country;
    }
}
