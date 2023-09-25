const api_key = "63e142d5a9384ca298c195453232209";
const citySearch = document.querySelector(".city-search");
const searchBtn = document.querySelector(".search-button");
const weatherContainer = document.querySelector(".weather-container");
const currentDateData = document.querySelector(".current-date-data");
const currentConditionData = document.querySelector(".current-condition-data");
const currentHumidityData = document.querySelector(".current-humidity-data");
const currentTempData = document.querySelector(".current-temp-data");
const forecastContainers = [
  (weatherForecastContainer = document.querySelector(
    "#weather-container-forecast-1",
  ).childNodes),
  (weatherForecastContainer2 = document.querySelector(
    "#weather-container-forecast-2",
  ).childNodes),
  (weatherForecastContainer3 = document.querySelector(
    "#weather-container-forecast-3",
  ).childNodes),
];

async function getWeatherData(location) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${location}&days=3`,
    { mode: "cors" },
  ).catch((err) => {
    console.log("This is the error report!", err);
  });
  const data = await response.json();

  return data;
}

async function storeWeatherData(location) {
  const data = await getWeatherData(location).catch((err) => {
    console.log("This is the error report!", err);
  });
  let locationData = {
    name: data.location.name,
    region: data.location.region,
    country: data.location.country,
  };

  let weatherDataCurrent = {
    date: data.forecast.forecastday[0].date,
    temp: data.current.temp_f,
    condition: data.current.condition.text,
    icon: data.current.condition.icon,
    humidity: data.current.humidity,
  };

  let weatherDataDayOne = {
    date: data.forecast.forecastday[0].date,
    tempHigh: data.forecast.forecastday[0].day.maxtemp_f,
    tempLow: data.forecast.forecastday[0].day.mintemp_f,
    condition: data.forecast.forecastday[0].day.condition.text,
    icon: data.forecast.forecastday[0].day.condition.icon,
    avgHumidity: data.forecast.forecastday[0].day.avghumidity,
  };
  let weatherDataSecondDay = {
    date: data.forecast.forecastday[1].date,
    tempHigh: data.forecast.forecastday[1].day.maxtemp_f,
    tempLow: data.forecast.forecastday[1].day.mintemp_f,
    condition: data.forecast.forecastday[1].day.condition.text,
    icon: data.forecast.forecastday[1].day.condition.icon,
    avgHumidity: data.forecast.forecastday[1].day.avghumidity,
  };
  let weatherDataThirdDay = {
    date: data.forecast.forecastday[2].date,
    tempHigh: data.forecast.forecastday[2].day.maxtemp_f,
    tempLow: data.forecast.forecastday[2].day.mintemp_f,
    condition: data.forecast.forecastday[2].day.condition.text,
    icon: data.forecast.forecastday[2].day.condition.icon,
    avgHumidity: data.forecast.forecastday[2].day.avghumidity,
  };

  let weatherData = {
    locationData: locationData,
    weatherDataCurrent: weatherDataCurrent,
    weatherDataDayOne: weatherDataDayOne,
    weatherDataSecondDay: weatherDataSecondDay,
    weatherDataThirdDay: weatherDataThirdDay,
  };
  return weatherData;
}

function populateWeatherForecastData(containerArray, data) {
  //forecast date data
  containerArray[0][1].children[1].innerHTML = data["weatherDataDayOne"].date;
  //forcast condition data
  containerArray[0][3].children[1].innerHTML =
    data["weatherDataDayOne"].condition;
  containerArray[0][5].children[1].innerHTML =
    data["weatherDataDayOne"].tempLow;

  containerArray[0][7].children[1].innerHTML =
    data["weatherDataDayOne"].tempHigh;

  containerArray[0][9].children[1].innerHTML =
    data["weatherDataDayOne"].tempHigh;
}
searchBtn.addEventListener("click", () => {
  let location = citySearch.value;
  storeWeatherData(location).then((data) => {
    currentDateData.innerHTML = data["weatherDataCurrent"].date;
    currentConditionData.innerHTML = data["weatherDataCurrent"].condition;
    currentTempData.innerHTML = data["weatherDataCurrent"].temp;
    currentHumidityData.innerHTML = data["weatherDataCurrent"].humidity;

    //console.log(data["locationData"].country);
    //console.log(data);
    populateWeatherForecastData(forecastContainers, data);
  });
});

console.log(weatherForecastContainer[1].children[1]);
//console.log(weatherForecastContainer);
console.log(forecastContainers);
console.log(weatherForecastContainer[7].children[1]);
