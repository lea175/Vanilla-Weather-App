function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours<10){
        hours = `0${hours}`
    }
    let minutes = date.getMinutes();
    if (minutes < 10){
       minutes =  `0${minutes}`
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`
}

function displayTemperature(response){
let city = document.querySelector("#city");
let descripton = document.querySelector("#weather-condition");
let temperature = document.querySelector("#temp")
let humidity = document.querySelector("#humidity")
let wind = document.querySelector("#wind");
let date = document.querySelector("#date-current")
let icon = document.querySelector("#icon");
city.innerHTML = response.data.name;
descripton.innerHTML = response.data.weather[0].description;
temperature.innerHTML = Math.round(response.data.main.temp);
humidity.innerHTML = Math.round(response.data.main.humidity);
wind.innerHTML = Math.round(response.data.wind.speed);
date.innerHTML = formatDate(response.data.dt*1000);
icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
icon.setAttribute("alt", response.data.weather[0].description);
}





city = "Berlin"
let apiKey = "8193ca299e026ed6459f4b81cdd9bf21"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

axios.get(apiUrl).then(displayTemperature);