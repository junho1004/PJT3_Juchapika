package com.svs.Supervision.service.record;

import com.svs.Supervision.dto.request.record.RecordDetailRequestDto;
import com.svs.Supervision.dto.request.record.RecordRequestDto;
import com.svs.Supervision.dto.response.record.RecordCarNumResponseDto;
import com.svs.Supervision.dto.response.record.RecordDetailResponseDto;
import com.svs.Supervision.dto.response.record.RecordStatisticsResponseDto;
import com.svs.Supervision.entity.car.Car;
import com.svs.Supervision.entity.record.Record;
import com.svs.Supervision.repository.car.CarRepository;
import com.svs.Supervision.repository.record.RecordRepositoryQdslRepository;
import com.svs.Supervision.repository.record.RecordRepository;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import net.nurigo.sdk.message.Message;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private Environment env;

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

        String apiKey = env.getProperty("coolsms.api.key");
        String apiSecret = env.getProperty("coolsms.api.secret");

//        Cannot resolve constructor 'Message(String, String)'
        Message message = new Message();

        HashMap<String, String> params = new HashMap<>();
        params.put("to", "01042229234"); // 수신자 번호
        params.put("from", "01041193220"); // 발신자 번호
        params.put("type", "SMS");
        params.put("text", "Hi, Fat Boy"); // 메시지 내용
        params.put("app_version", "test app 1.2"); // application name and version

        Message message = new Message(apiKey, apiSecret);

        // Record 가 존재하지 않을경우, 첫 번째(새로운) 단속이므로 Database 에 저장한다.
        if (recordList.size() == 0) {
            // 단속 확정이 아니므로, 차량을 이동해달라는 SMS 를 전송한다.




            recordRepository.save(Record.build(recordRequestDto, car));
        } else { // Record 가 여러개 존재할 경우.. date 기준 정렬 가장 첫 번째 idx
            Record record = recordList.get(0);

            // 5 분뒤 또 단속에 걸리는 경우,
            // 단속으로 확정하며, 단속내용을 고지하는 SMS 를 전송한다.


            if (record.getCnt() == 0) {
                Long carId = record.getCar().getId();
                recordRepository.updateCnt(carId);
            }
        }
    }

    public List<RecordCarNumResponseDto> searchRecord(String carNum) {
        // 단속 기록에 해당 번호판 정보가 존재하는 경우..
//        boolean isExists = recordRepository.existsByCarNum(carNum);
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
}