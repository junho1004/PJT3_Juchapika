package com.svs.Supervision.repository.record;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.svs.Supervision.dto.request.record.RecordDetailRequestDto;
import com.svs.Supervision.entity.car.QCar;
import com.svs.Supervision.entity.record.QRecord;
import com.svs.Supervision.entity.record.Record;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Date;
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
                .where(car.carNum.eq(carNum))
                .orderBy(record.date.desc())
                .fetch()
                ;
    }


    @Override
    public List<Record> findAllRecordByWhereCntZero() {
        QRecord record = QRecord.record;
        QCar car = QCar.car;

        // 번호판 기준으로 Car 를 찾는다.
        // Car_Id 를 기준으로 Record 를 찾는다.

        return jpaQueryFactory.selectFrom(record)
                .join(car).on(car.id.eq(record.car.id))
                .where(record.cnt.eq(1L))
                .orderBy(record.date.desc())
                .fetch()
                ;
    }

    @Override
    public List<Record> findAllRecordByDetail(RecordDetailRequestDto recordDetailRequestDto) {
        QRecord record = QRecord.record;
        QCar car = QCar.car;

        LocalDateTime startDate = recordDetailRequestDto.getStartDate();// 시작시간
        LocalDateTime endDate = recordDetailRequestDto.getEndDate();// 끝시간
        String district = recordDetailRequestDto.getCounty();// 지역(구)
        String dong = recordDetailRequestDto.getDong();// 동


        List<Record> list;

        System.out.println(startDate + ", " + endDate);

        System.out.println(district + ", " + dong);

        // 지역(구)와 동이 모두 default(전체) 인 경우.
        if (district.equals("전체") && dong.equals("전체")) {

            list = jpaQueryFactory.selectFrom(record)
                    .join(car).on(car.id.eq(record.car.id))
                    .where(record.date.between(startDate, endDate),record.cnt.eq(2L))
                    .orderBy(record.date.desc())
                    .fetch();
        }
        // 지역(구)만 default(전체) 인 경우.
        else if (district.equals("전체") && !dong.equals("전체")) {
            list = jpaQueryFactory.selectFrom(record)
                    .join(car).on(car.id.eq(record.car.id))
                    .where(record.date.between(startDate, endDate), record.location.contains(dong),record.cnt.eq(2L))
                    .orderBy(record.date.desc())
                    .fetch();
        }
        // 동만 default(전체) 인 경우.
        else if (!district.equals("전체") && dong.equals("전체")) {
            System.out.println(district + ", " + dong);
            System.out.println(record.location);
            System.out.println(record.location.contains(district));
            list = jpaQueryFactory.selectFrom(record)
                    .join(car).on(car.id.eq(record.car.id))
                    .where(record.date.between(startDate, endDate), record.location.contains(district),record.cnt.eq(2L))
                    .orderBy(record.date.desc())
                    .fetch();
        }
        // 지역(구)와 동이 모두 default(전체) 가 아닌 경우.
        else {
        list = jpaQueryFactory.selectFrom(record)
                    .join(car).on(car.id.eq(record.car.id))
                .where(record.date.between(startDate, endDate),
                        record.location.contains(district),
                        record.location.contains(dong),record.cnt.eq(2L))
                    .orderBy(record.date.desc())
                    .fetch();
        }

        System.out.println(list.size());
        for (Record record1 : list) {
            System.out.println(record1);
        }

        return list;
    }

    @Override
    public List<Record> findAllRecordByDateForStatistics(RecordDetailRequestDto recordDetailRequestDto) {
        QRecord record = QRecord.record;

        LocalDateTime startDate = recordDetailRequestDto.getStartDate();// 시작시간
        LocalDateTime endDate = recordDetailRequestDto.getEndDate();// 끝시간

        return jpaQueryFactory.selectFrom(record)
                .where(record.date.between(startDate, endDate), record.cnt.eq(2L))
                .fetch();
    }

}
