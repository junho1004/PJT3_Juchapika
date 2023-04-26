package com.svs.Supervision.controller;

import com.svs.Supervision.dto.request.CarNumberListRequestDto;
import com.svs.Supervision.dto.request.CarNumberRequestDto;
import com.svs.Supervision.entity.user.Admin;
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
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import static io.swagger.v3.oas.integration.StringOpenApiConfigurationLoader.LOGGER;

@Tag(name = "Record", description = "기록 관련 API")
@RestController
@RequestMapping("/record")
@RequiredArgsConstructor
public class RecordController {

    @GetMapping("/download")
    public ResponseEntity<?> downloadExcel() throws IOException {

        // 엑셀 파일 생성
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Sample Sheet");
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("Column 1");
        headerRow.createCell(1).setCellValue("Column 2");
        Row dataRow = sheet.createRow(1);
        dataRow.createCell(0).setCellValue("Value 1");
        dataRow.createCell(1).setCellValue("Value 2");

        // 엑셀 파일 저장
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        byte[] bytes = outputStream.toByteArray();

        // 엑셀 파일 다운로드
        ByteArrayResource resource = new ByteArrayResource(bytes);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=sample.xlsx")
                .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
                .contentLength(bytes.length)
                .body(resource);
    }
}
