package mk.finki.ukim.emt_lab_b.web.controller;

import jakarta.validation.Valid;
import mk.finki.ukim.emt_lab_b.domain.dtos.CreateRentalDto;
import mk.finki.ukim.emt_lab_b.domain.dtos.DisplayRentalDto;
import mk.finki.ukim.emt_lab_b.domain.enums.RentalCategory;
import mk.finki.ukim.emt_lab_b.domain.models.ActivityLog;
import mk.finki.ukim.emt_lab_b.domain.projections.ShortRentalProjection;
import mk.finki.ukim.emt_lab_b.domain.views.RentalMaterializedView;
import mk.finki.ukim.emt_lab_b.domain.views.RentalView;
import mk.finki.ukim.emt_lab_b.service.application.IRentalApplicationService;
import mk.finki.ukim.emt_lab_b.service.domain.IActivityLogService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rentals")
public class RentalController {
    private final IRentalApplicationService rentalService;
    private final IActivityLogService activityLogService;

    public RentalController(IRentalApplicationService rentalService, IActivityLogService activityLogService) {
        this.rentalService = rentalService;
        this.activityLogService = activityLogService;
    }
    @GetMapping("/{id}")
    public ResponseEntity<ShortRentalProjection> findById(@PathVariable Long id) {
        return ResponseEntity.ok(rentalService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<DisplayRentalDto>> findAll() {
        return ResponseEntity.ok(rentalService.findAll());
    }

    @PostMapping("/add")
    public ResponseEntity<DisplayRentalDto> create(@RequestBody @Valid CreateRentalDto createRentalDto) {
        return ResponseEntity.ok(rentalService.create(createRentalDto));
    }

    @PutMapping("/{id}/edit")
    public ResponseEntity<DisplayRentalDto> update(
            @PathVariable Long id,
            @RequestBody CreateRentalDto createRentalDto
    ) {
        return rentalService
                .update(id, createRentalDto)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<DisplayRentalDto> deleteById(@PathVariable Long id) {
        return rentalService
                .deleteById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PostMapping("/{id}/rent")
    public ResponseEntity<DisplayRentalDto> rent(@PathVariable Long id) {
        return rentalService
                .rent(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @DeleteMapping("/{id}/unrent")
    public ResponseEntity<DisplayRentalDto> deleteRent(@PathVariable Long id) {
        return rentalService
                .deleteRental(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PostMapping("/{id}/isFull")
    public ResponseEntity<Boolean> isRented(@PathVariable Long id) {
        return ResponseEntity.ok(rentalService.isRented(id));
    }
    @GetMapping("/paginated")
    public ResponseEntity<Page<DisplayRentalDto>> findAll(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) RentalCategory category,
            @RequestParam(required = false) Long hostId,
            @RequestParam(required = false) Integer numRooms,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy
    ) {
        return ResponseEntity.ok(rentalService.find(name, category, hostId, numRooms, page, size, sortBy));
    }

    @GetMapping("/views")
    public ResponseEntity<List<RentalView>> getViews() {
        return ResponseEntity.ok(rentalService.findAllViews());
    }

    @GetMapping("/materializedViews")
    public ResponseEntity<List<RentalMaterializedView>> getMaterializedViews() {
        return ResponseEntity.ok(rentalService.findAllMaterializedViews());
    }

    @GetMapping("/logs")
    public ResponseEntity<List<ActivityLog>> getLogs() {
        return ResponseEntity.ok(activityLogService.findAll());
    }

}
