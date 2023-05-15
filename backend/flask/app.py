from flask import Flask, jsonify, Response, render_template
from flask_cors import CORS
from urllib import request, parse
import dbModule
import boto3
import numpy as np
import av
import cv2
import os
import torch
import easyocr
from PIL import ImageFont, ImageDraw, Image
import datetime
from config import BUCKET_NAME,AWS_S3_BUCKET_REGION
import re
import json
from connectionS3 import s3_connection, s3_put_object
import sys
from sdk.api.message import Message
from sdk.exceptions import CoolsmsException
app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

os.environ['AWS_ACCESS_KEY_ID'] = 'AKIAQVY7NV32G734VFPX'
os.environ['AWS_SECRET_ACCESS_KEY'] = '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'
os.environ['AWS_REGION'] = 'ap-northeast-2'


def load_model():
    lp_m = torch.hub.load('ultralytics/yolov5', 'custom', 'lp_det.pt')
    reader = easyocr.Reader(['en'], detect_network='craft', recog_network='best_acc',
                            user_network_directory='lp_models/user_network', model_storage_directory='lp_models/models')
    return lp_m, reader

def detect(lp_m, reader, frame):
    fontpath = "SpoqaHanSansNeo-Light.ttf"
    font = ImageFont.truetype(fontpath, 100)
    to_draw = frame.copy()
    result_text = []
    lp_x, lp_y, lp_x1, lp_y1 = 0, 0, 0, 0
    lp_results = lp_m(to_draw)

    for idx, item in enumerate(lp_results.xyxy[0]):
        lp_x, lp_y, lp_x1, lp_y1 = item[:4].cpu().detach().numpy().astype(np.int32)
        extra_boxes = 0
        lp_im = cv2.cvtColor(cv2.resize(to_draw[lp_y - extra_boxes:lp_y1 + extra_boxes, lp_x - extra_boxes:lp_x1 + extra_boxes], (224, 128)), cv2.COLOR_BGR2GRAY)
        text = reader.readtext(lp_im, detail=0, paragraph=False)
        probability = item[4].item()

        if probability > 0.70 and text:
            result_text.append((text[0], probability))
            # cv2.rectangle(to_draw, (lp_x, lp_y), (lp_x1, lp_y1), (255, 0, 255), thickness=5)

    return to_draw, result_text, lp_x, lp_y, lp_x1, lp_y1

