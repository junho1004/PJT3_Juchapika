package com.svs.Supervision.dto.jwt;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class SignInResultDto extends SignUpResultDto{

    private String token;
    private String userId;
}
