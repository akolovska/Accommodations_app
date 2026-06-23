package mk.finki.ukim.emt_lab_b.service.domain;

import mk.finki.ukim.emt_lab_b.domain.enums.RentalCategory;
import mk.finki.ukim.emt_lab_b.domain.models.Rental;
import mk.finki.ukim.emt_lab_b.domain.projections.ShortRentalProjection;
import mk.finki.ukim.emt_lab_b.domain.views.RentalView;
import mk.finki.ukim.emt_lab_b.events.RentalRentedEvent;
import mk.finki.ukim.emt_lab_b.repository.RentalRepository;
import mk.finki.ukim.emt_lab_b.repository.RentalViewRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static mk.finki.ukim.emt_lab_b.service.FieldFilterSpecification.*;

@Service
public class RentalService implements IRentalService{
    private final RentalRepository rentalRepository;
    private final ApplicationEventPublisher applicationEventPublisher;

    public RentalService(RentalRepository rentalRepository, ApplicationEventPublisher applicationEventPublisher) {
        this.rentalRepository = rentalRepository;
        this.applicationEventPublisher = applicationEventPublisher;
    }

    @Override
    public ShortRentalProjection findById(Long id) {
        return rentalRepository.findByIdProjection(id);
    }

    @Override
    public List<Rental> findAll() {
        return rentalRepository.findAll();
    }

    @Override
    public Rental create(Rental rental) {
        return rentalRepository.save(rental);
    }

    @Override
    public Optional<Rental> update(Long id, Rental rental) {
        return rentalRepository.findById(id).map(rental1 -> {
            rental1.setName(rental.getName());
            rental1.setCategory(rental.getCategory());
            rental1.setNumRooms(rental.getNumRooms());
            rental1.setHost(rental.getHost());
            return rentalRepository.save(rental1);
        });
    }

    @Override
    public Optional<Rental> deleteById(Long id) {
        Optional<Rental> rental = rentalRepository.findById(id);
        rental.ifPresent(rentalRepository::delete);
        return rental;
    }

    @Override
    public Optional<Rental> rent(Long id) {
        Optional<Rental> rental = rentalRepository.findById(id);
        rental.ifPresent(r -> {
            if (r.getNumRooms() > 0) {
                r.setNumRooms(r.getNumRooms() - 1);
                rentalRepository.save(r);
                applicationEventPublisher.publishEvent(new RentalRentedEvent(r));
            }
        });

        return rental;
    }

    @Override
        public Optional<Rental> deleteRental(Long id) {
        Optional<Rental> rental = rentalRepository.findById(id);
        rental.ifPresent(s -> {
            s.setNumRooms(s.getNumRooms()+1);
            rentalRepository.save(s);
        });
        return rental;
    }

    @Override
    public Boolean isRented(Long id) {
        Optional<Rental> rental = rentalRepository.findById(id);
        return rental.filter(value -> value.getNumRooms() == 0).isPresent();
    }
    @Override
    public Page<Rental> find(String name, RentalCategory category, Long hostId, Integer numRooms, Integer pageNum, Integer pageSize, String sortBy) {
        Specification<Rental> specification = Specification.allOf(
                filterContainsText(Rental.class, "name", name),
                filterEquals(Rental.class, "host.id", hostId),
                greaterThan(Rental.class, "numRooms", numRooms),
                filterEqualsV(Rental.class, "category", category)
        );

        return this.rentalRepository.findAll(
                specification,
                PageRequest.of(pageNum, pageSize, Sort.by(Sort.Direction.DESC, sortBy)));
    }
}
