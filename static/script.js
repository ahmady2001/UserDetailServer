const loginContainer = document.getElementById('loginContainer');
const resultContainer = document.getElementById('resultContainer');
const username = document.getElementById('user');
const submit = document.getElementById('submit');
const Rchart = document.getElementById('chart');
const Ruser = document.getElementById('Ruser');
const Rtraffic = document.getElementById('Rtraffic');
const Rexp = document.getElementById('Rexp');
const Rup = document.getElementById('Rup');
const Rdown = document.getElementById('Rdown');

const $chartC1 = "#FF9393";
const $chartC2 = "transparent";
const $textLightC = "rgb(243, 243, 243)";

function traffic_parse(t){
    if (t == "0B")
        return 0;
    if (t[t.length - 2] == " ")
        return parseFloat(t);
    if (t[t.length - 2] == "K")
        return parseFloat(t) * 10**3;
    if (t[t.length - 2] == "M")
        return parseFloat(t) * 10**6;
    if (t[t.length - 2] == "G")
        return parseFloat(t) * 10**9;
    if (t[t.length - 2] == "T")
        return parseFloat(t) * 10**12;
    if (t[t.length - 2] == "P")
        return parseFloat(t) * 10**15;
    if (t[t.length - 2] == "E")
        return parseFloat(t) * 10**18;
    if (t[t.length - 2] == "Z")
        return parseFloat(t) * 10**21;
    if (t[t.length - 2] == "Y")
        return parseFloat(t) * 10**24;
}
submit.onclick = e => {
    let user = username.value;
    submit.innerHTML = "Processing";
    if (submit.id == "processing")
        return;
    submit.id = "processing";

    // fetch(`/${user}`, {
    fetch(user, {
        method: "GET",
    })
    .then(response => {
        if (!response.ok){
            loginContainer.style.display = 'none';
            resultContainer.style.display = 'flex';
            submit.innerHTML = "Submit";
            submit.id = "submit";
        }
        return response.json();
    })
    .then(res => {
        // show data
        Ruser.innerHTML = res['remark'];
        Rtraffic.innerHTML = res['total'];
        let date = new Date(res['expiry_time']);
        Rexp.innerHTML = date.toLocaleDateString("en", {month: '2-digit', day: '2-digit'});
        Rup.innerHTML = res['up'];
        Rdown.innerHTML = res['down'];
        new Chart(
            Rchart,
            {
                type: 'doughnut',
                data: {
                    labels: ["remained", "used"],
                    datasets: [{
                        label: "Traffic Details",
                        data: [traffic_parse(res['remain']), traffic_parse(res['used'])],
                        // data: [2, 3],
                        backgroundColor: [$chartC2, $chartC1],
                        borderColor: [$chartC1, "transparent"],
                        // borderRadius: 5,
                        // borderJoinStyle: 'miter',
                        clip: 50,
                        hoverOffset: 5,
                        offset: 1,
                        weight: 100,
                        color: $textLightC,
                    }]
                },
                options: {
                    responsive: true,
                    radius: "90%",
                    cutout: "50%",
                    plugins: {
                        colors: $textLightC,
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: "#ffffff88",
                                boxWidth: 20,
                            },
                            reverse: true
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    console.log(context);
                                    if (context.label == "used")
                                        return `${context.label}: ${res['used']}`;
                                    else if (context.label == "remained")
                                        return `${context.label}: ${res['remain']}`;
                                }
                            }
                        }
                    }
                }
            }
        );
    });
};