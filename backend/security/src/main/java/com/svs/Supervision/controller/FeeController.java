package com.svs.Supervision.controller;

import com.svs.Supervision.service.fee.FeeService;
import com.svs.Supervision.service.record.RecordService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Fee", description = "차량 관련 API")
@RestController
@RequestMapping("/feeletter")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class FeeController {
    private final FeeService feeService;

    @GetMapping("/{id}")
    public ResponseEntity<?> searchByRecord(@PathVariable("id") String recordEncry ) {
        System.out.println(recordEncry);
        String encryptedText = feeService.encrypt(recordEncry);
        System.out.println("암호화된 텍스트: " + encryptedText);
        String encryptedData = encryptedText;
        // 복호화
        String decryptedText = feeService.decrypt(recordEncry);
        System.out.println("복호화된 텍스트: " + decryptedText);
        return null;
    }


}
