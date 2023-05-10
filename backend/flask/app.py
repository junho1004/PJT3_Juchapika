from flask import Flask, jsonify, Response, render_template
from flask_cors import CORS
import dbModule
import boto3
import numpy as np
import av
import cv2

app = Flask(__name__)

@app.route('/aa')
def aa():
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
    container = av.open(kvs_stream["Payload"])
    def generate():
        for frame in container.decode(video=0):
            img = cv2.cvtColor(np.array(frame.to_image()), cv2.COLOR_RGB2BGR)
            (flag, encodedImage) = cv2.imencode(".jpg", img)
            if not flag:
                continue
            yield(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + bytearray(encodedImage) + b'\r\n')

    return Response(generate(), mimetype = 'multipart/x-mixed-replace; boundary=frame')

@app.route('/')
def hello_world():
    db_class = dbModule.Database()
    return jsonify(db_class.executeAll("select * from car"))

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)

application = app
