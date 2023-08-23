FROM python:3.11

WORKDIR /app/script

COPY requirements.txt /app/script/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/script/

CMD [ "python", "main.py" ]