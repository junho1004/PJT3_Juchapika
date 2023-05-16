package com.svs.Supervision.service.car;

import com.svs.Supervision.entity.car.Car;
import com.svs.Supervision.repository.car.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class CarService {

    private CarRepository carRepository;


}
