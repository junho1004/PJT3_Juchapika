package com.svs.Supervision.dto.response.record;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.HashMap;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecordStatisticsResponseDto {
    private HashMap<LocalDate, HashMap<String, Long>> county;

    public static RecordStatisticsResponseDto build(HashMap<LocalDate, HashMap<String, Long>> newMap) {

        return RecordStatisticsResponseDto.builder()
                .county(newMap)
                .build();
    }
}
