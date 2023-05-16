package com.svs.Supervision.dto.request.record;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExcelRequestDto {

    private Long id;
    private String date;
    private String time;
    private String location;
    private String carNum;
}
