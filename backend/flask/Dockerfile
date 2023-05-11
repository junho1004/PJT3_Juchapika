FROM python:3.8.5

WORKDIR /app
COPY . .
RUN pip install -r requirement.txt
<<<<<<< HEAD
RUN apt-get update && apt-get install -y libgl1-mesa-glx && apt-get install -y awscli
=======
>>>>>>> 461439df328fced9509afb561ba84eebfa857cbd

EXPOSE 5000

CMD python ./app.py
