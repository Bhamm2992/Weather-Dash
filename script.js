$(document).ready(function () {
    $('#search-button').on('click', function () {
        var searchLat = '';
        var searchLon = '';

        function savetostorage(City) {
            var currentData = JSON.parse(localstorage.getItem('saved-cities')) || [];
            currentData.push(city);
            localStorage.setItem('saved-cities', JSON.stringify(currentData));
        }

        function rendersavecityBtns() {
            var currentData = JSON.parse(localStorage.getItem('saved-cities')) || [];
            currentData.forEach(function (cityData) {
                var BtnCity = $('<button>');
                console.log(BtnCity);
                BtnCity.addClass('btn btn-secondary search-history-btn');
                BtnCity.text(cityData);
                $('.searchHistory').prepend(BtnCity);
            })
        }

        rendersavecityBtns();
        $('search-history-btn').on('click', function () {
            var searchHistoryCity = $(this).text();
            submitSearch(searchHistoryCity);
        })

        function submitSearch(cityName) {
            var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q={city name}&appid=' + APIkey
            $.ajax({
                url: queryURL,
                method: 'GET',
            })
            console.log(queryURL);
            console.log(answer);
            var city = '';
            var date = moment().format('MM/DD/YY');
        }
        var APIkey = 'aadaa27459f8f69cc44918b2dda30692';
        $.ajax({
            url: APIkey,
            method: 'GET',
        }).then(function (response2) {
            console.log(response2);
        })

        var weatherResults = $("<div class='weather-results'>");
        var cityDisp = $("<h2>").text(CityName);
        var CityStandardDate = moment.unix(response2.current.dt).format("MM/DD/YY");
        var CityDate = $("<p>").text("Date: " + CityStandardDate);
        var tempF = response2.current.temp;
        var cityTemp = $("<p>").text("temp(F) : " + tempF + "F");
        var humidityRes = (response2.current.humidity);
        var cityHumidity = $("<p>").text("Humidity: " + humidityRes + "%");
        var windRes = (response2.current.wind_flow);
        var cityWindFlow = $("<p>").text("Wind Flow: " + windRes + " MPH");

        $(".card-text").empty();
        weatherResults.append(cityDisp, CityStandardDate, CityDate, cityTemp, cityHumidity, cityWindFlow);

        $(".card-text").append(weatherResults);
        var Forecastels = $('.forecast');
        $('.forecast').empty();

        for (var i = 0; i < Forecastels.length; i++) {
            var b = i + 1;
            var Forecastel = $(Forecastels[i]);
            console.log(Forecastel);
            var ForecastStandardDate = moment.unix(response2.daily[b].dt).format(" ddd MM/DD");
            var Forecastdate = $(" <p>").text(ForecastStandardDate);
            var ForecastHighTemp = $("<p>").text("High Temp(F): " + ForecastHighTemp + " F");
            var ForcastLowTemp = response2.daily[b].temp.min;
            var ForecastLtemp = $("<p>").text("Low Temp(F): " + ForecastLowTemp + " F");
            var ForecasthumidityRes = (response2.daily[b].humidity);
            var ForecastHumidity = $("<p>").text("Humidity: " + ForecasthumidityRes + "%");
            Forecastel.append(ForecastStandardDate, Forecastdate, ForecastHighTemp, ForecastLowTemp, ForecastLtemp, ForecasthumidityRes, ForecastHumidity);
        }

    })
})

$('#search-button').on("click", Function() {
    Event.preventDefault();
    var searchCity = $("#searchCity").val();
    savetostorage(searchCity);
    submitSearch(searchCity);
    $("#searchCity").val('');
});
