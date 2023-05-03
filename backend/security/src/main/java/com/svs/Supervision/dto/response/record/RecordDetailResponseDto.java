package com.svs.Supervision.dto.response.record;

import com.svs.Supervision.entity.car.Car;
import com.svs.Supervision.entity.record.Record;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecordDetailResponseDto {
    private LocalDate date;
    private LocalTime time;
    private String location;
    private String carNum;


    public static RecordDetailResponseDto build(Record record) {
        return RecordDetailResponseDto.builder()
                .location(record.getLocation())
                .date(record.getDate().toLocalDate())
                .time(record.getDate().toLocalTime())
                .carNum(record.getCar().getCarNum())
                .build();
    }
}