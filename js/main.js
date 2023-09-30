const api_key = "63e142d5a9384ca298c195453232209";
const citySearch = document.querySelector(".city-search");
const searchBtn = document.querySelector(".search-button");
const currentDateData = document.querySelector(".current-date-data");
const locationContainer = document.querySelector(".location-container");
const leftButton = document.querySelector(".left-button");
const rightButton = document.querySelector(".right-button");

//todo add api to grab date and time based on location
const hourlyForecastData = document.querySelector(
  ".hourly-forecast-div",
).childNodes;

const weatherContentContainers = document.querySelector(
  ".weather-content-container",
).childNodes;

const foreCastContainer = document.querySelector(
  ".weekly-forecast-container",
).childNodes;

function findStartingIndex() {
  let index = hourlyForecastData[17].children[2].innerHTML.slice(0, 2);
  if (index[0] === "0") {
    index = index[1];
  }

  return Number(index);
}
function populate24HourForecastData(containerArray, data, startingIndex) {
  let divIndex = 3;

  for (startingIndex; startingIndex <= startingIndex + 7; startingIndex++) {
    if (divIndex > 17) {
      break;
    }
    if (startingIndex > 23 || startingIndex < 0) {
      break;
    }
    containerArray[divIndex].children[0].src =
      data["weatherDataDayOne"].hourly[startingIndex].condition.icon;

    containerArray[divIndex].children[1].innerHTML =
      data["weatherDataDayOne"].hourly[startingIndex].temp_f;

    containerArray[divIndex].children[2].innerHTML = data[
      "weatherDataDayOne"
    ].hourly[startingIndex].time.slice(11, 16);
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
    localTime: data.location.localtime,
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
    let localDay = getWeekDayName2(data["locationData"].localTime);
    let localMonth = getMonthName(data["locationData"].localTime);
    let localTime = data["locationData"].localTime.slice(10, 16);

    console.log(localDay, "localDay");
    console.log(localMonth, "localMonth");
    console.log(localTime, "localTime");

    console.log(
      getWeekDayName2(data["locationData"].localTime),
      "getWeekDayName2",
    );
    currentDateData.innerHTML = data["locationData"].localTime.slice(10, 16);

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

    populate24HourForecastData(hourlyForecastData, data, 0);

    leftButton.addEventListener("click", () => {
      let index = findStartingIndex() - 15;

      populate24HourForecastData(hourlyForecastData, data, index);
    });

    rightButton.addEventListener("click", () => {
      let index = findStartingIndex() + 1;

      populate24HourForecastData(hourlyForecastData, data, index);
    });
    populateWeatherForecastData(foreCastContainer, data);

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
function getWeekDayName2(dateData) {
  dateData = new Date(dateData);
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = weekday[dateData.getDay()];
  if (dateData.getDay() + 1 > 6) {
    day = weekday[0];
  }
  return day;
}

function getMonthName(dateData) {
  dateData = new Date(dateData);
  const months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September ",
    "October",
    "November",
    "December",
  ];
  let month = months[dateData.getMonth()];
  if (dateData.getMonth() + 1 > 11) {
    month = months[0];
  }
  return month;
}
function getWeekDayName(data, weatherForecastDayArray) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let dayArray = [];
  for (let i = 0; i < 3; i++) {
    //new date is 1 day behind
    let dateDay = new Date(data[weatherForecastDayArray[i]].date);
    //offset date by 1 day
    let day = weekday[dateDay.getDay() + 1];
    if (dateDay.getDay() + 1 > 6) {
      day = weekday[0];
    }

    console.log(dateDay.getDay());
    console.log(day);
    dayArray.push(day);
  }
  return dayArray;
}
function populateWeatherForecastData(containerArray, data) {
  let weatherForecastDayArray = [
    "weatherDataDayOne",
    "weatherDataSecondDay",
    "weatherDataThirdDay",
  ];
  let divIndex = 1;
  let dayArray = getWeekDayName(data, weatherForecastDayArray);
  //console.log(data[forecastDay].date);

  for (let i = 0; i < 3; i++) {
    if (divIndex > 5) {
      break;
    }

    //minTemp
    containerArray[divIndex].children[1].innerHTML =
      data[weatherForecastDayArray[i]].tempLow;
    //forecast day
    containerArray[divIndex].children[0].innerHTML = dayArray[i];
    //maxtemp
    containerArray[divIndex].children[2].innerHTML =
      data[weatherForecastDayArray[i]].tempHigh;
    //condition
    containerArray[divIndex].children[3].innerHTML =
      data[weatherForecastDayArray[i]].condition;
    //icon
    containerArray[divIndex].children[4].src =
      data[weatherForecastDayArray[i]].icon;
    divIndex += 2;
  }
  // containerArray[index][1].children[1].innerHTML = day;
  // //forcast condition data
  // containerArray[index][3].children[1].innerHTML = data[forecastDay].condition;
  // //forecast low temp data
  // containerArray[index][5].children[1].innerHTML = data[forecastDay].tempLow;
  // //forecast high temp data
  // containerArray[index][7].children[1].innerHTML = data[forecastDay].tempHigh;
  // //forecast humidity data
  // containerArray[index][9].children[1].innerHTML =
  //   data[forecastDay].avgHumidity;
  // containerArray[index][11].children[0].src = data[forecastDay].icon;
}
searchBtn.addEventListener("click", () => {
  let location = citySearch.value;
  displayWeatherDataToDom(location);
});

displayWeatherDataToDom("New York");
//currentIcon.src = "https://www.qries.com/images/banner_logo.png";

console.log(foreCastContainer);
