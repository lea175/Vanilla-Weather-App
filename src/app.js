function displayTemperature(response){
console.log(response);
let city = document.querySelector("#city");
let descripton = document.querySelector("#weather-condition");
let temperature = document.querySelector("#temp")
let humidity = document.querySelector("#humidity")
let wind = document.querySelector("#wind");
city.innerHTML = response.data.name;
descripton.innerHTML = response.data.weather[0].description;
temperature.innerHTML = Math.round(response.data.main.temp);
humidity.innerHTML = Math.round(response.data.main.humidity);
wind.innerHTML = Math.round(response.data.wind.speed);
}

function currentDate (date){
    let now = new Date();
    let hour = now.getHours();
    console.log(hour);

}

currentDate();


city = "Berlin"
let apiKey = "8193ca299e026ed6459f4b81cdd9bf21"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

axios.get(apiUrl).then(displayTemperature);

