const apiKey = "6a7736c646123059653699717b812146";

function getData(){
    let u_location = document.getElementById("userLocation").value;
    let base = `https://api.openweathermap.org/data/2.5/weather?q=${u_location}&appid=${apiKey}`;
    //console.log(u_location);
    //console.log(base);
    fetch(base).then((response) => {
        return response.json();
    }).then((data) =>{
        //console.log(data);
        const {temp} = data.main;
        const place = data.name;
        const country = data.sys.country;
        const {description} = data.weather[0];
        const {sunrise,sunset} = data.sys;
        const sunriseGMT = new Date(sunrise * 1000);
        const sunsetGMT = new Date(sunset * 1000);
        updateDOM(place,country,description,sunriseGMT,sunsetGMT,temp);
    });
}

function getDataAuto(){
    let long,lat;
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            let base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;
            fetch(base).then((response) => {
                return response.json();
            }).then((data) => {
                const {temp} = data.main;
                const place = data.name;
                const country = data.sys.country;
                const {description} = data.weather[0];
                const {sunrise,sunset} = data.sys;
                const sunriseGMT = new Date(sunrise * 1000);
                const sunsetGMT = new Date(sunset * 1000);
                updateDOM(place,country,description,sunriseGMT,sunsetGMT,temp);
            })
        })
    }
}

function updateDOM(place,country,description,sunriseGMT,sunsetGMT,temp){
    let code = `
    <div class="card border-dark mb-3" style="max-width: 80%;">
    <div class="card-header">${place}, ${country}</div>
    <div class="card-body">
        <h4 class="card-title">The Current Weather is: </h4>
        <p class="card-text">
        Description: ${description} <br />
        Temperature in Celsius: ${temp} Celcius <br />
        Sunrise: ${sunriseGMT.toLocaleDateString()} , ${sunriseGMT.toLocaleTimeString()} <br/>
        Sunset: ${sunsetGMT.toLocaleDateString()} ,${sunsetGMT.toLocaleTimeString()} <br />
        </p>
    </div>
    </div>
    `;
    document.getElementById("displayDOM").innerHTML = code;
}