package com.svs.Supervision.dto.request.record;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecordDetailRequestDto {
    private Date startDate;
    private Date endDate;
    private String county;
    private String dong;
}
