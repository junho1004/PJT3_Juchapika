package com.svs.Supervision.dto.request.record;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecordIdCarNumRequestDto {
    private Long id;
    private String carNum;
}
