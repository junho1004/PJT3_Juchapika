
package com.svs.Supervision.controller;


import com.svs.Supervision.dto.request.record.*;
import com.svs.Supervision.dto.response.api.ApiResponseDto;
import com.svs.Supervision.dto.response.record.RecordCarNumResponseDto;
import com.svs.Supervision.dto.response.record.RecordDetailResponseDto;
import com.svs.Supervision.dto.response.record.RecordStatisticsResponseDto;
import com.svs.Supervision.entity.user.User;
import com.svs.Supervision.service.record.RecordService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Cell;
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
import org.springframework.web.client.RestTemplate;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import static io.swagger.v3.oas.integration.StringOpenApiConfigurationLoader.LOGGER;

@Tag(name = "Record", description = "기록 관련 API")
@RestController
@RequestMapping("/record")
@CrossOrigin(origins = "*", allowedHeaders="*") // 컨트롤러에서 설정
@RequiredArgsConstructor
public class RecordController {
    private RestTemplate restTemplate;
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

        // 정상적으로 저장이 된 경우,
        recordService.addRecord(recordRequestDto);
        return new ResponseEntity(new ApiResponseDto(true, "addRecord successfully@", null), HttpStatus.CREATED);
    }

    // 단속 차량 최종 등록
    // 1. request에서 id과 carNum 값을 받는다.
    // 2. recordId를 기준으로 record의 기록을 찾아온다.
    // 3. carNum을 기준으로 car의 정보를 찾아온다.
    // 4. car의 정보가 있으면 car의 정보를 조회하고 없으면 실패 요청 보낸다.
    // 5. record테이블의 정보를 cnt=2, car 정보를 새로 조회한 정보로 update 한다.
    @PutMapping("/update")
    @Operation(summary = "단속 차량 최종 등록", description = "recordId와 번호판을 기준으로 단속된 차량의 단속 기록을 저장합니다.")
    public ResponseEntity<?> updateRecord(@RequestBody RecordIdCarNumRequestDto recordIdCarNumRequestDto,
                                       @Parameter(hidden = true)
                                       @AuthenticationPrincipal User user) {
        boolean update = recordService.updateRecord(recordIdCarNumRequestDto);
        if(!update){
            return new ResponseEntity(new ApiResponseDto(false, "has no carNum@", null), HttpStatus.OK);
        }
        return new ResponseEntity(new ApiResponseDto(true, "updateRecord successfully@", null), HttpStatus.OK);
    }


    // 1. 번호판 넘버를 기준으로, 먼저 차량의 id (carId)를 찾습니다.
    // 2. carId를 기준으로 record 들을 기록을 찾아옵니다.

    @PostMapping("/search-by-carnum")
    @Operation(summary = "단속 차량 조회", description = "번호판 기준으로 단속된 차량의 단속 기록들을 조회합니다.")
    public ResponseEntity<?> searchRecordByCarNum(@RequestBody RecordCarNumRequestDto recordCarNumRequestDto,
                                          @Parameter(hidden = true)
                                          @AuthenticationPrincipal User user) {
        LOGGER.info("searchRecord() 호출 : " + recordCarNumRequestDto);
        List<RecordCarNumResponseDto> recordCarNumResponseDtoList = recordService.searchRecord(recordCarNumRequestDto.getCarNum());

        if (recordCarNumResponseDtoList == null) {
            return new ResponseEntity(new ApiResponseDto(false, "searchRecord Fail@", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(true, "searchRecord successfully@", recordCarNumResponseDtoList), HttpStatus.OK);
        }
    }


    @PostMapping("/search-by-id")
    @Operation(summary = "단속 차량 조회", description = "기록 Id 기준으로 단속된 차량의 단속 기록들을 조회합니다.")
    public ResponseEntity<?> searchRecordById(@RequestBody RecordCarIdRequestDto recordCarIdRequestDto,
                                          @Parameter(hidden = true)
                                          @AuthenticationPrincipal User user) {
        LOGGER.info("searchRecordById() 호출 : " + recordCarIdRequestDto);
        RecordCarNumResponseDto recordCarNumResponseDto = recordService.searchRecordById(recordCarIdRequestDto.getId());

        return new ResponseEntity(new ApiResponseDto(true, "searchRecordById successfully@", recordCarNumResponseDto), HttpStatus.OK);
    }


    @DeleteMapping("/delete-by-id")
    @Operation(summary = "단속 기록 삭제", description = "기록 Id 기준으로 단속된 차량의 단속 기록들을 조회합니다.")
    public ResponseEntity<?> deleteRecordById(@RequestBody RecordCarIdRequestDto recordCarIdRequestDto,
                                              @Parameter(hidden = true)
                                              @AuthenticationPrincipal User user) {

        LOGGER.info("deleteRecordById() 호출 : " + recordCarIdRequestDto);
        recordService.deleteRecordById(recordCarIdRequestDto.getId());

        return new ResponseEntity(new ApiResponseDto(true, "deleteRecordById successfully@", null), HttpStatus.OK);
    }



    @PostMapping("/search-by-detail")
    @Operation(summary = "단속 현황 조회", description = "날짜, 지역, 동을 기준으로 단속 기록들을 조회합니다.")
    public ResponseEntity<?> searchDetail(@RequestBody RecordDetailRequestDto recordDetailRequestDto,
                                           @Parameter(hidden = true)
                                           @AuthenticationPrincipal User user) {

        LOGGER.info("searchDetail() 호출 : " + recordDetailRequestDto);

        List<RecordDetailResponseDto> recordDetailResponseDtoList = recordService.searchDetail(recordDetailRequestDto);

        return new ResponseEntity(new ApiResponseDto(true, "searchDetail successfully@", recordDetailResponseDtoList), HttpStatus.OK);
    }


    @GetMapping("/live-report-list")
    @Operation(summary = "실시간 단속 목록 조회", description = "단속이 확정된 차량들의 리스트를 조회합니다.")
    public ResponseEntity<?> searchLiveReport(@Parameter(hidden = true)
                                              @AuthenticationPrincipal User user) {

        LOGGER.info("searchDetail() 호출");

        List<RecordCarNumResponseDto> recordCarNumResponseDtoList = recordService.searchLiveReport();
        return new ResponseEntity(new ApiResponseDto(true, "searchLiveReport successfully@", recordCarNumResponseDtoList), HttpStatus.OK);
    }




    // 1. 전달받은 starDate 와 endDate 를 기준으로 Record 에서 데이터를 조회한다.
    // 2. 조회한 데이터들 중, 5개의 지역별로 개수를 새어 HashMap 형태로 저장한다.
    // ex) 날짜: Date, 통계: {"광산구" : 5, "xx구" : 1, "xx구" : 7}
    @PostMapping("/statistics")
    @Operation(summary = "단속 차량 통계", description = "날짜 기준으로 단속된 차량의 단속 기록들에 대한 통계 기록을 확인합니다.")
    public ResponseEntity<?> searchStatistics(@RequestBody RecordDetailRequestDto recordDetailRequestDto,
                                           @Parameter(hidden = true)
                                           @AuthenticationPrincipal User user) throws IOException {

        LOGGER.info("searchStatistics() 호출 : " + recordDetailRequestDto);

        List<RecordStatisticsResponseDto> recordStatisticsResponseDtoList = recordService.searchStatistics(recordDetailRequestDto);

        System.out.println(recordStatisticsResponseDtoList.get(0).getCounty());

        return new ResponseEntity(new ApiResponseDto(true, "searchStatistics successfully@", recordStatisticsResponseDtoList), HttpStatus.OK);
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

        
        for (int i = 0; i < excelRequestDtoList.size(); i++) {
            ExcelRequestDto dto = excelRequestDtoList.get(i);
            Row dataRow = sheet.createRow(i + 1); // 행의 인덱스를 i + 1로 지정
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