window.onload = function(){
  document.getElementById("weatherSubmit").addEventListener("click", async function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
    console.log(value);

    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=9d83bb7154110a5055f94e83aad741df";

    try{
      const response = await fetch(url);
      const json = await response.json();

      var results = "";
      results += '<h1>Weather in ' + json.name + "</h1>";
      for (var i=0; i < json.weather.length; i++) {
        results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += '<h2>' + json.main.temp + " &deg;F</h2>"
      results += "<p>"
      for (var i=0; i < json.weather.length; i++) {
        results += json.weather[i].description
        if (i !== json.weather.length - 1)
        results += ", "
      }
      results += "</p>";
      document.getElementById("weatherResults").innerHTML = results;
    }catch(err){
      console.log(err);
    }

    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=9d83bb7154110a5055f94e83aad741df";
    try{
      const response2 = await fetch(url2);
      const json2 = await response2.json();

      var forecast = "";
      for (var i=0; i < json2.list.length; i++) {
        forecast += '<div class="forecast">'
        forecast += '<div class="date"><h2>' + moment(json2.list[i].dt_txt).format('MMMM Do YYYY, h a') + '</h2></div>';
        // 'MMMM Do YYYY, h:mm:ss a'
        forecast += '<div class="hourly_temp"><p>Temperature: ' + json2.list[i].main.temp + ' &deg;F' + "</p></div>";
        forecast += '<div class="hourly_picture"><img src="http://openweathermap.org/img/w/' + json2.list[i].weather[0].icon + '.png"/></div>'
        forecast +='</div>'
      }
      document.getElementById("forecastResults").innerHTML = forecast;
    }catch{

    }
  });
}
