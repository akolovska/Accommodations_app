package mk.finki.ukim.emt_lab_b.service.domain;

import mk.finki.ukim.emt_lab_b.domain.exceptions.HostNotFoundException;
import mk.finki.ukim.emt_lab_b.domain.models.Host;
import mk.finki.ukim.emt_lab_b.repository.HostRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HostService implements IHostService{
    private final HostRepository hostRepository;

    public HostService(HostRepository hostRepository) {
        this.hostRepository = hostRepository;
    }

    @Override
    public Optional<Host> findById(Long id) {
        return hostRepository.findById(id);
    }

    @Override
    public List<Host> findAll() {
        return hostRepository.findAll();
    }

    @Override
    public Host create(Host host) {
        return hostRepository.save(host);
    }

    @Override
    public Optional<Host> update(Long id, Host host) {
            return hostRepository.findById(id).map(host1 -> {
                host1.setName(host.getName());
                host1.setSurname(host.getSurname());
                host1.setCountry(host.getCountry());
                return hostRepository.save(host1);
            });
    }

    @Override
    public Optional<Host> deleteById(Long id) {
        Optional<Host> host = hostRepository.findById(id);
        host.ifPresent(hostRepository::delete);
        return host;
    }
}
