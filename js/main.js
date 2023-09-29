const api_key = "63e142d5a9384ca298c195453232209";
const citySearch = document.querySelector(".city-search");
const searchBtn = document.querySelector(".search-button");
const currentDateData = document.querySelector(".current-date-data");
const locationContainer = document.querySelector(".location-container");

//todo add api to grab date and time based on location
const hourlyForecastData = document.querySelector(
  ".hourly-forecast-div",
).childNodes;

const weatherContentContainers = document.querySelector(
  ".weather-content-container",
).childNodes;

// const forecastContainers = [
//   (weatherForecastContainer = document.querySelector(
//     "#weather-container-forecast-1",
//   ).childNodes),
//   (weatherForecastContainer2 = document.querySelector(
//     "#weather-container-forecast-2",
//   ).childNodes),
//   (weatherForecastContainer3 = document.querySelector(
//     "#weather-container-forecast-3",
//   ).childNodes),
// ];

function populate24HourForecastData(containerArray, data) {
  let divIndex = 1;

  for (let i = 0; i < 24; i++) {
    containerArray[divIndex].children[0].src =
      data["weatherDataDayOne"].hourly[i].condition.icon;

    containerArray[divIndex].children[1].innerHTML =
      data["weatherDataDayOne"].hourly[i].temp_f;

    containerArray[divIndex].children[2].innerHTML = data[
      "weatherDataDayOne"
    ].hourly[i].time.slice(11, 16);
    divIndex += 2;
  }
}

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
  console.log("data", data);
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
    feelsLike: data.current.feelslike_f,
    windSpeed: data.current.wind_mph,
    pressure: data.current.pressure_in,
    precipitationProbability: data.current.precip_in,
  };

  let weatherDataDayOne = {
    date: data.forecast.forecastday[0].date,
    tempHigh: data.forecast.forecastday[0].day.maxtemp_f,
    tempLow: data.forecast.forecastday[0].day.mintemp_f,
    condition: data.forecast.forecastday[0].day.condition.text,
    icon: data.forecast.forecastday[0].day.condition.icon,
    avgHumidity: data.forecast.forecastday[0].day.avghumidity,
    hourly: data.forecast.forecastday[0].hour,
    astro: data.forecast.forecastday[0].astro,
  };
  let weatherDataSecondDay = {
    date: data.forecast.forecastday[1].date,
    tempHigh: data.forecast.forecastday[1].day.maxtemp_f,
    tempLow: data.forecast.forecastday[1].day.mintemp_f,
    condition: data.forecast.forecastday[1].day.condition.text,
    icon: data.forecast.forecastday[1].day.condition.icon,
    avgHumidity: data.forecast.forecastday[1].day.avghumidity,
    hourly: data.forecast.forecastday[1].hour,
    astro: data.forecast.forecastday[1].astro,
  };
  let weatherDataThirdDay = {
    date: data.forecast.forecastday[2].date,
    tempHigh: data.forecast.forecastday[2].day.maxtemp_f,
    tempLow: data.forecast.forecastday[2].day.mintemp_f,
    condition: data.forecast.forecastday[2].day.condition.text,
    icon: data.forecast.forecastday[2].day.condition.icon,
    avgHumidity: data.forecast.forecastday[2].day.avghumidity,
    hourly: data.forecast.forecastday[2].hour,
    astro: data.forecast.forecastday[2].astro,
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
function displayWeatherDataToDom(location) {
  const date = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    time: "numeric",
  };

  storeWeatherData(location).then((data) => {
    //todo replace with different api for time
    currentDateData.innerHTML =
      date.toLocaleDateString("en-US", options) +
      "\n" +
      date.toLocaleTimeString("en-US").toString().slice(0, 4) +
      date.toLocaleTimeString("en-US").toString().slice(7, 10);

    // currentConditionData.innerHTML = data["weatherDataCurrent"].condition;
    // currentTempData.innerHTML = data["weatherDataCurrent"].temp;
    // currentHumidityData.innerHTML = data["weatherDataCurrent"].humidity;
    // currentIcon.src = data["weatherDataCurrent"].icon;
    //current icon div
    weatherContentContainers[1].children[0].src =
      data["weatherDataCurrent"].icon;
    //sunrise time div
    weatherContentContainers[1].children[1].children[1].innerHTML =
      data["weatherDataDayOne"].astro.sunrise;
    //sunset time div
    weatherContentContainers[1].children[2].children[1].innerHTML =
      data["weatherDataDayOne"].astro.sunset;
    //temp div
    weatherContentContainers[3].children[1].children[1].innerHTML =
      data["weatherDataCurrent"].temp;
    //feels like div
    weatherContentContainers[3].children[2].children[1].innerHTML =
      data["weatherDataCurrent"].feelsLike;
    //condition div
    weatherContentContainers[3].children[3].children[1].innerHTML =
      data["weatherDataCurrent"].condition;

    //more details stuff
    //wind speed div
    weatherContentContainers[5].children[1].children[1].innerHTML =
      data["weatherDataCurrent"].windSpeed;

    //air humidity div
    weatherContentContainers[5].children[2].children[1].innerHTML =
      data["weatherDataCurrent"].humidity;

    //pressure div
    weatherContentContainers[5].children[3].children[1].innerHTML =
      data["weatherDataCurrent"].pressure;

    //precip probability div
    weatherContentContainers[5].children[4].children[1].innerHTML =
      data["weatherDataCurrent"].precipitationProbability;
    //console.log(data["locationData"].country);
    console.log("data2", data);
    let weatherForecastDayArray = [
      "weatherDataDayOne",
      "weatherDataSecondDay",
      "weatherDataThirdDay",
    ];
    populate24HourForecastData(hourlyForecastData, data);

    for (let i = 0; i < weatherForecastDayArray.length; i++) {
      populateWeatherForecastData(
        forecastContainers,
        data,
        i,
        weatherForecastDayArray[i],
      );
    }

    locationContainer.children[1].innerHTML =
      data["locationData"].name +
      " ," +
      data["locationData"].region +
      " ," +
      data["locationData"].country;

    // console.log(data);
  });

  citySearch.value = "";
}

function populateWeatherForecastData(containerArray, data, index, forecastDay) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  console.log(data[forecastDay].date);
  //new date is 1 day behind
  let dateDay = new Date(data[forecastDay].date);
  //offset date by 1 day
  let day = weekday[dateDay.getDay() + 1];
  console.log(dateDay);
  //forecast date data
  containerArray[index][1].children[1].innerHTML = day;
  //forcast condition data
  containerArray[index][3].children[1].innerHTML = data[forecastDay].condition;
  //forecast low temp data
  containerArray[index][5].children[1].innerHTML = data[forecastDay].tempLow;
  //forecast high temp data
  containerArray[index][7].children[1].innerHTML = data[forecastDay].tempHigh;
  //forecast humidity data
  containerArray[index][9].children[1].innerHTML =
    data[forecastDay].avgHumidity;
  containerArray[index][11].children[0].src = data[forecastDay].icon;
}
searchBtn.addEventListener("click", () => {
  let location = citySearch.value;
  displayWeatherDataToDom(location);
});

displayWeatherDataToDom("New York");
//currentIcon.src = "https://www.qries.com/images/banner_logo.png";
console.log(weatherContentContainers);
console.log(hourlyForecastData[1].children[0]);
