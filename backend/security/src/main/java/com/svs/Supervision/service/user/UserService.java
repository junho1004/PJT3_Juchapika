package com.svs.Supervision.service.user;

import com.svs.Supervision.dto.jwt.SignInResultDto;
import com.svs.Supervision.dto.jwt.SignUpResultDto;
import com.svs.Supervision.entity.user.User;
import com.svs.Supervision.repository.user.UserRepository;
import com.svs.Supervision.security.JwtTokenProvider;
import com.svs.Supervision.security.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class UserService {

    private final Logger log = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    // 로그인
    public SignInResultDto signIn(String userId, String password) {

        log.info("[getSignInResult] signDataHandler 로 회원 정보 요청");

        // 회원 정보 요청
        boolean existedUser = userRepository.existsByUserId(userId);

        // 회원 정보 없을 경우
        if (!existedUser) {
            SignInResultDto dto = new SignInResultDto();
            dto.setMsg("존재하지않는 id");
            dto.setCode(401);
            dto.setSuccess(false);
            return dto;
        }

        // 유저
        User user = userRepository.findByUserId(userId);
        log.info("[getSignInResult] userId : {}", userId);

        // 패스워드 비교 수행
        log.info("[getSignInResult] 패스워드 비교 수행");
        if (!passwordEncoder.matches(password, user.getPassword())) {
            SignInResultDto dto = new SignInResultDto();
            dto.setMsg("잘못된 비밀번호");
            dto.setCode(402);
            dto.setSuccess(false);
            return dto;
        }

        log.info("[getSignInResult] 패스워드 일치");

        log.info("[getSignInResult] SignInResultDto 객체 생성");
        SignInResultDto signInResultDto = SignInResultDto.builder()
                .userId(user.getUserId())
                .token(jwtTokenProvider.createToken(String.valueOf(user.getUserId()))).build();


        log.info("[getSignInResult] SignInResultDto 객체에 값 주입");
        setSuccessResult(signInResultDto);
        log.info(signInResultDto.getToken());

        return signInResultDto;
    }

    private void setSuccessResult(SignUpResultDto result) {
        result.setSuccess(true);
        result.setCode(CommonResponse.SUCCESS.getCode());
        result.setMsg(CommonResponse.SUCCESS.getMsg());
    }

    private void setFailResult(SignUpResultDto result) {
        result.setSuccess(false);
        result.setCode(CommonResponse.FAIL.getCode());
        result.setMsg(CommonResponse.FAIL.getMsg());
    }

    //회원가입
    public SignUpResultDto signUp(String userId, String password) {
        User user = userRepository.save(User.builder()
                .userId(userId)
                // 사용자 비밀번호 encoding(암호화)
                .password(passwordEncoder.encode(password))
                .build());

        User savedUser = userRepository.save(user);

        SignUpResultDto signUpResultDto = new SignInResultDto();

        if (!savedUser.getUserId().isEmpty()) {
            setSuccessResult(signUpResultDto);
        } else {
            setFailResult(signUpResultDto);
        }

        return signUpResultDto;
    }
}