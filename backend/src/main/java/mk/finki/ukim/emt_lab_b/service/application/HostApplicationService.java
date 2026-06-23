package mk.finki.ukim.emt_lab_b.service.application;

import mk.finki.ukim.emt_lab_b.domain.dtos.CreateHostDto;
import mk.finki.ukim.emt_lab_b.domain.dtos.DisplayHostDto;
import mk.finki.ukim.emt_lab_b.service.domain.IHostService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HostApplicationService implements IHostApplicationService{
    private final IHostService hostService;

    public HostApplicationService(IHostService hostService) {
        this.hostService = hostService;
    }

    @Override
    public Optional<DisplayHostDto> findById(Long id) {
        return hostService.findById(id).map(DisplayHostDto::from);
    }

    @Override
    public List<DisplayHostDto> findAll() {
        return DisplayHostDto.from(hostService.findAll());
    }

    @Override
    public DisplayHostDto create(CreateHostDto hostDto) {
        return DisplayHostDto.from(hostService.create(hostDto.toHost()));
    }

    @Override
    public Optional<DisplayHostDto> update(Long id, CreateHostDto hostDto) {
        return hostService.update(id, hostDto.toHost()).map(DisplayHostDto::from);
    }

    @Override
    public Optional<DisplayHostDto> deleteById(Long id) {
        return hostService.deleteById(id).map(DisplayHostDto::from);
    }
}
