package com.svs.Supervision.dto.request;

import com.svs.Supervision.entity.car.Car;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CarNumberRequestDto {

    private Car car;
    private String carImageUrl;
    private Date date;
    private Long fine;
    private String location;
    private Boolean pay;
    private String plateImageUrl;
}
