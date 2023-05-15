package com.svs.Supervision.controller;

import com.svs.Supervision.dto.request.sms.SmsSendRequestDto;
import com.svs.Supervision.entity.user.User;
import io.swagger.v3.oas.annotations.Parameter;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sms")
@CrossOrigin(origins = "http://localhost:3000") // 컨트롤러에서 설정
public class AlertController {

    final DefaultMessageService messageService;

    public AlertController() {
        // 반드시 계정 내 등록된 유효한 API 키, API Secret Key를 입력해주셔야 합니다!
        this.messageService = NurigoApp.INSTANCE.initialize("NCSCOGUYJX1YCUB9", "FAAQGUZSFSYHSJXL5SUBEZWGVIJUBMJG", "https://api.coolsms.co.kr");
    }

    /**
     * 단일 메시지 발송 예제
     */
    @PostMapping("/send-one")
    public SingleMessageSentResponse sendOne(@RequestBody SmsSendRequestDto smsSendRequestDto,
                                             @Parameter(hidden = true)
                                             @AuthenticationPrincipal User user) {
        Message message = new Message();
        // 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
        message.setFrom("01041193220");
        message.setTo(smsSendRequestDto.getSetTo());
        message.setText(smsSendRequestDto.getSetText());
        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
        System.out.println(response);

        return response;
    }
}
//"FAT BOY 경보! \n FAT BOY 경보! \n FAT BOY 경보! \n FAT BOY 경보!"