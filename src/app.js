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
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`
}
function displayForecast(){
    forecast = document.querySelector("#forecast");
    
    let forecastHTML =`<div class="row">`;
    let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    days.forEach(function(day){
        forecastHTML = 
         forecastHTML + `
        <div class="col-2">
            <span id="forecast-day">${day}</span>
            <div><img src="http://openweathermap.org/img/wn/01d@2x.png" alt="forecast-icon" width="30px"></div>
            <span id="temp-max">28°</span>
            <span id="temp-min"> 16°</span>
        </div>`;
    })
    forecastHTML = forecastHTML + `</div>`;
    forecast.innerHTML = forecastHTML;
}

function displayTemperature(response){
let city = document.querySelector("#city");
let descripton = document.querySelector("#weather-condition");
let temperature = document.querySelector("#temp")
let humidity = document.querySelector("#humidity")
let wind = document.querySelector("#wind");
let date = document.querySelector("#date-current")
let icon = document.querySelector("#icon");

celsiusTemperature = response.data.main.temp;

city.innerHTML = response.data.name;
descripton.innerHTML = response.data.weather[0].description;
temperature.innerHTML = Math.round(response.data.main.temp);
humidity.innerHTML = Math.round(response.data.main.humidity);
wind.innerHTML = Math.round(response.data.wind.speed);
date.innerHTML = formatDate(response.data.dt*1000);
icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
icon.setAttribute("alt", response.data.weather[0].description);
}

function search (city){
let apiKey = "8193ca299e026ed6459f4b81cdd9bf21"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
   
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit (event){
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    search(cityInput.value);
}
 function displayFahrenheitTemperature(event){
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9/5) + 32
    let temperature = document.querySelector("#temp")
    temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperature = document.querySelector("#temp");
    temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let seachForm = document.querySelector("#search-form");
seachForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Berlin");
displayForecast();