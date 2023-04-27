package com.svs.Supervision.repository.record;

import com.svs.Supervision.entity.record.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {
    @Modifying
    @Query("UPDATE Record r SET r.cnt = r.cnt + 1 WHERE r.car.id = :id")
    void updateCnt(@Param("id") Long id);
}
