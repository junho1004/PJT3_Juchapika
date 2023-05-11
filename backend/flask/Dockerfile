FROM python:3.8.5

WORKDIR /app
COPY . .
RUN pip install -r requirement.txt
RUN apt-get update && apt-get install -y libgl1-mesa-glx && apt-get install -y awscli
RUN export AWS_DEFAULT_REGION=ap-northeast-2
EXPOSE 5000

CMD python ./app.py
