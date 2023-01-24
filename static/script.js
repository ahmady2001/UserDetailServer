var submit = document.getElementById("submit")
submit.addEventListener("click", mainFunc)

function mainFunc() {
    var user = document.getElementById("user").value
    fetch(user, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(response => response.text())
    .then(text => {
        try {
            document.getElementById("error_show").style.display = "none"
            document.getElementById("ErrorStatus_show").innerHTML = "No Error reported."
            var data = JSON.parse(text)
            document.getElementById("Username_show").innerHTML = "Username: " + data.remark
            document.getElementById("Status_show").innerHTML = "Status: " + data.enable
            document.getElementById("Download_show").innerHTML = "Download: " + data.down
            document.getElementById("Upload_show").innerHTML = "Upload: " + data.up
            document.getElementById("ServiceTraffic_show").innerHTML = "ServiceTraffic: " + data.total
            document.getElementById("ExpireDate_show").innerHTML = "ExpireDate: " + data.expiry_time
            document.getElementById("UsedTraffic_show").innerHTML = "UsedTraffic: " + data.used
            document.getElementById("RemainingTraffic_show").innerHTML = "RemainingTraffic: " + data.remain
    
            document.getElementById("detailShow").style.display = "block"
          }
          catch(err) {
            document.getElementById("detailShow").style.display = "none"

            document.getElementById("ErrorStatus_show").innerHTML = "Username is incorrect or Server not responding properly."
            document.getElementById("error_show").style.display = "block"

            document.getElementById("Username_show").innerHTML = "N/A"
            document.getElementById("Status_show").innerHTML = "N/A"
            document.getElementById("Download_show").innerHTML = "N/A"
            document.getElementById("Upload_show").innerHTML = "N/A"
            document.getElementById("ServiceTraffic_show").innerHTML = "N/A"
            document.getElementById("ExpireDate_show").innerHTML = "N/A"
            document.getElementById("UsedTraffic_show").innerHTML = "N/A"
            document.getElementById("RemainingTraffic_show").innerHTML = "N/A"
          }

    })
}
