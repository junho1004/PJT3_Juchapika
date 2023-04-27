package com.svs.Supervision.controller;


import com.svs.Supervision.dto.request.record.ExcelRequestDto;
import com.svs.Supervision.entity.user.User;
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
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Tag(name = "Record", description = "기록 관련 API")
@RestController
@RequestMapping("/record")
@RequiredArgsConstructor
public class RecordController {

    @GetMapping("/download")
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
