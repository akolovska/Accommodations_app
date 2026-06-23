package mk.finki.ukim.emt_lab_b.domain.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mk.finki.ukim.emt_lab_b.domain.enums.RentalCategory;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "rentals")
@NamedEntityGraph(
        name = "rental-entity-graph",
        attributeNodes = {
                @NamedAttributeNode(value = "host", subgraph = "host-subgraph"),
        },
        subgraphs = {
                @NamedSubgraph(
                        name = "host-subgraph",
                        attributeNodes = {
                                @NamedAttributeNode("country")
                        }
                )
        }
)
public class Rental extends BaseAuditableEntity {
    @Column(nullable = false)
    String name;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    RentalCategory category;
    @ManyToOne
    @JoinColumn(name = "host_id", nullable = false)
    Host host;
    @Column(nullable = false)
    Integer numRooms;

    public Rental(String name, RentalCategory category, Host host, Integer numRooms) {
        this.name = name;
        this.category = category;
        this.host = host;
        this.numRooms = numRooms;
    }
}
