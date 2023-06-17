FROM python:3.11-alpine

# Set lang
ENV LANG C.UTF-8
# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
WORKDIR /code

COPY requirements.txt .
RUN pip3 install --upgrade pip
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000

CMD ["sh", "-c", " python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
