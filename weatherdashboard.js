const historyData = [];

//overwrite array data



function currentWeatherForecast(location) {
    let queryLocation = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&APPID=184856c0a526c2d51fff6a52548b9f0c"; 
    $.ajax({
        url: queryLocation,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var city = response.name
        var country = response.sys.country
        var date
        var icon = response.weather[0].icon
        var temp = response.main.temp
        var humidity = response.main.humidity
        var windSpeed = response.wind.speed
        var longitude = response.coord.lon;
        var latitude = response.coord.lat;
        function getUvIndex() {
            let uvIndexData = "http://api.openweathermap.org/data/2.5/uvi?APPID=184856c0a526c2d51fff6a52548b9f0c&lat=" + latitude + "&lon=" + longitude;
            $.ajax({
                url: uvIndexData,
                method: "GET"
            }).then(function(uvResponse) {
                console.log(uvResponse);
                var uvIndex = uvResponse.value
                var uv = $("<h5>").text("UV Index: " + uvIndex);
                $("#UV").append(uv);
            });
        };
        getUvIndex();
        var request = $("<h5>").text(city + ", " + country);
        var tempurature = $("<h5>").text("Tempurature: " + temp + " F");
        var iconImg = $("<img>").attr("src", icon);
        var hum = $("<h5>").text("Humidity: " + humidity + "%");
        var wind = $("<h5>").text("Wind Speed: " + windSpeed + " MPH")
        $("#data").append(request, iconImg, tempurature, hum, wind);
        
    });
}

function fiveDayWeatherForecast(location) {
    let queryLocation = "http://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=imperial&APPID=184856c0a526c2d51fff6a52548b9f0c"; 
    $.ajax({
        url: queryLocation,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        for(var i = 2; i < response.list.length; i += 8) {
            console.log(response.list[i].dt_txt)
            var card = 
            `<li class="list-group-item">
                <div class="card-body">
                <h5 class="card-title">Date: ${response.list[i].dt_txt}</h5>
                <p class="card-text">Tempurature: ${response.list[i].main.temp}F</p>
                <p class="card-text">Humidity: ${response.list[i].main.humidity}%</p>
                </div> 
             </li>`
        $("#card-content").append(card)
        };
    });
};

$("#search").on("click", function(event) {
    event.preventDefault();
    //console.log("This button was clicked")
    var text = $("#location")
    .val()
    .toString();
    console.log(text);
    var location = text
    localStorage.setItem("mySearch", location);
    currentWeatherForecast(location);
    fiveDayWeatherForecast(location);
});

    //Function to display 5 day forcast

    //Function to save data to local storage

    //Function to fill in recent searches

    //Function to access local storage for last location search 


   