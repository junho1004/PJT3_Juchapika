package com.svs.Supervision.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Record", description = "기록 관련 API")
@RestController
@RequestMapping("/record")
@RequiredArgsConstructor
public class RecordController {
}
