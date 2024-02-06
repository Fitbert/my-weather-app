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
function convertToC(fahrenheit) {
    var fTempVal = fahrenheit;
    var cTempVal = (fTempVal - 32) * (5 / 9);
    var celcius = Math.round(cTempVal * 10) / 10;
    return celcius;
  }

function getWeather(q) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + q + "&units=imperial&appid=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET",
        error: (err => {  
            alert("Your city was not found. Check your spelling or enter a city code")
            return;
          })
    }).then(function (response) {
        console.log(response)
        $(".cityList").empty()
        $("#days").empty()
        var celcius = convertToC(response.main.temp);
        var cityMain1 = $("<div col-12>").append($("<p><h2>" + response.name + ' (' + currentDate + ')' + "</h2><p>"));
        var image = $('<img class="imgsize">').attr('src', './icons/' + response.weather[0].icon + '.png');        
        var degreeMain = $('<p>').text('Temperature : ' + response.main.temp + ' °F (' + celcius + '°C)');
        var humidityMain = $('<p>').text('Humidity : ' + response.main.humidity + '%');
        var windMain = $('<p>').text('Wind Speed : ' + response.wind.speed + 'MPH');       
        var uvIndexcoord = '&lat=' + response.coord.lat + '&lon=' + response.coord.lon;
        var cityId = response.id;

        displayUVindex(uvIndexcoord);
        displayForecast(cityId);

        cityMain1.append(image).append(degreeMain).append(humidityMain).append(windMain);
        $('#cityList').empty();
        $('#cityList').append(cityMain1);
    });
}
function displayUVindex(uv) {
    $.ajax({ 
        url: "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + uv,
        method: "GET"
    }).then(function (response) {
        var UVIndex = $("<p><span>");
        UVIndex.attr("class", "badge badge-danger");
        UVIndex.text(response.value);
        $("#cityList").append('UV-Index : ').append(UVIndex);       
    });
}

function displayForecast(c) {
  $.ajax({ 
      url: "https://api.openweathermap.org/data/2.5/forecast?id=" + c + "&units=imperial&APPID=" + APIKey,
      method: "GET",
  }).then(function (response) {
      var arrayList = response.list;
      for (var i = 0; i < arrayList.length; i++) {
          if (arrayList[i].dt_txt.split(' ')[1] === '12:00:00') {
              console.log(arrayList[i]);
              var celcius = convertToC(arrayList[i].main.temp); 
              var cityMain = $('<div>');
              cityMain.addClass('col forecast bg-primary text-white ml-3 mb-3 rounded>');
              var date5 = $("<h5>").text(response.list[i].dt_txt.split(" ")[0]);
              var image = $('<img>').attr('src', './icons/' + arrayList[i].weather[0].icon + '.png');
              var degreeMain = $('<p>').text('Temp : ' + arrayList[i].main.temp + ' °F ('+ celcius + '°C)');               
              var humidityMain = $('<p>').text('Humidity : ' + arrayList[i].main.humidity + '%');
              var windMain = $('<p>').text('Wind Speed : ' + arrayList[i].wind.speed + 'MPH');                
              cityMain.append(date5).append(image).append(degreeMain).append(humidityMain).append(windMain);
              $('#days').append(cityMain);
          }
      }
  });
};
function currentLocation() {
  $.ajax({
      url: "https://freegeoip.app/json/",
      method: "GET",
  }).then(function (response) {
      q = response.city || 'exton';
      console.log(q);
      getWeather(q);
  });
};
function checkLocalStorage() {
  var storedData = localStorage.getItem('queries');
  var dataArray = [];
  if (!storedData) {
      console.log("no data stored");
  } else {
      storedData.trim();
      dataArray = storedData.split(',');
      for (var i = 0; i < dataArray.length; i++) {
          createRecentSearchBtn(dataArray[i]);
      }
  }
};
function saveToLocalStorage(q) {
  var data = localStorage.getItem('queries');
  if (data) {
      console.log(data, q)

  } else {
      data = q;
      localStorage.setItem('queries', data);
  }
  if (data.indexOf(q) === -1) {
      data = data + ',' + q;
      localStorage.setItem('queries', data);
      createRecentSearchBtn(q);
  }
}
$("#clear-history").on("click", function (event) {
  $("#historyList").empty();
});
getWeather('austin')
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

