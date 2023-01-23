#!/bin/bash

# just for debian base distributions

cwd=$(pwd)

apt install python3 -y
apt install pip -y
pip install datetime
pip install flask
pip install waitress

# remove oldFiles

systemctl disable user-detail-server
systemctl stop user-detail-server
rm -rfv /usr/local/user-detail-server
rm -fv /etc/systemd/system/user-detail-server.service

mkdir /usr/local/user-detail-server -v
mkdir /usr/local/user-detail-server/templates -v
cd /usr/local/user-detail-server

wget https://raw.githubusercontent.com/ahmady2001/UserDetailServer/master/UserDetailServer.py -O UserDetailServer.py

cd /usr/local/user-detail-server/templates

wget https://raw.githubusercontent.com/ahmady2001/UserDetailServer/master/templates/index.html -O index.html
wget https://raw.githubusercontent.com/ahmady2001/UserDetailServer/master/static/style.css -O style.css
wget https://raw.githubusercontent.com/ahmady2001/UserDetailServer/master/static/script.js -O script.js

cd /etc/systemd/system

wget https://raw.githubusercontent.com/ahmady2001/UserDetailServer/master/user-detail-server.service -O user-detail-server.service

systemctl enable user-detail-server
systemctl start user-detail-server

cd $cwd
rm install.sh -v