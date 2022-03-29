//Weather Application JS Index File (import modules)

const cityInput = document.querySelector('#cityName');
const submit = document.querySelector('#submitButton');

//function for the weather of the city
function cityWeather (place, temp, feels_like, desc, humid, max) {
  this.place = place;
  this.temp = temp;
  this.feels_like = feels_like;
  this.desc = desc;
  this.humid = humid;
  this.max = max;
};

//function to get weather from openweathermap API
async function getWeather(location) {
  const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + location + '&APPID=907b2eb9ee227c9d429014c360e20b7d', {mode: 'cors'});
  const weatherData = await response.json();

  const city = weatherData.name;
  const temperature = weatherData.main.temp;
  const feelsLike = weatherData.main.feels_like;
  const description = weatherData.weather[0].description;
  const humidity = weatherData.main.humidity;
  const maxTemp = weatherData.main.temp_max;

  //Map Temperature data to cityWeather Object
  const currentCity = new cityWeather(city, temperature, feelsLike, description, humidity, maxTemp);
  console.log(currentCity);
}

//Searching for the desired city data when the search button is clicked
submit.addEventListener('click', () => {
    getWeather(cityInput.value)
});

