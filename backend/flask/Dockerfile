FROM python:3.8.5

WORKDIR /app
COPY . .
RUN pip install -r requirement.txt
RUN apt-get update && apt-get install -y libgl1-mesa-glx && apt-get install -y awscli
COPY aws_config ~/.aws/config
COPY aws_credentials ~/.aws/credentials

ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_REGION
ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} \
    AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} \
    AWS_REGION=${AWS_REGION}

EXPOSE 5000

CMD python ./app.py
