#!/bin/bash

# just for debian base distributions

apt install python3 -y
apt install pip -y
apt install wget
pip install datetime
pip install flask
pip install waitress

mkdir /usr/local/user-detail-server
mkdir /usr/local/user-detail-server/ui
cd /usr/local/user-detail-server

wget https://raw.githubusercontent.com/ahmady2001/UserDetailServer/master/UserDetailServer.py

cd /etc/systemd/system

wget https://raw.githubusercontent.com/ahmady2001/UserDetailServer/master/user-detail-server.sevice