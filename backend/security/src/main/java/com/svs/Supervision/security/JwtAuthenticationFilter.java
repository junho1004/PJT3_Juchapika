package com.svs.Supervision.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final Logger log = LoggerFactory.getLogger(JwtTokenProvider.class);
    private final JwtTokenProvider jwtTokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // Swagger UI 접근 시에는 JWT 토큰 검사를 하지 않음
        if (isSwaggerRequest(request)) {
            filterChain.doFilter(request, response);
            return;
        }

        //토큰 추출
        String token = jwtTokenProvider.resolveToken(request);
        if (token != null) {
            token = token.split(" ")[1];
        }

        log.info("[doFilterInternal] token 값 추출 완료. token : {}" , token);


        if (token == null) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
            return;
        }
        if (!jwtTokenProvider.validateToken(token)) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
            return;
        }

//        log.info("[doFilterInternal] token 값 추출 완료. token : {}" , token);
//
//        log.info("[doFilterInternal] token 값 유효성 검사 시작");
//        if(token != null && jwtTokenProvider.validateToken(token)){
//            Authentication authentication = jwtTokenProvider.getAuthentication(token);
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//            log.info("[doFilterInternal] token 값 유효성 검사 완료");
//        }

        // 인증 정보 설정
        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        SecurityContextHolder.getContext().setAuthentication(authentication);


        filterChain.doFilter(request, response);
    }

    private boolean isSwaggerRequest(HttpServletRequest request) {
        String path = request.getServletPath();
        log.info(String.valueOf(request));
        log.info(path);

        // 토큰 검증이 필요함
        if (path.startsWith("/record") || path.startsWith("/sms")) {
            return false;
        }

        return path.startsWith("/swagger-ui/") ||
                path.startsWith("/swagger-resources/") ||
                path.startsWith("/v2/api-docs") ||
                path.startsWith("/webjars/") ||
                path.startsWith("/swagger/") ||
                path.startsWith("sign-api/exception") ||
                path.startsWith("/")
                ;
    }

//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//
//
//
//        //토큰 추출
//        String token = jwtTokenProvider.resolveToken(request);
//
//        if (token != null) {
//            token = token.split(" ")[1];
//        } else {
//            throw new ServletException("JWT 토큰이 없습니다.");
//        }
//
//        log.info("[doFilterInternal] token 값 추출 완료. token : {}" , token);
//
//        log.info("[doFilterInternal] token 값 유효성 검사 시작");
//
//        if(token != null && jwtTokenProvider.validateToken(token)){
//            Authentication authentication = jwtTokenProvider.getAuthentication(token);
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//            log.info("[doFilterInternal] token 값 유효성 검사 완료");
//        }
//
//        filterChain.doFilter(request, response);
//    }
//
//    @Override
//    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
//        String path = request.getServletPath();
//        return path.startsWith("/swagger") || path.startsWith("/api");
//    }

//    @Override
//    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
//        String path = request.getRequestURI();
//        String method = request.getMethod();
//
//        log.info("==========");
//        log.info(path);
//        log.info("==========");
//        log.info(String.valueOf(path.startsWith("/api/")));
//        log.info(String.valueOf(path.startsWith("/v2/api-docs")));
//        log.info(String.valueOf(path.startsWith("/api/swagger-ui/index.html")));
//        log.info(String.valueOf(path.startsWith("/swagger-resources")));
//        log.info(String.valueOf(path.startsWith("/swagger-ui.html")));
//        log.info(String.valueOf(path.startsWith("/webjars/")));
//
//        return method.equals("OPTIONS") ||
//                path.startsWith("/api/") ||
//                path.startsWith("/v2/api-docs") ||
//                path.startsWith("/swagger-resources") ||
//                path.startsWith("/swagger-ui.html") ||
//                path.startsWith("/webjars/");
//    }
}
