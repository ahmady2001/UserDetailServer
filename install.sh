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
rm -rf /usr/local/user-detail-server
rm -f /etc/systemd/system/user-detail-server.service

mkdir /usr/local/user-detail-server
mkdir /usr/local/user-detail-server/templates
cd /usr/local/user-detail-server

wget https://raw.githubusercontent.com/ahmady2001/UserDetailServer/master/UserDetailServer.py -O UserDetailServer.py

cd /usr/local/user-detail-server/templates

wget https://raw.githubusercontent.com/ahmady2001/UserDetailServer/master/templates/index.html -O index.html
wget https://raw.githubusercontent.com/ahmady2001/UserDetailServer/master/templates/style.css -O style.css
wget https://raw.githubusercontent.com/ahmady2001/UserDetailServer/master/templates/main.js -O main.js

cd /etc/systemd/system

wget https://raw.githubusercontent.com/ahmady2001/UserDetailServer/master/user-detail-server.service -O user-detail-server.service

systemctl enable user-detail-server
systemctl start user-detail-server

cd $cwd
rm install.sh