const mySearches = [];
//var n = mySearches.length

//To get current weather forecast and UV index data
function currentWeatherForecast(location) {
    $("#UV").empty()
    let queryLocation = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&APPID=184856c0a526c2d51fff6a52548b9f0c"; 
    $.ajax({
        url: queryLocation,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var city = response.name
        var country = response.sys.country
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
                $("#data").empty()
                var request = $("<h5>").text(city + ", " + country);
                var tempurature = $("<h5>").text("Tempurature: " + temp + " F");
                //var iconImg = $("<img>").attr("src", icon);
                var hum = $("<h5>").text("Humidity: " + humidity + "%");
                var wind = $("<h5>").text("Wind Speed: " + windSpeed + " MPH")
                $("#data").append(request, tempurature, hum, wind);
        
    });
}


//To get 5 day forecast data
function fiveDayWeatherForecast(location) {
    $("#card-content").empty()
    let queryLocation = "http://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=imperial&APPID=184856c0a526c2d51fff6a52548b9f0c"; 
    $.ajax({
        url: queryLocation,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        for(var i = 2; i < response.list.length; i += 8) {
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


//Captures location input from search feature, runs forecast functions, stores location to local storage
$("#search").on("click", function() {
    event.preventDefault();
    var text = $("#location")
                .val()
                .toString();
    //console.log(text);
    var location = text
    var key = mySearches.length
    if(mySearches.includes(text) === false) {
    mySearches.push(location);
    localStorage.setItem("My Searches" , JSON.stringify(mySearches));
    localStorage.setItem(key , location);
    }
    console.log(mySearches)
    currentWeatherForecast(location);
    fiveDayWeatherForecast(location);
    
});


//To clear local storage
function clearStorage() {
    localStorage.clear()
}
//clearStorage();


//Behavior on window load
window.onload = function(){
    //var search = window.localStorage.getItem('mySearch')
    //mySearches.push(search)
    //console.log("Loaded")
    //console.log(search)
    //this.currentWeatherForecast(search);
    //this.fiveDayWeatherForecast(search);
    //this.currentWeatherForecast()
};

//Instead of worrying about converting code to string, focus on accessing value by key

//Local storage processing
function localStorage() {
    var i = mySearches.length // grabs number from array to use as local storage key
    var searches = JSON.stringify(mySearches) //converts array into string to store in local storage to reload previous list
    localStorage.setItem(i, searches) //sets string to local storage using index size as the key
    //var group = `<li class="list-group-item">${location}</li>` Will populate recent search list
}

// mySearches.push(location)
//     localStorage.setItem("mySearch", location);

    //Function to display 5 day forcast

    //Function to save data to local storage

    //Function to fill in recent searches

    //Function to access local storage for last location search 

    //push search locations to array
    //push to local storage using index position as key



   