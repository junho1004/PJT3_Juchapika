FROM python:3.6.4

COPY . /app

WORKDIR /app

RUN pip install -r requirement.txt

CMD ["uwsgi, "uwsgi.ini]

