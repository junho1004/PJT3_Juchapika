package com.svs.Supervision.dto.response.record;

import com.svs.Supervision.entity.car.Car;
import com.svs.Supervision.entity.record.Record;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecordResponseDto {
    private Date date;
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


    public static RecordResponseDto build(Record record, Car car) {
        return RecordResponseDto.builder()
                .location(record.getLocation())
                .plateImageUrl(record.getPlateImageUrl())
                .carImageUrl(record.getCarImageUrl())
                .date(record.getDate())
                .pay(record.getPay())
                .fine(record.getFine())
                .carNum(car.getCarNum())
                .phoneNum(car.getPhoneNum())
                .name(car.getName())
                .address(car.getAddress())
                .model(car.getModel())
                .color(car.getColor())
                .build();
    }
}