#!/usr/bin/env python
# -*- coding: utf-8 -*-

import rclpy
from sensor_msgs.msg import BatteryState
import time
import requests

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate('/home/jucha/mykey.json')
firebase_admin.initialize_app(cred, {'projectID' : 'juchapika'})
db = firestore.client()
last_callback_time = 0
last_percentage = 1000
temp_battery = db.collection(u'Turtlebot3').document(u'signal_battery')
temp_time = db.collection(u'Turtlebot3').document(u'signal_time')

def battery_state_callback(msg):
    global last_callback_time
    global last_percentage
    global temp_battery
    
    now_percentage = round(msg.percentage)
    delay_1minute = time.time()

    if delay_1minute - last_callback_time > 60 and last_percentage > now_percentage:
        if now_percentage > 100.0:
            now_percentage = 100.0
            
        print("Percentage: %d" %(now_percentage))
        temp_battery.set({u'percentage' : now_percentage})
        
        last_callback_time = delay_1minute
        last_percentage = now_percentage
   
    
def main():
    rclpy.init()
    # EC2의 Flask에 http 요청
    #=========================================================#
    # res = requests.get("http://52.79.199.205:7000/detect")
    # print(res.status_code)
    #=========================================================#

    # firebaseDB에 현재 시간 저장
    #=========================================================#
    current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    temp_time.set({u'start_time' : current_time})
    #=========================================================#

    node = rclpy.create_node('battery_state_subscriber')
    subscriber = node.create_subscription(BatteryState, '/battery_state', battery_state_callback, 10)
    
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
