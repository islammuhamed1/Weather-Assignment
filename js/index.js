let currentDay = document.getElementById("current_day_data")
let todayNumber = document.getElementById("today_date_day_number")
let todayMonth = document.getElementById("today_date_month")
let currentLocation = document.getElementById("current_location")
let currentTemp = document.getElementById("current_temp")
let currentTodayIcon = document.getElementById("current_img_condition")
let todayConditionIText = document.getElementById("today_condition_text")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let windDirection = document.getElementById("wind_direction")
let weatherData




// next day data
let nextDay = document.getElementById("next_day_name")
let nextMaxTemp = document.getElementById("next_max_temp")
let nextMinTemp = document.getElementById("next_min_temp")
let nextConditionImg = document.getElementById("next_condition_img")
let nextConditionText = document.getElementById("next_condition_text")


// search Input
let searchInput = document.getElementById("searchbar")
let date = new Date()

//Fetch 
async function getWeatherData(nameOfCity){
    let weatherResponse = await fetch(`"https://api.weatherapi.com/v1/search.json?key=%3Cd8a5ad3b194348988a951053241107%3E&q=${nameOfCity}`)
    let weatherData = await weatherResponse.json()
    return weatherData
}
function displayCurrentDayData(data){
    let todayDate = new Date()
    currentDay.innerHTML = todayDate.toLocaleDateString("en-US" , {weekday:"long"})
    todayNumber.innerHTML = todayDate.getDate()
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-US" , {month:"long"})
    currentLocation.innerHTML = data.location.name
    currentTemp.innerHTML = data.current.temp_c
    currentTodayIcon.setAttribute("src", data.current.condition.icon)
    todayConditionText.innerHTML=  data.current.condition.text
    humidity.innerHTML = data.current.humidity+"%"
    wind.innerHTML = data.current.wind_kph+"km/h"
    windDirection.innerHTML = data.current.wind_dir
}
function NextDay(data){
    let foreCastData = data.forecast.forecastday
    for (let i = 0 ; i < 2 ; i++){
        let nextDate = new Date(foreCastData[i+i].date)
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US" , {weekday:"long"})
        nextMaxTemp[i].innerHTML = foreCastData[i+1].day.maxTemp_c
        nextMinTemp[i].innerHTML = foreCastData[i+1].day.minTemp_c
        nextConditionImg[i].setAttribute("src" , foreCastData[i+1].day.condition.icon)
        nextConditionText[i].innerHTML =  foreCastData[i+1].day.condition.text
    }
}
async function appStart(city="Alexandria"){
   let weatherData = await getWeatherData(city)
   if(!weatherData.error){
    displayCurrentDayData(weatherData)
    NextDay(weatherData)
   }
 
}

appStart()

searchInput.addEventListener("input",function(){
    appStart(searchInput.value)
})