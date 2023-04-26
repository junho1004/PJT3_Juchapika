package com.svs.Supervision.controller;

import com.svs.Supervision.dto.request.CarNumberRequestDto;
import com.svs.Supervision.entity.user.Admin;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import static io.swagger.v3.oas.integration.StringOpenApiConfigurationLoader.LOGGER;

@Tag(name = "Car", description = "차량 관련 API")
@RestController
@RequestMapping("/car")
@RequiredArgsConstructor
public class CarController {

    @PostMapping("/number")
    @Operation(summary = "차량 번호판 등록", description = "단속된 차량 번호판을 저장합니다.")
    public ResponseEntity<?> addCarNumber(@RequestBody CarNumberRequestDto carNumberRequestDto,
                                          @Parameter(hidden = true)
                                          @AuthenticationPrincipal Admin admin) {
        LOGGER.info("addCarNumber() 호출 : " + carNumberRequestDto);

    }


    @GetMapping("/number")
    @Operation(summary = "차량 번호판 조회", description = "단속된 차량 번호판을 조회합니다.")
    public ResponseEntity<?> listCarNumber() {

    }
}
