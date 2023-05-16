package com.svs.Supervision.dto.response.car;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CarNumberListResponseDto {
    private Long id;
    private String carNum;
    private String name;
    private String phoneNum;
    private String address;
    private String model;
    private String color;
    private Date date;
    private String location;
    private String carImageUrl;
    private String plateImageUrl;
    private Boolean pay;
    private Long fine;
}
