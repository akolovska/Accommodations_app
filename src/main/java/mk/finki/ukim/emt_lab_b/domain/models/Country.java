package mk.finki.ukim.emt_lab_b.domain.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "countries")
public class Country extends BaseAuditableEntity {
    @Column(nullable = false)
    String name;
    @Column(nullable = false)
    String continent;

    public Country(String name, String continent) {
        this.name = name;
        this.continent = continent;
    }
}
