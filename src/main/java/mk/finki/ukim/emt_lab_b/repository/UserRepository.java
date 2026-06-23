package mk.finki.ukim.emt_lab_b.repository;

import mk.finki.ukim.emt_lab_b.domain.models.User;
import mk.finki.ukim.emt_lab_b.domain.projections.UserProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "select name, surname, email from users", nativeQuery = true)
    List<UserProjection> findAllWithNameSurnameAndEmail();

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);
}

