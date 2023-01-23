#!/bin/bash

# just for debian base distributions

cwd=$(pwd)

apt install python3 -y
apt install pip -y
pip install datetime
pip install flask
pip install waitress

mkdir /usr/local/user-detail-server
mkdir /usr/local/user-detail-server/ui
cd /usr/local/user-detail-server

wget https://raw.githubusercontent.com/ahmady2001/UserDetailServer/master/UserDetailServer.py -O UserDetailServer.py

cd /usr/local/user-detail-server/ui

wget https://raw.githubusercontent.com/ahmady2001/UserDetailServer/master/ui/index.html -O index.html
wget https://raw.githubusercontent.com/ahmady2001/UserDetailServer/master/ui/style.css -O style.css
wget https://raw.githubusercontent.com/ahmady2001/UserDetailServer/master/ui/main.js -O main.js

cd /etc/systemd/system

systemctl disable user-detail-server
systemctl stop user-detail-server
wget https://raw.githubusercontent.com/ahmady2001/UserDetailServer/master/user-detail-server.service -O user-detail-server.service

systemctl enable user-detail-server
systemctl start user-detail-server
systemctl restart user-detail-server

cd $cwd
rm install.sh