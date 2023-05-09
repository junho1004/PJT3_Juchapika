package com.svs.Supervision.entity.record;

import com.svs.Supervision.dto.request.record.RecordRequestDto;
import com.svs.Supervision.entity.car.Car;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Builder
@Table(name = "record")
@DynamicInsert
@DynamicUpdate
public class Record {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @CreationTimestamp
//    @Temporal(TemporalType.TIMESTAMP)
//    private Date date;
    @CreationTimestamp
    private LocalDateTime date;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String plateImageUrl;

    @Column(nullable = false)
    private String carImageUrl;

    @Column(nullable = false)
    private String videoUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CAR_ID")
    private Car car;

    // 과태료 금액
    @Column(nullable = false)
    private Long fine;

    // 과태료 지불 여부
    @Column(nullable = false)
    private Boolean pay;

    // 단속 횟수
    @Column(columnDefinition = "BIGINT DEFAULT 0")
    private Long cnt;

    public static Record build(RecordRequestDto recordRequestDto, Car car) {
            return Record.builder()
                .location(recordRequestDto.getLocation())
                .plateImageUrl(recordRequestDto.getPlateImageUrl())
                .carImageUrl(recordRequestDto.getCarImageUrl())
                .videoUrl(recordRequestDto.getVideoUrl())
                .car(car)
                .fine(recordRequestDto.getFine())
                .pay(recordRequestDto.getPay())
                .build();
    }


}
