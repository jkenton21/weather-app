//Weather Application JS Index File (import modules)

const cityInput = document.querySelector('#cityName');
const submit = document.querySelector('#submitButton');
const unitF = document.querySelector('#units');

//function for the weather of the city
function cityWeather (place, cntry, temp, feels_like, desc, humid, max) {
  this.place = place;
  this.cntry = cntry;
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
  const country = weatherData.sys.country;
  const temperature = weatherData.main.temp;
  const feelsLike = weatherData.main.feels_like;
  const description = weatherData.weather[0].description;
  const humidity = weatherData.main.humidity;
  const maxTemp = weatherData.main.temp_max;

  //Map Temperature data to cityWeather Object
  const currentCity = new cityWeather(city, country, temperature, feelsLike, description, humidity, maxTemp);
  console.log(currentCity);

  //jump to display function with currentCity Data
  display(currentCity);
}

//Searching for the desired city data when the search button is clicked
submit.addEventListener('click', () => {
    getWeather(cityInput.value)
});

//function to display currentCity Data on the webpage
function display(currentLocation) {
  const nameDiv = document.querySelector('#cityNameDisplay');
  const tempDiv = document.querySelector('#cityTemp');
  const feelsDiv = document.querySelector('#cityFeelsLike');
  const humidDiv = document.querySelector('#cityHumidity');
  const descDiv = document.querySelector('#description');

  nameDiv.textContent = currentLocation.place + ', ' + currentLocation.cntry;
  if (!unitF.checked) {
    tempDiv.textContent = 'CURRENT TEMP: ' + Math.round(currentLocation.temp - 273) + 'C';
    feelsDiv.textContent = 'FEELS LIKE: ' + Math.round(currentLocation.feels_like - 273) + 'C';
    humidDiv.textContent = 'HUMIDITY: ' + currentLocation.humid + '%';
    descDiv.textContent = 'Current Weather: ' + currentLocation.desc + '.' + ' Max temperature today: ' + Math.round(currentLocation.max - 273) + ' C';
  } else {
    tempDiv.textContent = 'CURRENT TEMP: ' + Math.round((currentLocation.temp - 273) * (9/5) + 32) + 'F';
    feelsDiv.textContent = 'FEELS LIKE: ' + Math.round((currentLocation.feels_like - 273) * (9/5) + 32) + 'F';
    humidDiv.textContent = 'HUMIDITY: ' + currentLocation.humid + '%';
    descDiv.textContent = 'Current Weather: ' + currentLocation.desc + '.' + ' Max temperature today: ' + Math.round((currentLocation.max - 273) * (9/5) + 32) + ' F';
  }
}
