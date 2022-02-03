FROM public.ecr.aws/lambda/python:3.8

COPY requirements.txt .
RUN  pip3 install -r requirements.txt --target .

# This file is modified most often, put at bottom to prevent lib reinstallation!
COPY index.py .

CMD ["index.handler"]
