FROM python:3.8-slim-buster

WORKDIR /python-docker
EXPOSE 8000

COPY . .

RUN ./scripts/install.sh
CMD ["flask", "run", "-h", "0.0.0.0", "-p", "8000"]
