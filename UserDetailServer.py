import sqlite3
from datetime import datetime
import math
from flask import Flask, render_template
from waitress import serve

dbLoc = '/etc/x-ui/x-ui.db'

app = Flask(__name__)

def convert_size(size_bytes):
   if size_bytes == 0:
       return "0B"
   size_name = ("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB")
   i = int(math.floor(math.log(size_bytes, 1024)))
   p = math.pow(1024, i)
   s = round(size_bytes / p, 2)
   return "%s %s" % (s, size_name[i])

@app.route('/')
def main():
    return render_template('index.html')

@app.route('/<string:user>')
def checker(user):
    query = f"SELECT remark,down,up,total,expiry_time,enable FROM inbounds WHERE remark='{user}';"
    con = sqlite3.connect(dbLoc)
    cur = con.cursor()
    res = cur.execute(query)
    result = res.fetchone()
    res.close()
    cur.close()
    con.close()
    userName = result[0]
    downloaded = convert_size(result[1])
    uploaded = convert_size(result[2])
    usedTraffic = convert_size(result[1] + result[2])
    if (result[3] == 0):
        totalBandwith = "Unlimited"
        remainTraffic = "Unlimited"
    else:
        totalBandwith = convert_size(result[3])
        if ((result[3] - (result[1] + result[2])) >= 0):
            remainTraffic = convert_size(result[3] - (result[1] + result[2]))
        else:
            remainTraffic = convert_size(0)
    if (result[4] == 0):
        expireDate = "Unlimited"
    else:
        expireDate = datetime.fromtimestamp(int((result[4] / 1000)))
    if (result[5] == 1):
        enable = "On"
    else:
        enable = "Off"

    dicResult = {
    "remark": userName,
    "down": downloaded,
    "up": uploaded,
    "total": totalBandwith,
    "expiry_time": expireDate,
    "enable": enable,
    "used": usedTraffic,
    "remain": remainTraffic
    }
    return dicResult

if __name__ == "__main__":
    serve(app, host='0.0.0.0', port=80)
