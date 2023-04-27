package com.svs.Supervision.repository.user;

import com.svs.Supervision.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User getByUserId(String userid);
    User findByUserId(String userid);
    Boolean existsByUserId(String userid);
}
