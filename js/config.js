var config = {
    embedMapKey:"AIzaSyDwchQADku1HdBm-5Uzp4yOyNBt-m5AKyY",
    placeId:"ChIJNRCpGs00K4gRjM_tAQki9f8",
    geoKey:"AIzaSyDyaFwNMBuVM04UGYf0sjR2E5nmmuTtjok",
    jsMapKey:"AIzaSyAZ0TdDBHrhY0dzvmi7CnYJM_9MYg5EiKg"
  }

  function changeWeather(){
    console.log("change weather");
    var openWeatherMap = "http://api.openweathermap.org/data/2.5/weather?q=Toronto&units=metric&APPID=fa5b7512322f7eb4f8c24b4d5a92b773";
    var weather = document.getElementById("weather");
    getJSON(openWeatherMap, function(err,data){
        if(err!=null){
            var errorMessage = "Something wrong happens:"+err;
            alert(errorMessage);
            console.log(errorMessage);
        }
        else{
            var temperature = data.main.temp;
            var humidity = data.main.humidity;
            weather.innerHTML = temperature + "&degC" + " - " + humidity + "%";
        }
    })
    setTimeout("changeWeather()",200000);
}