FROM python:3.11-slim

# Set the working directory
RUN apt-get update && \
    apt-get install -y \
    # libgobject-2.0-0 \
    libcairo2 \
    libpango1.0-0 \
    libgdk-pixbuf2.0-0

WORKDIR /usr/src/app

# Install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]