
package com.svs.Supervision.controller;


import com.svs.Supervision.dto.request.record.RecordListRequestDto;
import com.svs.Supervision.dto.request.record.ExcelRequestDto;
import com.svs.Supervision.dto.request.record.RecordRequestDto;
import com.svs.Supervision.dto.response.api.ApiResponseDto;
import com.svs.Supervision.dto.response.record.RecordResponseDto;
import com.svs.Supervision.entity.user.User;
import com.svs.Supervision.service.record.RecordService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import static io.swagger.v3.oas.integration.StringOpenApiConfigurationLoader.LOGGER;

@Tag(name = "Record", description = "기록 관련 API")
@RestController
@RequestMapping("/record")
@RequiredArgsConstructor
public class RecordController {

    private final RecordService recordService;

    // 1. 입력박은 차량 번호판 정보를 통해 carId를 찾는다.
    // 2. carId를 통해 Record 를 조회한다.
    // 3. Record 가 여러개 존재할 경우.. date 기준 정렬 가장 첫 번째 idx
    // 3. Record 가 존재하지 않을경우, 첫 번째 단속이므로 Database 에 저장한다.
    // 4. 이미 Record 가 존재할 경우, 단속 횟수(cnt) 에 1을 더한다.
    // 4-1. 만약 단속 횟수(cnt) 가 1 이상일 경우에는 pass.
    // 12시에 초기화 (Scheduler)

    @PostMapping("/number")
    @Operation(summary = "단속 차량 등록", description = "번호판을 기준으로 단속된 차량의 단속 기록을 저장합니다.")
    public ResponseEntity<?> addRecord(@RequestBody RecordRequestDto recordRequestDto,
                                       @Parameter(hidden = true)
                                       @AuthenticationPrincipal User user) {
        LOGGER.info("addRecord() 호출 : " + recordRequestDto);
        recordService.addRecord(recordRequestDto);

        return new ResponseEntity(new ApiResponseDto(true, "addRecord successfully@", null), HttpStatus.CREATED);
    }



    // 1. 번호판 넘버를 기준으로, 먼저 차량의 id (carId)를 찾습니다.
    // 2. carId를 기준으로 record 들을 기록을 찾아옵니다.

    @PostMapping("/search")
    @Operation(summary = "단속 차량 조회", description = "번호판 기준으로 단속된 차량의 단속 기록들을 조회합니다.")
    public ResponseEntity<?> searchRecord(@RequestBody RecordListRequestDto carNumberListRequestDto,
                                          @Parameter(hidden = true)
                                          @AuthenticationPrincipal User user) {
        LOGGER.info("searchRecord() 호출 : " + carNumberListRequestDto);
        List<RecordResponseDto> recordResponseDtoList = recordService.searchRecord(carNumberListRequestDto.getCarNum());

        if (recordResponseDtoList == null) {
            return new ResponseEntity(new ApiResponseDto(false, "searchRecord Fail@", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(true, "searchRecord successfully@", recordResponseDtoList), HttpStatus.OK);
        }
    }



    @PostMapping("/download")
    public ResponseEntity<?> downloadExcel(@RequestBody List<ExcelRequestDto> excelRequestDtoList,
                                           @Parameter(hidden = true)
                                           @AuthenticationPrincipal User user) throws IOException {

        // 엑셀 파일 생성
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Control status Sheet");
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("순번");
        headerRow.createCell(1).setCellValue("단속일자");
        headerRow.createCell(2).setCellValue("단속시간");
        headerRow.createCell(3).setCellValue("단속위치");
        headerRow.createCell(4).setCellValue("차량번호");


        for (ExcelRequestDto dto : excelRequestDtoList) {
            Row dataRow = sheet.createRow(excelRequestDtoList.size());
            dataRow.createCell(0).setCellValue(dto.getId());
            dataRow.createCell(1).setCellValue(dto.getDate());
            dataRow.createCell(2).setCellValue(dto.getTime());
            dataRow.createCell(3).setCellValue(dto.getLocation());
            dataRow.createCell(4).setCellValue(dto.getCarNum());
        }

        // 엑셀 파일 저장
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        byte[] bytes = outputStream.toByteArray();

        // 엑셀 파일 다운로드
        ByteArrayResource resource = new ByteArrayResource(bytes);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=단속_현황_조회.xlsx")
                .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
                .contentLength(bytes.length)
                .body(resource);
    }
}