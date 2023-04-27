package com.svs.Supervision.repository;

import com.svs.Supervision.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User getByUserId(String userid);
    User findByUserId(String userid);
    Boolean existsByUserId(String userid);
}
