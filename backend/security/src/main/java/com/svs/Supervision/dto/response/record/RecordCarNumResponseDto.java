package com.svs.Supervision.dto.response.record;

import com.svs.Supervision.entity.car.Car;
import com.svs.Supervision.entity.record.Record;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecordCarNumResponseDto {
    private LocalDateTime date;
    private String location;
    private String plateImageUrl;
    private String carImageUrl;
    private Long fine;
    private Boolean pay;
    private String carNum;
    private String phoneNum;
    private String name;
    private String address;
    private String model;
    private String color;


    public static RecordCarNumResponseDto build(Record record) {
        return RecordCarNumResponseDto.builder()
                .location(record.getLocation())
                .plateImageUrl(record.getPlateImageUrl())
                .carImageUrl(record.getCarImageUrl())
                .date(record.getDate())
                .pay(record.getPay())
                .fine(record.getFine())
                .carNum(record.getCar().getCarNum())
                .phoneNum(record.getCar().getPhoneNum())
                .name(record.getCar().getName())
                .address(record.getCar().getAddress())
                .model(record.getCar().getModel())
                .color(record.getCar().getColor())
                .build();
    }
}