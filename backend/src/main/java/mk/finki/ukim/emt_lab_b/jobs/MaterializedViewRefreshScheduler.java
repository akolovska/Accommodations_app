package mk.finki.ukim.emt_lab_b.jobs;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import mk.finki.ukim.emt_lab_b.repository.RentalMaterializedViewRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class MaterializedViewRefreshScheduler {
    private final RentalMaterializedViewRepository rentalMaterializedViewRepository;

    public MaterializedViewRefreshScheduler(RentalMaterializedViewRepository rentalMaterializedViewRepository) {
        this.rentalMaterializedViewRepository = rentalMaterializedViewRepository;
    }

    @Scheduled(cron = "0 * * * * *")
    @Transactional
    public void refreshRentalView() {
        log.info("Refreshing RENTAL_VIEW...");
        rentalMaterializedViewRepository.refresh();
        log.info("RENTAL_VIEW successfully refreshed.");
    }
}

