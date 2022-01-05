const { Store } = require('./store');
const { Weather } = require('./weather');
const { UI } = require('./ui');



const storage = new Store ();
const {city, countryCode} = storage.getLocationData();
const weather = new Weather(city, countryCode);

const ui = new UI();

require('./index.css');

async function fetchWeather() {
    const data = await weather.getWeather();
    console.log(data);
    ui.render(data);

}

document.getElementById('w-change-btn').addEventListener('click', (e) => {
    const city = document.getElementById('city').value;
    const countryCode = document.getElementById('countryCode').value;
    weather.changeLocation(city, countryCode);
    storage.setLocationData(city, countryCode);
    fetchWeather();
    e.preventDefault();

});

document.addEventListener('DOMContentLoaded', fetchWeather);