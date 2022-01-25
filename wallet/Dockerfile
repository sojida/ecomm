FROM python:3.9


WORKDIR /code


COPY ./requirements.txt /code/requirements.txt


RUN pip install -r /code/requirements.txt


COPY ./ /code/app

ENV PYTHONPATH "${PYTHONPATH}:/code/app"


CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0"]
