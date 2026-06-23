package mk.finki.ukim.emt_lab_b.service.application;

import mk.finki.ukim.emt_lab_b.domain.dtos.CreateRentalDto;
import mk.finki.ukim.emt_lab_b.domain.dtos.DisplayRentalDto;
import mk.finki.ukim.emt_lab_b.domain.enums.RentalCategory;
import mk.finki.ukim.emt_lab_b.domain.projections.ShortRentalProjection;
import mk.finki.ukim.emt_lab_b.domain.views.RentalMaterializedView;
import mk.finki.ukim.emt_lab_b.domain.views.RentalView;
import mk.finki.ukim.emt_lab_b.repository.RentalMaterializedViewRepository;
import mk.finki.ukim.emt_lab_b.repository.RentalViewRepository;
import mk.finki.ukim.emt_lab_b.service.domain.IRentalService;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RentalApplicationService implements IRentalApplicationService {
    private final IRentalService rentalService;
    private final RentalViewRepository rentalViewRepository;
    private final RentalMaterializedViewRepository rentalMaterializedViewRepository;

    public RentalApplicationService(IRentalService rentalService, RentalViewRepository rentalViewRepository, RentalMaterializedViewRepository rentalMaterializedViewRepository) {
        this.rentalService = rentalService;
        this.rentalViewRepository = rentalViewRepository;
        this.rentalMaterializedViewRepository = rentalMaterializedViewRepository;
    }

    @Override
    public ShortRentalProjection findById(Long id) {
        return rentalService.findById(id);
    }

    @Override
    public List<DisplayRentalDto> findAll() {
        return DisplayRentalDto.from(rentalService.findAll());
    }

    @Override
    public DisplayRentalDto create(CreateRentalDto rentalDto) {
        return DisplayRentalDto.from(rentalService.create(rentalDto.toRental()));
    }

    @Override
    public Optional<DisplayRentalDto> update(Long id, CreateRentalDto rentalDto) {
        return rentalService.update(id, rentalDto.toRental()).map(DisplayRentalDto::from);
    }

    @Override
    public Optional<DisplayRentalDto> deleteById(Long id) {
        return rentalService.deleteById(id).map(DisplayRentalDto::from);
    }

    @Override
    public Optional<DisplayRentalDto> rent(Long id) {
        return rentalService.rent(id).map(DisplayRentalDto::from);
    }

    @Override
    public Optional<DisplayRentalDto> deleteRental(Long id) {
        return rentalService.deleteRental(id).map(DisplayRentalDto::from);
    }

    @Override
    public Boolean isRented(Long id) {
        return rentalService.isRented(id);
    }

    @Override
    public Page<DisplayRentalDto> find(String name, RentalCategory category, Long hostId, Integer numRooms, int page, int size, String sortBy) {
        return rentalService.find(name, category, hostId, numRooms, page, size, sortBy).map(DisplayRentalDto::from);
    }

    @Override
    public List<RentalView> findAllViews() {
        return rentalViewRepository.findAll();
    }

    @Override
    public List<RentalMaterializedView> findAllMaterializedViews() {
        return rentalMaterializedViewRepository.findAll();
    }
}
