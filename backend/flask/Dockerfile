FROM python:3.8.5

WORKDIR /app
COPY . .
RUN pip install -r requirement.txt
RUN apt-get install -y libgl1-mesa-glx

EXPOSE 5000

CMD python ./app.py
