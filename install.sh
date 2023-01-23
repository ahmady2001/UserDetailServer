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

wget https://raw.githubusercontent.com/ahmady2001/UserDetailServer/master/UserDetailServer.py -o UserDetailServer.py

cd /usr/local/user-detail-server/ui

wget https://raw.githubusercontent.com/ahmady2001/UserDetailServer/master/ui/index.html -o index.html
wget https://raw.githubusercontent.com/ahmady2001/UserDetailServer/master/ui/style.css -o style.css
wget https://raw.githubusercontent.com/ahmady2001/UserDetailServer/master/ui/main.js -o main.js

cd /etc/systemd/system

wget https://raw.githubusercontent.com/ahmady2001/UserDetailServer/master/user-detail-server.service -o user-detail-server.service

systemctl enable user-detail-server
systemctl start user-detail-server

cd $cwd
rm install.sh