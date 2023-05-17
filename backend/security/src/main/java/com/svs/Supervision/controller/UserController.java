package com.svs.Supervision.controller;

import com.svs.Supervision.dto.jwt.SignInResultDto;
import com.svs.Supervision.dto.request.user.UserLoginRequestDto;
import com.svs.Supervision.dto.request.user.UserSignupRequestDto;
import com.svs.Supervision.dto.response.api.ApiResponseDto;
import com.svs.Supervision.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static io.swagger.v3.oas.integration.StringOpenApiConfigurationLoader.LOGGER;

@Tag(name = "User", description = "유저 관련 API")
@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "https://juchapika.site") // 컨트롤러에서 설정
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    @Operation(summary = "회원가입")
    public ResponseEntity<?> signUp(@RequestBody UserSignupRequestDto userRequestDto){
        LOGGER.info("[signUp] 회원가입을 수행합니다. user_id : {}, password : ****, name : {}", userRequestDto.getUserId(), userRequestDto.getPassword());

        userService.signUp(userRequestDto.getUserId(), userRequestDto.getPassword());

        return new ResponseEntity(new ApiResponseDto(true, "User singUp successfully@", null), HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    @Operation(summary = "로그인")
    public ResponseEntity<?> signIn(@RequestBody UserLoginRequestDto userLoginDto){
        LOGGER.info("[signIn] 로그인을 시도하고 있습니다. id : {}, pw : ****", userLoginDto.getUserId());

        SignInResultDto signInResultDto = userService.signIn(userLoginDto.getUserId(), userLoginDto.getPassword());

        ResponseEntity responseEntity = null;
        System.out.println(signInResultDto.getCode());
        switch (signInResultDto.getCode()) {
            case 200:
                LOGGER.info("[signIn] 정상적으로 로그인되었습니다. id : {}, token : {}", userLoginDto.getUserId(), signInResultDto.getToken());
                responseEntity = new ResponseEntity(new ApiResponseDto(true, "User signIn Successfully@", signInResultDto), HttpStatus.CREATED);
                break;
            case 401:
                LOGGER.info("[singIn] 로그인에 실패하였습니다 401. ID가 존재하지 않습니다.");
                responseEntity = new ResponseEntity(new ApiResponseDto(true, "User signIn Fail@", signInResultDto), HttpStatus.UNAUTHORIZED);
                break;
            case 402:
                LOGGER.info("[singIn] 로그인에 실패하였습니다 402. 비밀번호가 일치하지 않습니다.");
                responseEntity = new ResponseEntity(new ApiResponseDto(true, "User signIn Fail@", signInResultDto), HttpStatus.UNAUTHORIZED);
                break;
        }

        System.out.println(responseEntity);

        return responseEntity;
    }
}
