var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let dateNow = new Date()
let month = dateNow.getMonth()
let day = dateNow.getDay()
let date = dateNow.getDate()
let printDay = days[day]
let printMonth = monthNames[month]
let searchInput = document.getElementById("search")


async function getDate(ruselt) {
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d76c985859de4d37a95162735240301&q=${ruselt}&days=3&aqi=no&alerts=no`);
    let finelRuselt = await data.json();
    displayToday(finelRuselt);
}
getDate("cairo");

searchInput.addEventListener("change",function () {
  getDate(searchInput.value)
  clear()
})

function displayToday(list) {

    let main = `
    <div class="col-lg-4 col-sm-12 pb-3 frist">
    <div class="header d-flex justify-content-between">
      <h3 class="text-light opacity-50 fs-6">${printDay}</h3>
      <h3 class="text-light opacity-50 fs-6">${date} ${printMonth}</h3>
    </div>
    <h4 class="location text-light opacity-50 p-3">${list.location.name}</h4>
    <div class="degree d-flex justify-content-around">
      <div class="head position-relative">
        <h1>${list.current.temp_c}<span class="position-absolute"> o </span> c</h1>
      </div>
      <div class="icon mt-5">
      <img src="http:${list.current.condition.icon}" alt="">
      </div>
    </div>
    <div class="content p-3">
      <h5 class="mb-3">${list.current.condition.text}</h5>
      <span><i class="fa-solid fa-umbrella fa-xl"></i> ${list.current.humidity}%</span>
      <span><i class="fa-solid ps-2 fa-wind fa-xl"></i> ${list.current.wind_kph}km/h</span>
      <span><i class="fa-regular ps-2 fa-compass fa-xl"></i> ${list.current.wind_dir}</span>
    </div>
  </div>`

    for (let i = 0; i < 2; i++) {
        let nextDay = list.forecast.forecastday[i + 1].date
        let changeNextDay = new Date(nextDay)
        let finallyPrint = days[changeNextDay.getDay()]

        main += `
    <div class="col-lg-4 col-sm-12 souc">
    <div class="header d-flex justify-content-center">
        <h3 class="text-light opacity-50 fs-6">${finallyPrint}</h3>
    </div>
    <div class="icon d-flex  py-5 justify-content-center ">
    <img src="http:${list.forecast.forecastday[i + 1].day.condition.icon}" alt="">
   </div>
   <div class="content-cen  flex-column d-flex justify-content-center align-items-center ">
        <h4 class="text-light  position-relative">${list.forecast.forecastday[i + 1].day.maxtemp_c}<span class="position-absolute"> o </span> c</h4>
        <h5 class="text-light opacity-50 position-relative">${list.forecast.forecastday[i + 1].day.mintemp_c}<span class="position-absolute">o</span></h5>
        <h5 class="day">${list.forecast.forecastday[i + 1].day.condition.text}</h5>
    </div>
    </div>`

    }
    document.getElementById("WeatherData").innerHTML = main
}
function clear() {
  searchInput.value=""
}
