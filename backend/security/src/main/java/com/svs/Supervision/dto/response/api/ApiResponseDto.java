package com.svs.Supervision.dto.response.api;

import lombok.*;
import lombok.experimental.SuperBuilder;

@ToString
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponseDto {
    private boolean success;
    private String message;
    private Object responseData;

}
