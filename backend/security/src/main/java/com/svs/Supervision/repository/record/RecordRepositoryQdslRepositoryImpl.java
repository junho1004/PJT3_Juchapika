package com.svs.Supervision.repository.record;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.svs.Supervision.entity.car.QCar;
import com.svs.Supervision.entity.record.QRecord;
import com.svs.Supervision.entity.record.Record;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RecordRepositoryQdslRepositoryImpl implements RecordRepositoryQdslRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public RecordRepositoryQdslRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }


    @Override
    public List<Record> findAllRecordByCarNumWhereCntZero(String carNum) {
        QRecord record = QRecord.record;
        QCar car = QCar.car;

        // 번호판 기준으로 Car 를 찾는다.
        // Car_Id 를 기준으로 Record 를 찾는다.

        return jpaQueryFactory.selectFrom(record)
                .join(car).on(car.id.eq(record.car.id))
                .where(car.carNum.eq(carNum), record.cnt.eq(0L))
                .orderBy(record.date.desc())
                .fetch()
                ;
    }
}
