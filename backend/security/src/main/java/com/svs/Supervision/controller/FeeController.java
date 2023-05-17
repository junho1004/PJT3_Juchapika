package com.svs.Supervision.controller;

import com.svs.Supervision.dto.request.record.RecordCarNumRequestDto;
import com.svs.Supervision.dto.response.api.ApiResponseDto;
import com.svs.Supervision.dto.response.record.RecordCarNumResponseDto;
import com.svs.Supervision.entity.user.User;
import com.svs.Supervision.service.fee.FeeService;
import com.svs.Supervision.service.record.RecordService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.net.URLEncoder;
import java.util.List;

import static io.swagger.v3.oas.integration.StringOpenApiConfigurationLoader.LOGGER;

@Tag(name = "Fee", description = "과태료 고지서 API")
@RestController
@RequestMapping("/feeletter")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class FeeController {
    private final FeeService feeService;
    private final RecordService recordService;
    @GetMapping("a/{id}")
    public ResponseEntity<?> searchByRecord(@PathVariable("id") String recordEncry ) {
//        String plainText = "11";
//        String encryptedText = feeService.encrypt(recordEncry);
//        System.out.println("암호화된 텍스트: " + encryptedText);
//        String encryptedData = encryptedText;
//        String encodedData = URLEncoder.encode(encryptedData, StandardCharsets.UTF_8);
//        System.out.println("인코딩된 데이터: " + encodedData);
//        // 복호화
        String decodeData = URLDecoder.decode(recordEncry,StandardCharsets.UTF_8);
        System.out.println("디코딩된 데이터: "+decodeData);
//        String decryptedText = feeService.decrypt(decodeData);
//        System.out.println("복호화된 텍스트: " + decryptedText);
        return null;
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> searchRecordByid(@PathVariable("id") String id ) {
        RecordCarNumResponseDto recordCarNumResponseDto = recordService.searchRecordById(Long.parseLong(id));

        if(recordCarNumResponseDto ==null) {
            return new ResponseEntity(new ApiResponseDto(false, "searchRecordById fail@", recordCarNumResponseDto),
                    HttpStatus.OK);
        }
        System.out.println(recordCarNumResponseDto.getCarNum());
        return new ResponseEntity(new ApiResponseDto(true, "searchRecordById successfully@", recordCarNumResponseDto),HttpStatus.OK);
    }
    @PostMapping("/carnum")
    @Operation(summary = "단속 차량 조회", description = "번호판 기준으로 단속된 차량의 단속 기록들을 조회합니다.")
    public ResponseEntity<?> searchRecordByCarNum(@RequestBody RecordCarNumRequestDto recordCarNumRequestDto,
                                                  @Parameter(hidden = true) @AuthenticationPrincipal User user) {
        LOGGER.info("searchRecord() 호출 : " + recordCarNumRequestDto);
        List<RecordCarNumResponseDto> recordCarNumResponseDtoList = recordService
                .searchRecord(recordCarNumRequestDto.getCarNum());

        if (recordCarNumResponseDtoList == null) {
            return new ResponseEntity(new ApiResponseDto(false, "searchRecord Fail@", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(
                    new ApiResponseDto(true, "searchRecord successfully@", recordCarNumResponseDtoList), HttpStatus.OK);
        }
    }
}
