package com.svs.Supervision.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {
    private final Logger log = LoggerFactory.getLogger(JwtTokenProvider.class);
    private final UserDetailsService userDetailsService;

    @Value("${springboot.jwt.secret}")
    private String secretKey = "secretKey";
    private final long tokenValidMillisecond = 1000L * 60 * 60 * 24 * 7; //만료 시간 설정 - 7일

    @PostConstruct
    protected void init(){
        log.info("[init] JwtTokenProvider 내 secretKey 초기화 시작");
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes(StandardCharsets.UTF_8));
        log.info("[init] JwtTokenProvider 내 secretKey 초기화 완료");
    }

    public String createToken(String userId){
        log.info("[createToken] 토큰 생성 시작");
        Claims claims = Jwts.claims().setSubject(userId);

        Date now = new Date();

        String token = Jwts.builder()
                .setClaims(claims) //jwt구조 -내용, 사용자 이름
                .setIssuedAt(now) //jwt구조 - 내용, 토큰 발급 시간
                .setExpiration(new Date(now.getTime() + tokenValidMillisecond)) //jwt구조 - 내용 ,토큰 만료시간 설정
                .signWith(SignatureAlgorithm.HS256, secretKey) //jwt구조 - 서명에 담을 정보
                .compact();

        log.info("[createToken] 토큰 생성 완료");
        return token;

    }

    public Authentication getAuthentication(String token){
        log.info("[getAuthentication] 토큰 인증 정보 조회 시작");
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUsername(token));
        log.info("[getAuthentication] 토큰 인증 정보 조회 완료, UserDetails UserName : {}",userDetails.getUsername());

        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    private String getUsername(String token) {
        log.info("[getUsername] 토큰 기반 회원 구별 정보 추출");
        String info = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
        log.info("[getUsername] 토큰 기반 회원 구별 정보 추출 완료 , info : {}", info);
        return info;
    }

    public String resolveToken(HttpServletRequest request){
        log.info(request.getHeader("Authorization: Bearer"));
        log.info("[resolveToken] Http 헤더에서 Token 값 추출");
        return request.getHeader("Authorization");
    }

    public boolean validateToken(String token){
        log.info("[validateToken] 토튼 유효 체크 시작");
        try{
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);

            return !claims.getBody().getExpiration().before(new Date());
        }catch(Exception e){
            log.info("[validateToken] 토큰 유효성 체크 예외 발생");
            return false;
        }
    }


}
