$(window).on('load', function () {
  currentLocation();
  checkLocalStorage();
});
var APIKey = "7ee985d3f3fcb82608bed4de2f5719c6";
var q = "";
var now = moment();
var currentDate = now.format('MMMM Do YYYY || h:mm a');
$("#currentDay").text(currentDate);

$("#search-btn").on("click", function (event) {
  event.preventDefault();

  q = $("#city-input").val();
  if (q === '') {
      return alert('Please Enter Valid City Name ! ');
  }
  getWeather(q);

  saveToLocalStorage(q);
});
function createRecentSearchBtn(q) {
  var newLi = $("<li>")
  var newBtn = $('<button>');
  newBtn.attr('id', 'extraBtn');
  newBtn.addClass("button is-small recentSearch");
  newBtn.text(q);
  newLi.append(newBtn)
  $("#historyList").prepend(newLi);
  $("#extraBtn").on("click", function () {
      var newQ = $(this).text();
      getWeather(newQ);
  });
}
// // const api ={
// //     key: " 7ee985d3f3fcb82608bed4de2f5719c6",
// //     base: "https://api.openweathermap.org/data/2.5/"
// // }


// // const searchbox = document.querySelector('.search-box');
// // searchbox.addEventListener('keypress', setQuery);


// // function setQuery(evt){
// //     if (evt.keyCode == 13) {
// //         getResults(searchbox.value);
// //     }
// // }
// // function getResults(query) {
// //     fetch('https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid=7ee985d3f3fcb82608bed4de2f5719c6')
// //     .then(weather => {
// //         return weather.json();
// //     }) .then(displayResults);
    
// // }
// // function displayResults (weather) {
// //     console.log(weather);
// //     let city = document.elementSelector('.location . city');
// //     city.innerText = '${weather.name}, ${weather.sys.country}';

// //     let now =document.querySelector('.location .date');
// //     temp.innerText = dateBuilder(now);

// //     let tem = document.querySelector('.current .tem');
// //     tem.innerHTML= '${Math.round(weather.main.temp)}<span>°c</span>';
// //     let weather_el = document.querySelector('current . weather');
// //     weather_el.innerText = weather.weather[0].main;

// //     let hilow = document.querySelector('.hi-low');
// //     hilow.innerText = '${Math.round(weather.main.temp_min)}'
// // }

// // function dateBuilder (d){
// //     let months = ["January","Feb"]
// //     let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

// //     let day = days[d.getDay()];
// //     let date = d.getDate();
// //     let month = months[d.getMonth()];
// //     let year = d.getFullYear();

// //     return '${day} ${date} ${month} ${year}';

// // }

