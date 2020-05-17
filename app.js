const iconEle = document.querySelector(".weather-icon")
const notificationEle  = document.querySelector(".notification")
const temperatureEle = document.querySelector(".temperature-value p")
const locationEle = document.querySelector(".location p")
const terperatureDescription = document.querySelector(".temperature-description p")

const weather ={};
weather.temperature = {
    unit:"celsius",
}
if(navigator.geolocation)
{
    navigator.geolocation.getCurrentPosition(setPosition,showError);
}
else
{
    notificationEle.style.display="block";
    notificationEle.innerHTML ="<p>Your browser doesn't suppoer geplocation</p>";
} 
function setPosition(position)
{
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getWeather(latitude,longitude);
}
function showError(error)
{
  //  console.log(notificationEle);
    notificationEle.style.display ="block";
    notificationEle.innerHTML = `<p>${error.message}<p>`;
}

function getWeather(latitude,longitude)
{
    const kelvin = 273;
    const apiKey = "82005d27a116c2880c8f0fcb866998a0";
    const url = `//api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
   // console.log(url);
    fetch(url).then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data)
    {
        weather.temperature.value = Math.floor(data.main.temp - kelvin);
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
        weather.description = data.weather[0].description;
    })
    .then(function()
    {
        display_weather()
    })
}
function display_weather()
{
    iconEle.innerHTML = `<img src="icons/${weather.iconId}.png" />`;
    temperatureEle.innerHTML = `${weather.temperature.value} ° <span>C</span> `;
    terperatureDescription.innerHTML = weather.description;
    locationEle.innerHTML = `${weather.city} , ${weather.country}`;
}
temperatureEle.addEventListener("click",function()
{
    if(weather.temperature.value === undefined ) return;
    if(weather.temperature.unit === "celsius")
    {
       const fahrenheit = Math.floor(temperatureToFahrenheit(weather.temperature.value));
       temperatureEle.innerHTML = `${fahrenheit} ° <span>F</span>`;
       weather.temperature.unit = "fahrenheit";
    }
    else
    {
        temperatureEle.innerHTML = `${weather.temperature.value} ° <span>C</span>`;
        weather.temperature.unit = "celsius";
    }
} );
function temperatureToFahrenheit(temperature)
{
    return (temperature * (9/5)) + 32;
}