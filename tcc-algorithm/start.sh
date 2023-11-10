gunicorn -e CONFIG_MODE='development' -e DEVELOPMENT_DATABASE_URL='postgresql+psycopg2://postgres:123@localhost:5432/tcc' app:app
