package com.svs.Supervision.dto.request.record;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecordRequestDto {

    private String carNum;
    private String carImageUrl;
    private String plateImageUrl;
    private String videoUrl;
    private Long fine;
    private String location;
    private Boolean pay;

}
