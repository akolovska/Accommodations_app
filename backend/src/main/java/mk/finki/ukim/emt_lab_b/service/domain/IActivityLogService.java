package mk.finki.ukim.emt_lab_b.service.domain;

import mk.finki.ukim.emt_lab_b.domain.models.ActivityLog;

import java.util.List;

public interface IActivityLogService {
    List<ActivityLog> findAll();
}
