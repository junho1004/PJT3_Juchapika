package com.svs.Supervision.service.record;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.http.HttpRequest;
import com.svs.Supervision.dto.request.record.RecordDetailRequestDto;
import com.svs.Supervision.dto.request.record.RecordIdCarNumRequestDto;
import com.svs.Supervision.dto.request.record.RecordIdRequestDto;
import com.svs.Supervision.dto.request.record.RecordRequestDto;
import com.svs.Supervision.dto.request.sms.SmsSendRequestDto;
import com.svs.Supervision.dto.response.record.RecordCarNumResponseDto;
import com.svs.Supervision.dto.response.record.RecordDetailResponseDto;
import com.svs.Supervision.dto.response.record.RecordStatisticsResponseDto;
import com.svs.Supervision.entity.car.Car;
import com.svs.Supervision.entity.record.Record;
import com.svs.Supervision.repository.car.CarRepository;
import com.svs.Supervision.repository.record.RecordRepositoryQdslRepository;
import com.svs.Supervision.repository.record.RecordRepository;
import lombok.RequiredArgsConstructor;
import java.text.SimpleDateFormat;
import lombok.Value;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.core.env.Environment;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class RecordService {

    private final RecordRepositoryQdslRepository recordRepositoryQdslRepository;
    private final RecordRepository recordRepository;
    private final CarRepository carRepository;


    public void sendMsg(Car car, String msg ,String token) {
        String url = "http://localhost:8081/api/sms/send-one";
        HttpClient httpClient = HttpClient.newHttpClient();
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            String jsonString = objectMapper.writeValueAsString(new SmsSendRequestDto(car.getPhoneNum(), msg));

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Content-Type", "application/json")
                    .header("Authorization", token)
                    .POST(HttpRequest.BodyPublishers.ofString(jsonString))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 1. 입력박은 차량 번호판 정보를 통해 carId를 찾는다.
    // 2. carId를 통해 Record 를 조회한다.
    // 3. Record 가 여러개 존재할 경우.. date 기준 정렬 가장 첫 번째 idx
    // 3. Record 가 존재하지 않을경우, 첫 번째 단속이므로 Database 에 저장한다.
    // 4. 이미 Record 가 존재할 경우, 단속 횟수(cnt) 에 1을 더한다.
    // 4-1. 만약 단속 횟수(cnt) 가 1 이상일 경우에는 pass.
    // 12시에 초기화 (Scheduler)
    public void addRecord(RecordRequestDto recordRequestDto) {
        String carNum = recordRequestDto.getCarNum();
        Car car = carRepository.findByCarNum(carNum);
        List<Record> recordList = recordRepositoryQdslRepository.findAllRecordByCarNumWhereCntZero(carNum);

        // Record 가 존재하지 않을경우 (단속이 되지 않은 기록만 조회한다), 첫 번째(새로운) 단속이므로 Database 에 저장한다.
        if (recordList.size() == 0) {

            System.out.println("단속 확정이 아니므로, 차량을 이동해달라는 SMS 를 전송한다.");
            // 단속 확정이 아니므로, 차량을 이동해달라는 SMS 를 전송한다.
//            sendMsg(car,
//                    "[JUCHAPIKA] 단속 알리미 \n" +
//                            "주정차 위반 금지구역에 차량이 확인되었습니다. \n 기준시간내에 차량을 이동시켜주세요 \n" +
//                            "- 성명 : " + car.getName() + "\n" +
//                            "- 차종 : " + car.getModel() + "\n" +
//                            "- 번호판 : " + car.getCarNum()
//            );

            recordRepository.save(Record.build(recordRequestDto, car));

        } else { // Record 가 여러개 존재할 경우.. date 기준 정렬 가장 첫 번째 idx 의 기록의 cnt 가 0 인 경우, 1 이상인 경우..
            Record record = recordList.get(0);

            // 현재 시간을 구합니다.
            LocalDateTime now = LocalDateTime.now();
            // 해당 기록의 date와 현재 시간의 차이를 구합니다.
            Duration duration = Duration.between(record.getDate(), now);

            System.out.println(now);
            System.out.println(record.getDate());
            System.out.println(duration.toMinutes());

            if (duration.toMinutes() >= 5) {
                System.out.println("단속 확정.");
                // 5 분뒤 또 단속에 걸리는 경우,
//                sendMsg(car,"[JUCHAPIKA] 단속 알리미 \n" +
//                                "단속 기준시간 초과로 확인되었습니다. \n" +
//                                "- 성명 : " + car.getName() + "\n" +
//                                "- 차종 : " + car.getModel() + "\n" +
//                                "- 번호판 : " + car.getCarNum()
//                );

                Long carId = record.getCar().getId();
                recordRepository.updateCnt(carId, record.getId());
            }
        }
    }
    public void fineRecord(RecordIdRequestDto recordIdRequestDto,String token){
        Record record = recordRepository.getById(recordIdRequestDto.getId());
        Car car = record.getCar();
        String feeUrl = "https://jupika.site/api/feeletter/"+(record.getId());
        System.out.println(feeUrl);
        System.out.println(car.getPhoneNum());
        record.cntUpdate(2L);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd HH시mm분");
        String formattedDateTime = record.getDate().format(formatter);

        sendMsg(car,"[JUCHAPIKA] 단속 알리미 \n" +
                "단속 기준시간 초과로 확인되었습니다. \n" +
                "- 성명 : " + car.getName() + "\n" +
                "- 차종 : " + car.getModel() + "\n" +
                "- 번호판 : " + car.getCarNum()+ "\n" +
                "- 일시 : " + formattedDateTime + "\n" +
                "- 장소 : " + record.getLocation() +"\n" +
                "- 고지서 :"+ feeUrl, token
        );
    }

    public List<RecordCarNumResponseDto> searchRecord(String carNum) {
        // 단속 기록에 해당 번호판 정보가 존재하는 경우..
//        boolean isExists = recordRepository.existsByCarNum(carNum);
        System.out.println(carNum);
        Car car = carRepository.findByCarNum(carNum);
        boolean isExists = recordRepository.existsByCar_Id(car.getId());

        List<RecordCarNumResponseDto> recordCarNumResponseDtoList = new ArrayList<>();

        if (isExists) {
            // 단속 기록을 조회한다.
            List<Record> recordList = recordRepositoryQdslRepository.findAllRecordByCarNumWhereCntZero(carNum);

            for (Record record : recordList) {
                recordCarNumResponseDtoList.add(RecordCarNumResponseDto.build(record));
            }

            return recordCarNumResponseDtoList;
        } else { // 단속 차량이 없는 경우
            return null;
        }
    }

    public RecordCarNumResponseDto searchRecordById(Long id) {

        Optional<Record> record = recordRepository.findById(id);

        if(!record.isPresent()){
            return null;
        }
        else {
            Car car = record.get().getCar();

            return RecordCarNumResponseDto.builder()
                    .id(record.get().getId())
                    .date(record.get().getDate())
                    .location(record.get().getLocation())
                    .plateImageUrl(record.get().getPlateImageUrl())
                    .carImageUrl(record.get().getCarImageUrl())
                    .fine(record.get().getFine())
                    .pay(record.get().getPay())
                    .carNum(car.getCarNum())
                    .phoneNum(car.getPhoneNum())
                    .name(car.getName())
                    .address(car.getAddress())
                    .model(car.getModel())
                    .color(car.getColor())
                    .build();
        }
    }



    public List<RecordCarNumResponseDto> searchLiveReport() {
        List<RecordCarNumResponseDto> recordCarNumResponseDtoList = new ArrayList<>();

        List<Record> recordList = recordRepositoryQdslRepository.findAllRecordByWhereCntZero();

        // record 의 carNum 들을 DTO 에 넣자!
        for (Record record : recordList) {
            recordCarNumResponseDtoList.add(RecordCarNumResponseDto.builder()
                    .id(record.getId())
                    .date(record.getDate())
                    .location(record.getLocation())
                    .plateImageUrl(record.getPlateImageUrl())
                    .carImageUrl(record.getCarImageUrl())
                    .fine(record.getFine())
                    .pay(record.getPay())
                    .name(record.getCar().getName())
                    .phoneNum(record.getCar().getPhoneNum())
                    .address(record.getCar().getAddress())
                    .model(record.getCar().getModel())
                    .color(record.getCar().getColor())
                    .carNum(record.getCar().getCarNum())
                    .build());
        }

        return recordCarNumResponseDtoList;
    }
    @Transactional
    public boolean updateRecord(RecordIdCarNumRequestDto recordIdCarNumRequestDto){
        String carNum = recordIdCarNumRequestDto.getCarNum();
        Long id = recordIdCarNumRequestDto.getId();
        Car car = carRepository.findByCarNum(carNum);
        if(car == null){
            return false;
        }

        Record record = recordRepository.getById(id);
        record.updateRecord(1L,car);

        return true;
    }

    public List<RecordDetailResponseDto> searchDetail(RecordDetailRequestDto recordDetailRequestDto) {

        List<RecordDetailResponseDto> recordDetailResponseDtoList = new ArrayList<>();

        // 1. 시작시간과 마지막 시간은 필수이다.
        // 2. district 가 default(전체) 인 경우에는 조건에서 제외한다.
        // 3. dong 이 default(전체) 인 경우에는 조건에서 제외한다.
        List<Record> recordList = recordRepositoryQdslRepository.findAllRecordByDetail(recordDetailRequestDto);

        for (Record record : recordList) {
            recordDetailResponseDtoList.add(RecordDetailResponseDto.build(record));
        }

        return recordDetailResponseDtoList;
    }

    public List<RecordStatisticsResponseDto> searchStatistics(RecordDetailRequestDto recordDetailRequestDto) {

        List<RecordStatisticsResponseDto> recordStatisticsResponseDtoList = new ArrayList<>();
        List<Record> recordList = recordRepositoryQdslRepository.findAllRecordByDateForStatistics(recordDetailRequestDto);

        HashMap<LocalDate, HashMap<String, Long>> newMap = new HashMap<>();

        List<String> county = Arrays.asList("광산구", "남구", "북구", "서구", "동구");


        // 1. recordList 를 뒤지면서, 날짜별로 newMap 에 {Date: countyMap} 을 추가한다.
        // 2. 다시 recordList 를 뒤지면서 , 해당 Date 의 Value countyMap 을 가져온다.
        // 3. countyMap 의 county 의 숫자를 1 증가시키고 저장한다.

        for (Record record : recordList) {
            if (newMap.get(record.getDate().toLocalDate()) == null) {
                HashMap<String, Long> countyMap = new HashMap<>();

                // HashMap 초기화
                for (String c : county) {
                    countyMap.put(c, 0L);
                }
                newMap.put(record.getDate().toLocalDate(), countyMap);
            }
        }


        for (Record record : recordList) {
            System.out.println(record);
            for (String c : county) {
                if (record.getLocation().contains(c)) {
                    HashMap<String, Long> countyMap2 = newMap.get(record.getDate().toLocalDate());
                    countyMap2.put(c, countyMap2.get(c) + 1);
                    newMap.put(record.getDate().toLocalDate(), countyMap2);
                }
            }
        }


        recordStatisticsResponseDtoList.add(RecordStatisticsResponseDto.build(newMap));

        return recordStatisticsResponseDtoList;
    }

    public void deleteRecordById(Long id) {
        recordRepository.deleteById(id);
    }
}