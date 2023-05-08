package com.svs.Supervision.dto.request.record;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecordDetailRequestDto {
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String county;
    private String dong;
}
