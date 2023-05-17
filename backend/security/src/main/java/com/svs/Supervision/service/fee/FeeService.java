package com.svs.Supervision.service.fee;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class FeeService {
    private static final String AES_CIPHER_ALGORITHM = "AES/CBC/PKCS5PADDING";
    private static final String AES_SECRET_KEY = "1234567890123456"; // 16자리 비밀키
    private static final String AES_INITIALIZATION_VECTOR = "1234567890123456"; // 16자리 초기화 벡터

    public  String encrypt(String plainText) {
        try {
            IvParameterSpec ivParameterSpec = new IvParameterSpec(AES_INITIALIZATION_VECTOR.getBytes(StandardCharsets.UTF_8));
            SecretKeySpec secretKeySpec = new SecretKeySpec(AES_SECRET_KEY.getBytes(StandardCharsets.UTF_8), "AES");

            Cipher cipher = Cipher.getInstance(AES_CIPHER_ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec, ivParameterSpec);

            byte[] cipherText = cipher.doFinal(plainText.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(cipherText);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static String decrypt(String cipherText) {
        try {
            IvParameterSpec ivParameterSpec = new IvParameterSpec(AES_INITIALIZATION_VECTOR.getBytes(StandardCharsets.UTF_8));
            SecretKeySpec secretKeySpec = new SecretKeySpec(AES_SECRET_KEY.getBytes(StandardCharsets.UTF_8), "AES");

            Cipher cipher = Cipher.getInstance(AES_CIPHER_ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, secretKeySpec, ivParameterSpec);
            System.out.println(111);
            byte[] original = cipher.doFinal(Base64.getDecoder().decode(cipherText));
            return new String(original, StandardCharsets.UTF_8);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