@app.route('/detect')
def detectKi():
    lp_m, reader = load_model()
    kvs = boto3.client("kinesisvideo", region_name="ap-northeast-2")
    stream = kvs.get_data_endpoint(
        StreamARN="arn:aws:kinesisvideo:ap-northeast-2:046773677812:stream/juchapika-stream/1682054366062",
        APIName="GET_MEDIA"
    )
    kvs_stream_endpoint = stream["DataEndpoint"]
    kvs_video_client = boto3.client("kinesis-video-media", endpoint_url=kvs_stream_endpoint)
    kvs_stream = kvs_video_client.get_media(
    StreamARN="arn:aws:kinesisvideo:ap-northeast-2:046773677812:stream/juchapika-stream/1682054366062",
    StartSelector={
        "StartSelectorType": "NOW"
        }
    )
    s3 = s3_connection()
    container = av.open(kvs_stream["Payload"])

    nums = set()  # 인식된 번호판을 저장할 set
    # fontpath = "SpoqaHanSansNeo-Light.ttf"  # 글꼴 경로
    # font = ImageFont.truetype(fontpath, 100)  # 글꼴 객체 생성
    db_class = dbModule.Database()
    for frame in container.decode(video=0):
        now = datetime.datetime.now()  # 현재 시각을 저장
        nowDate = str(now.strftime('%Y%m%d'))
        # 번호판 인식 함수 호출
        im, text, lp_x, lp_y, lp_x1, lp_y1 = detect(lp_m, reader, np.array(frame.to_image()))
        print("인식된 번호판 텍스트: ", text)
        location="광주광역시"
        if len(text) > 0 and text[0][0] not in nums and re.match(r'[0-9]{2,3}[가-힣][0-9]{4}', text[0][0]):    
            nums.add(text[0][0])
            carNum = text[0][0]
            sql = "select * from car where car_num='"+carNum+"'"
            carInfo = db_class.executeAll(sql)

            if len(carInfo)==0:
                print('등록된 차량이 존재 하지 않습니다')
                continue
            carId = str(carInfo[0]['id'])
            print(carId)
            sql = "select * \
            from record r\
            join car c\
            on r.car_id = c.id\
            where date_format('"+str(now)+"','%%Y-%%m-%%d') = date_format(r.date,'%%Y-%%m-%%d') and c.car_num = '"+carNum+"'\
            order by date desc limit 1;"
            result = db_class.executeAll(sql)
            print(len(result))
            if len(result)==0:
            # 번호판 텍스트를 이미지에 씌우기
                img_pil = Image.fromarray(im)
                # draw = ImageDraw.Draw(img_pil)
                # draw.text((100, 100), text[0][0], font=font, fill=(255, 0, 255))
                
                # 파일명 생성
                common = f"{now.strftime('%Y%m%d%H%M%S')}_{text[0][0][-4:]}"
                origin = common + "_1.jpg"
                zoom = common + "_2.jpg"
                
                # 파일 저장
                cv2.imwrite(origin, im)
                cv2.imwrite(zoom, im[lp_y:lp_y1, lp_x:lp_x1])
                im = np.array(img_pil)

                data = open(origin, 'rb') 
                data1 = open(zoom,'rb')

                originPath =nowDate+"/"+carNum+"._1jpg"
                zoomPath=nowDate+"/"+carNum+"_2.jpg"

                ret = s3_put_object(s3, BUCKET_NAME, data, originPath,"image/jpeg")
                ret1 =  s3_put_object(s3, BUCKET_NAME, data1, zoomPath,"image/jpeg")
                if ret and ret1:
                    print("파일 저장 성공")
                    image_url = f'https://{BUCKET_NAME}.s3.{AWS_S3_BUCKET_REGION}.amazonaws.com/{originPath}'
                    image_url1 = f'https://{BUCKET_NAME}.s3.{AWS_S3_BUCKET_REGION}.amazonaws.com/{zoomPath}'

                    sql="INSERT INTO record (`car_image_url`, `cnt`, `date`, `location`, `pay`, `plate_image_url`, `video_url`, `car_id`,`fine`)\
              VALUES ('"+image_url+"', '"+"0"+"', '"+str(now)+"', '"+location+"', '"+"0"+"', '"+image_url1+"', '"+"no"+"', '"+carId+"','40000');"
                    db_class.executeAll(sql);

                    api_key = "NCSCOGUYJX1YCUB9"
                    api_secret = "FAAQGUZSFSYHSJXL5SUBEZWGVIJUBMJG"
                    params = dict()
                    params['type'] = 'sms' # Message type ( sms, lms, mms, ata )
                    params['to'] =  carInfo[0]['phone_num']# Recipients Number '01000000000,01000000001'
                    params['from'] = '01041193220' # Sender number
                    params['text'] = 'test' # Message
                    cool = Message(api_key, api_secret)

                    try:
                        response = cool.send(params)
                        print("Success Count : %s" % response['success_count'])
                        print("Error Count : %s" % response['error_count'])
                        print("Group ID : %s" % response['group_id'])

                        if "error_list" in response:
                            print("Error List : %s" % response['error_list'])

                    except CoolsmsException as e:
                        print("Error Code : %s" % e.code)
                        print("Error Message : %s" % e.msg)
                    # spring에 데이터 보내기
                    # headers = {'Content-Type': 'application/json; chearset=utf-8'}
                    # data = {'title': 'dummy title', 'id': 1, 'message': 'hello world!'}
                    # request.Request('http://127.0.0.1:5000', headers=headers, data=json.dumps(data).encode('utf-8'))

                else:
                    print("파일 저장 실패")

            elif result[0]['cnt']==0 and result[0]['date'] < now + datetime.timedelta(minutes=-5):
            # 이미지 저장
            # s3에 업로드
            # cnt++
            # update cnt
                detectId = str(result[0]['id'])
                #if result[0]['cnt'] == 0:
                img_pil = Image.fromarray(im)
                # draw = ImageDraw.Draw(img_pil)
                # draw.text((100, 100), text[0][0], font=font, fill=(255, 0, 255))
                
                # 파일명 생성
                common = f"{now.strftime('%Y%m%d%H%M%S')}_{text[0][0][-4:]}"
                origin = common + "_1.jpg"
                zoom = common + "_2.jpg"
                
                # 파일 저장
                cv2.imwrite(origin, im)
                cv2.imwrite(zoom, im[lp_y:lp_y1, lp_x:lp_x1])
                im = np.array(img_pil)

                data = open(origin, 'rb') 
                data1 = open(zoom,'rb')

                originPath =nowDate+"/"+carNum+"_1.jpg"
                zoomPath=nowDate+"/"+carNum+"_2.jpg"

                ret = s3_put_object(s3, BUCKET_NAME, data, originPath,"image/jpeg")
                ret1 =  s3_put_object(s3, BUCKET_NAME, data1, zoomPath,"image/jpeg")
                
                if ret and ret1:
                    print("파일 저장 성공")
                    image_url = f'https://{BUCKET_NAME}.s3.{AWS_S3_BUCKET_REGION}.amazonaws.com/{originPath}'
                    image_url1 = f'https://{BUCKET_NAME}.s3.{AWS_S3_BUCKET_REGION}.amazonaws.com/{zoomPath}'
                    sql=f"update record set cnt=1,`car_image_url`='{image_url}',`plate_image_url`='{image_url1}' where id = '{detectId}';"
                    db_class.executeAll(sql);
                else :
                    print('실패')
        # 이미지 출력
    return 'detect'
    #     cv2.imshow('frame', cv2.resize(im, (1024, 768)))

    #     if cv2.waitKey(1) & 0xFF == ord('q'):
    #         break

    # cv2.destroyAllWindows()
@app.route('/')
def extra():
    return 'running'
# @app.route('/')
# def extra():
#     db_class = dbModule.Database()
#     sql="select date from record where id='9'";
#     info=db_class.executeAll(sql)
#     date = info[0]['date']
#     print(date)
#     now = datetime.datetime.now()
#     print(now)
#     print(now + datetime.timedelta(minutes=-5))
#     if(date < now + datetime.timedelta(minutes=-5)):
#         print('aa')
#     api_key = "NCSCOGUYJX1YCUB9"
#     api_secret = "FAAQGUZSFSYHSJXL5SUBEZWGVIJUBMJG"
#     params = dict()
#     params['type'] = 'sms' # Message type ( sms, lms, mms, ata )
#     params['to'] = '01042229234' # Recipients Number '01000000000,01000000001'
#     params['from'] = '01041193220' # Sender number
#     params['text'] = 'test' # Message
#     cool = Message(api_key, api_secret)

#     try:
#         response = cool.send(params)
#         print("Success Count : %s" % response['success_count'])
#         print("Error Count : %s" % response['error_count'])
#         print("Group ID : %s" % response['group_id'])

#         if "error_list" in response:
#             print("Error List : %s" % response['error_list'])

#     except CoolsmsException as e:
#         print("Error Code : %s" % e.code)
#         print("Error Message : %s" % e.msg)

#     return 'a'



if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)


