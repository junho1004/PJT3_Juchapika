#!/usr/bin/env
# -*- coding: utf-8 -*-

import rclpy
from sensor_msgs.msg import BatteryState
import websocket
import json
import time
import requests

ws = websocket.WebSocket()

def battery_state_callback(msg):
    # 콜백 함수에서 수신한 메시지 처리
    print("Percentage: %f" % (msg.percentage))
    
    current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    
    data_dict = {
        "battery": msg.percentage,
        "time": current_time
    }
    data_json = json.dumps(data_dict)
    ws.send(data_json)
    ws.send("Hello, Server")
    

def main():
    rclpy.init()
    requests.get("http://59.79.199.205:5000/detect")
    
    ws.connect("ws://52.79.199.205:8082")  
    
    node = rclpy.create_node('battery_state_subscriber')
    subscriber = node.create_subscription(BatteryState, '/battery_state', battery_state_callback, 10)
    # 토픽을 구독하고 새 메시지가 도착할 때마다 battery_state_callback() 함수를 호출합니다.
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
