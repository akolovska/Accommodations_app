package mk.finki.ukim.emt_lab_b.listener;

import lombok.extern.slf4j.Slf4j;
import mk.finki.ukim.emt_lab_b.domain.models.ActivityLog;
import mk.finki.ukim.emt_lab_b.events.RentalRentedEvent;
import mk.finki.ukim.emt_lab_b.repository.ActivityLogRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@Slf4j
public class RentalRentedEventListener {
    private final ActivityLogRepository activityLogRepository;

    public RentalRentedEventListener(ActivityLogRepository activityLogRepository) {
        this.activityLogRepository = activityLogRepository;
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Async
    public void onRentalRent(RentalRentedEvent event) {
        log.info("[ASYNC - thread: {}] Rental '{}' rented.", Thread.currentThread().getName(),
                event.rental());
        if (event.rental().getNumRooms() == 0)
            log.info("[ASYNC - thread: {}] Rental '{}' fully rented out.", Thread.currentThread().getName(),
                    event.rental());
        ActivityLog activityLog = new ActivityLog(event.rental().getName(), "rent");
        activityLogRepository.save(activityLog);
    }

}
