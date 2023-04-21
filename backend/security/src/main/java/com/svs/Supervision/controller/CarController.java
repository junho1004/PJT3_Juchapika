package com.svs.Supervision.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Car", description = "차량 관련 API")
@RestController
@RequestMapping("/car")
@RequiredArgsConstructor
public class CarController {
}
