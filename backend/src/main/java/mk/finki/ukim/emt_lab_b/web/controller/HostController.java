package mk.finki.ukim.emt_lab_b.web.controller;

import jakarta.validation.Valid;
import mk.finki.ukim.emt_lab_b.domain.dtos.CreateHostDto;
import mk.finki.ukim.emt_lab_b.domain.dtos.DisplayHostDto;
import mk.finki.ukim.emt_lab_b.service.application.IHostApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hosts")
public class HostController {
    private final IHostApplicationService hostService;

    public HostController(IHostApplicationService hostService) {
        this.hostService = hostService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<DisplayHostDto> findById(@PathVariable Long id) {
        return hostService
                .findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<DisplayHostDto>> findAll() {
        return ResponseEntity.ok(hostService.findAll());
    }

    @PostMapping("/add")
    public ResponseEntity<DisplayHostDto> create(@RequestBody @Valid CreateHostDto createHostDto) {
        return ResponseEntity.ok(hostService.create(createHostDto));
    }

    @PutMapping("/{id}/edit")
    public ResponseEntity<DisplayHostDto> update(
            @PathVariable Long id,
            @RequestBody @Valid CreateHostDto createHostDto
    ) {
        return hostService
                .update(id, createHostDto)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<DisplayHostDto> deleteById(@PathVariable Long id) {
        return hostService
                .deleteById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
