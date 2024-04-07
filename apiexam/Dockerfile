FROM python:3.10

WORKDIR /code

COPY ./app /code/app

COPY ./requirements.txt /code/requirements.txt

RUN pip install --upgrade pip && \
    pip install -r requirements.txt

EXPOSE 8003

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8003", "--reload"]

