FROM ubuntu:latest

RUN apt-get update -y && apt-get upgrade -y

# create directory to house the website
RUN mkdir /app
WORKDIR /app

RUN apt-get install -y openssh-server
RUN mkdir /var/run/sshd
RUN ssh-keygen -A

# install app related software
RUN apt-get install npm -y
RUN npm i typescript --save-dev

# install host related software
RUN apt-get install nginx -y

COPY ./files/nginx.conf /etc/nginx/nginx.conf
COPY ./script/script.sh /app/script.sh
COPY ./script/openssl.cnf /app/ssl/

ENTRYPOINT ["bash", "/app/script.sh"]

