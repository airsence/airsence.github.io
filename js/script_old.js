/*********************************************
 * Function to intialize the content in the page
 *********************************************/
function onMainLoad() {
  changeTime();
  //getMapUrl();
  addEnterToInput();
  //initThreshold();
  //getChartFeature();
  changeContent("aqhi");
  onResize();
  //phpFetching();
}
/******************************************************
 * Function for loading every feature to performing the
 * website
 ******************************************************/
var infoURL = "php/getInfo.php";
function loadingInfo() {
  postJSON(infoURL, function(err, json) {
    if (err == null) {
      mapFeature = json[0].map_feature;
      getChartFeature(json[0].chart_feature);
    } else console.error(err);
  });
}

/*********************************************
 * Function to change main showing data in the
 * parameter panel when click on the button.
 * Also will change the chart.
 *********************************************/
var lastClickPollution;
function changeContent(var1) {
  /*
        Get all the element that need to be change when
        a pollution button is clicked.
    */
  lastClickPollution = var1; //store the last clicked pollution for later period button click
  var paramname = document.getElementById("paramname"); //pollution name shown in the circle
  var legend = document.getElementById("legend"); //pollution name shown in the chart
  var legendUnit = document.getElementById("legend-unit"); //pollution unit shown in the chart
  var circle = document.getElementById("circle"); //circle color
  circle.className = "circle";
  var selectedButton = document.getElementById(var1); //pollution button selected now
  var paramButtons = document.getElementsByClassName("parammenu-button"); //array of all pollution button
  var infoBlocks = document.getElementsByClassName("information-section"); //array of all information block below chart
  var infoBlock = document.getElementById(var1 + "-info"); //the seleted pollution information block
  closeAllInfoBlock();
  clickHereClicked = false;
  for (var i = 0; i < paramButtons.length; i++) {
    paramButtons[i].className = paramButtons[i].className.replace(
      " active",
      ""
    );
    infoBlocks[i].className = infoBlocks[i].className.replace(" active", "");
  }
  circle.className += " " + selectedButton.className.split(" ")[1];
  //change the name and unit in the circle accrodingly
  switch (var1) {
    case "pm2_5":
      paramname.innerHTML = "PM<sub>2.5</sub>";
      legend.innerHTML = "PM<sub>2.5</sub>";
      legendUnit.innerHTML = "μg/m<sup>3</sup>";
      break;
    case "no2":
      paramname.innerHTML = "NO<sub>2</sub>";
      legend.innerHTML = "NO<sub>2</sub>";
      legendUnit.innerHTML = "ppb<sup>&nbsp;</sup>";
      break;
    case "no":
      paramname.innerHTML = "NO<sub> </sub>";
      legend.innerHTML = "NO<sub> </sub>";
      legendUnit.innerHTML = "ppb<sup>&nbsp;</sup>";
      break;
    case "co":
      paramname.innerHTML = "CO<sub> </sub>";
      legend.innerHTML = "CO<sub> </sub>";
      legendUnit.innerHTML = "ppb<sup>&nbsp;</sup>";
      break;
    case "o3":
      paramname.innerHTML = "O<sub>3</sub>";
      legend.innerHTML = "O<sub>3</sub>";
      legendUnit.innerHTML = "ppb<sup>&nbsp;</sup>";
      break;
    case "aqhi":
      paramname.innerHTML = "AQHI<sub> </sub>";
      legend.innerHTML = "AQHI<sub> </sub>";
      legendUnit.innerHTML = "&nbsp;<sup>&nbsp;</sup>";
      break;
    case "so":
      paramname.innerHTML = "SO<sub> </sub>";
      legend.innerHTML = "SO<sub> </sub>";
      break;
    case "aqi":
      paramname.innerHTML = "AQI<sub> </sub>";
      legend.innerHTML = "AQI<sub> </sub>";
      legendUnit.innerHTML = "&nbsp;<sup>&nbsp;</sup>";
      break;
  }
  selectedButton.className += " active";
  infoBlock.className += " active";
  if (firstLoad) firstLoad = false;
  else updateChart(var1);
}
/*********************************************
 * Function to add Enter for searhing to the
 * address search button
 *********************************************/
function addEnterToInput() {
  var text = document.getElementById("address");
  text.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.getElementById("search-button").click();
    }
  });
}
/*********************************************
 * Function to intialize threshold for different
 * pollution
 *********************************************/
var thresholdUrl = "php/getThreshold.php";
var thresholdInfo;
function initThreshold() {
  postJSON(thresholdUrl, function(err, json) {
    thresholdInfo = json;
  });
}
/*********************************************
 * Function to show the menu when menu button
 * clicked
 *********************************************/
var menuClicked = false;
function onMenuClick() {
  var menu = document.getElementById("navbar-collapse");
  if (!menuClicked) {
    menu.className += " active";
    menuClicked = true;
  } else {
    menu.className = menu.className.replace(" active", "");
    menuClicked = false;
  }
}
/*********************************************
 * Function to show the detail information of
 * the chosen pollution, about and how to use
 *********************************************/
var clickHereClicked = false;
function onClickHere(id) {
  closeAllInfoBlock();
  var info = document.getElementById(id + "detail");
  info.className += " active";
}
/*********************************************
 * Function to close all the detail information
 * block
 *********************************************/
function closeAllInfoBlock() {
  var infoBlocks = document.getElementsByClassName("detail-info");
  for (var i = 0; i < infoBlocks.length; i++) {
    infoBlocks[i].className = infoBlocks[i].className.replace(" active", "");
  }
}
/*********************************************
 * Function to change the time in the
 * parameter form
 *********************************************/
function changeTime() {
  //console.log("change time");
  var time = document.getElementById("time");
  var monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  var today = new Date();
  var hour = today.getHours();
  var min = today.getMinutes();
  var month = today.getMonth();
  var date = today.getDate();
  min = checkTime(min);
  hour = checkTime(hour);
  time.innerHTML =
    "Last Updated: " +
    monthName[month] +
    " " +
    date +
    ", " +
    hour +
    ":" +
    min +
    " ";
  setTimeout("changeTime()", 1000);
}
/*********************************************
 * Function to change the weather data in the
 * parameter form
 *********************************************/
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
}
/*****************************************
 * Function for get json file from server.
 *****************************************/
function getJSON(url, callback) {
  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function() {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
}

function postJSON(url, callback, message = null) {
  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhr.open("POST", url, true);
  xhr.responseType = "json";
  xhr.onload = function() {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send(message);
}
/*
function getText(url, callback){
    var xhr;
    if (window.XMLHttpRequest){
        xhr= new XMLHttpRequest();
    }
    else{
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open('POST', url, true);
    xhr.responseType = 'text';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
}
*/

/***********************************************
 * For send period time request to server
 ***********************************************/
var numPoint = 49;
var gap = 6;
function onPeriodClicked(time, id) {
  var clickedButton = document.getElementById(id);
  var periodButtons = document.getElementsByClassName("period_button");
  for (var i = 0; i < periodButtons.length; i++) {
    periodButtons[i].className = "period_button";
  }
  clickedButton.className += " active";
  if (time == 1) {
    numPoint = 49;
    gap = 6;
  } else {
    numPoint = time * 24 + 1;
    gap = time * 3;
  }
  updateChart(lastClickPollution);
}
/***********************************************
 * For spliting the label
 ***********************************************/
String.prototype.splice = function(idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

/***********************************************
 * Draw the line graph under the parameter form
 ***********************************************/
var myChart;
var firstLoad = true;
var airsenceUrl = "php/getJSON.php";
var chartFeatureUrl = "php/getChartFeature.php";
var pollutionJSON = [];
var o3_yAxes,
  no2_yAxes,
  no_yAxes,
  aqhi_yAxes,
  pm2_5_yAxes,
  co_yAxes,
  largeFont,
  smallFont;
/***********************************************
 * Get chart feature from json
 ***********************************************/
/*
function getChartFeature() {
    console.log("enter getChartFeature");
    postJSON(chartFeatureUrl, function (err, json) {
        if (err == null) {
            largeFont = json[0].largeFont;
            smallFont = json[0].smallFont;
            o3_yAxes = json[0].o3_yAxes;
            no2_yAxes = json[0].no2_yAxes;
            no_yAxes = json[0].no_yAxes;
            aqhi_yAxes = json[0].aqhi_yAxes;
            pm2_5_yAxes = json[0].pm2_5_yAxes;
            co_yAxes = json[0].co_yAxes;
            largeFont.ticks.callback = function (value, index, values) {
                if (index % gap == 0) {
                    return [value.split(' ')[0] + ' ' + value.split(' ')[1], value.split(' ')[2]];
                } else {
                    return null;
                }
            };
            smallFont.ticks.callback = function (value, index, values) {
                if (index % gap == 0) {
                    return [value.split(' ')[0] + ' ' + value.split(' ')[1], value.split(' ')[2]];
                } else {
                    return null;
                }
            };
            drawChart();
        }
        else
            console.log(err);
    });
}
*/
function getChartFeature(json) {
  largeFont = json[0].largeFont;
  smallFont = json[0].smallFont;
  o3_yAxes = json[0].o3_yAxes;
  no2_yAxes = json[0].no2_yAxes;
  no_yAxes = json[0].no_yAxes;
  aqhi_yAxes = json[0].aqhi_yAxes;
  pm2_5_yAxes = json[0].pm2_5_yAxes;
  co_yAxes = json[0].co_yAxes;
  largeFont.ticks.callback = function(value, index, values) {
    if (index % gap == 0) {
      return [
        value.split(" ")[0] + " " + value.split(" ")[1],
        value.split(" ")[2]
      ];
    } else {
      return null;
    }
  };
  smallFont.ticks.callback = function(value, index, values) {
    if (index % gap == 0) {
      return [
        value.split(" ")[0] + " " + value.split(" ")[1],
        value.split(" ")[2]
      ];
    } else {
      return null;
    }
  };
  drawChart();
}
/*
largeFont = {
    type: 'time',
    bounds: 'ticks',
    distribution:'series',
    time:{
        unit:"min",
        parser:"YYYY-MM-DD HH-mm",
        displayFormats: {
            min: 'MMM DD HH:mm'
        }
    },
    ticks:{
        source: 'labels',
        callback:function(value, index, values){
            if(index%gap == 0){
                return [value.split(' ')[0]+' '+value.split(' ')[1],value.split(' ')[2]];
            }else{
                return null;
            } 
        },
        maxRotation:0,
        fontSize: 14,
        fontColor: "#515151"
    },
};
smallFont = {
    type: 'time',
    bounds: 'ticks',
    distribution:'series',
    time:{
        unit:"min",
        parser:"YYYY-MM-DD HH-mm",
        displayFormats: {
            min: 'MMM DD HH:mm'
        }
    },
    ticks:{
        source: 'labels',
        callback:function(value, index, values){
            if(index%gap == 0){
                return [value.split(' ')[0]+' '+value.split(' ')[1],value.split(' ')[2]];
            }else{
                return null;
            } 
        },
        maxRotation:0,
        fontSize: 10,
        fontColor: "#515151"
    },
};
*/
function drawChart() {
  //Chart.defaults.global.defaultFontColor = '#515151';
  console.log("enter drawChart");
  var ctx = document.getElementById("myChart").getContext("2d");
  var gradient = ctx.createLinearGradient(0, 20, 0, 300); //gradient background shown in the chart
  //var colorBar = document.getElementById("color-bar").getContext('2d');
  gradient.addColorStop(0.1, colorMap.red);
  gradient.addColorStop(0.3, colorMap.orange);
  gradient.addColorStop(0.5, colorMap.yellow);
  gradient.addColorStop(0.7, colorMap.lightgreen);
  gradient.addColorStop(0.9, colorMap.green);
  //colorBar.fillStyle =  gradient;
  //colorBar.fillRect(0,0,30,210);
  postJSON(airsenceUrl, function(err, json) {
    if (err == null) {
      var date = [];
      var value = [];
      if (err != null) {
        var errorMessage = "Something wrong happens:" + err;
        alert(errorMessage);
        console.log(errorMessage);
      } else {
        pollutionJSON = json;
        for (var i = json.length - numPoint; i < json.length; i++) {
          date.push(json[i].datetime);
          value.push(json[i].AQHI);
        }
      }
      myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: date,
          datasets: [
            {
              data: value,
              backgroundColor: gradient,
              borderColor: "#54a4db"
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          scales: {
            /*
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                fontSize: 14
                            },
                            fontColor: "#515151"                        
                        }],
                        */
            yAxes: [aqhi_yAxes],
            xAxes: [largeFont]
          },
          elements: {
            line: {
              tension: 0.1
            }
          }
        }
      });
    } else console.log(err);
  });
}
/*********************************************
 * Function to close pop out menu and change
 * the position of navbar button and logo
 * It also change the font size of the xAxes
 * of the chart
 *********************************************/
var chartFontSize = 14;
function onResize() {
  if (menuClicked) {
    var menu = document.getElementById("navbar-collapse");
    menu.className = menu.className.replace(" active", "");
    menuClicked = false;
  }
  if (
    (window.innerWidth < 1224 && window.innerWidth > 850) ||
    window.innerWidth < 480
  ) {
    if (chartFontSize != 12) {
      myChart.options.scales.xAxes[0] = smallFont;
      chartFontSize = 12;
      myChart.update();
      console.log("change to small font for chart");
    }
  } else {
    if (chartFontSize != 14) {
      myChart.options.scales.xAxes[0] = largeFont;
      chartFontSize = 14;
      myChart.update();
      console.log("change to large font for chart");
    }
  }
}
/******************************************************
 * Function for updating the chart when click on the
 * period choice or pollution button
 ******************************************************/

function updateChart(pollution) {
  console.log("updageChart with " + pollution);
  var date = [];
  var value = [];
  for (var i = pollutionJSON.length - numPoint; i < pollutionJSON.length; i++) {
    date.push(pollutionJSON[i].datetime);
    eval("value.push(pollutionJSON[i]." + pollution + ")");
  }
  eval("myChart.options.scales.yAxes[0] = " + pollution + "_yAxes");
  myChart.data.labels = date;
  myChart.data.datasets[0].data = value;
  myChart.update();
}

/******************************************************
 * Function for initialize Google Map. The center is
 * set at A.U.G. It will test whether the browser support
 * html5 geolocation and locate the user position.
 ******************************************************/
var map, infoWindow, mapFeature;
var mapFeatureUrl = "php/getMapFeature.php";
var sensorUrl = "php/getSensorLocationDB.php";
var sensorInfoJSON;
var markers = [];
var lastClick = 6;
var boundLock = false;
function initMap() {
  var aug = { lat: 43.6508586, lng: -79.3822846 };
  postJSON(mapFeatureUrl, function(err, json) {
    if (err == null) {
      map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: aug,
        styles: json
      });
      window.setTimeout(function() {
        initMarker();
      }, 2000);

      //Add Listener to the map. When the bound change, it will be called every
      //4s to renew the marker on the map
      map.addListener("bounds_changed", function() {
        if (!boundLock) {
          boundLock = true;
          window.setTimeout(function() {
            /*
                        bounds = map.getBounds();
                        lngLeft = bounds.b.b;
                        
                        lngRight = bounds.b.f;
                        latBottom = bounds.f.b;
                        latTop = bounds.f.f;
                        console.log(lngLeft, lngRight, latBottom, latTop);
                        */
            clearMarkers();
            initMarker();
            boundLock = false;
          }, 4000);
        }
      });
    } else console.log(err);
  });
}
/******************************************************
 * Function for getting sensor location information
 ******************************************************/
//var markerIcon = ['red','lightgreen','orange','yellow','green'];
var bounds, lng1, lng2, lat1, lat2;
var colorMap = {
  red: "#D7191C",
  yellow: "#FFFF4D",
  lightgreen: "#91D049",
  green: "#1A9641",
  orange: "#FD9935"
};
function initMarker() {
  console.log("enter initMarker");
  bounds = map.getBounds();
  lat1 = bounds.f.b;
  lat2 = bounds.f.f;
  lng1 = bounds.b.b;
  lng2 = bounds.b.f;
  var boundsMessage = { lng1: lng1, lng2: lng2, lat1: lat1, lat2: lat2 };
  console.log(boundsMessage);
  postJSON(
    sensorUrl,
    function(err, json) {
      sensorInfoJSON = json;
      drop();
    },
    boundsMessage
  );
}
/******************************************************
 * Function for dropping marker on the map.
 ******************************************************/
function drop() {
  //clearMarkers();
  for (var i = 0; i < sensorInfoJSON.length; i++) {
    addMarker(sensorInfoJSON[i], i);
  }
  for (var i = 0; i < markers.length; i++) {
    console.log(markers[i].deviceID);
    if (markers[i].deviceID == lastClick) {
      google.maps.event.trigger(markers[i].marker, "click");
      break;
    }
  }
}
/******************************************************
 * Function that return the color for the sensor pin
 * according to the aqhi value
 ******************************************************/
function checkAQHI(aqhi) {
  switch (aqhi) {
    case 1:
    case 2:
      return "green";
    case 3:
    case 4:
      return "lightgreen";
    case 5:
    case 6:
      return "yellow";
    case 7:
    case 8:
      return "orange";
    case 9:
    case 10:
      return "red";
    default:
      return "grey";
  }
}
/******************************************************
 * Class that take the threshold of the pollution.
 * It has a member function that check the pollution
 * value and return the corresponding color
 ******************************************************/
/*
class pollution{
    constructor(pollution_feature){
        this.name = pollution_feature.name;
        this.greenLow = pollution_feature.green.low;
        this.greenHigh = pollution_feature.green.high;
        this.lightgreenLow = pollution_feature.lightgreen.low;
        this.lightgreenHigh = pollution_feature.lightgreen.high;
        this.yellowLow = pollution_feature.yellow.low;
        this.yellowHigh = pollution_feature.yellow.high;
        this.orangeLow = pollution_feature.orange.low;
        this.oragneHigh = pollution_feature.orange.high;
        this.redLow = pollution_feature.red.low;
        this.redHigh = pollution_feature.red.high;
    }
    checkAQHI(value){
        if(this.greenLow <= value && value < this.greenHigh) return "green";
        if(this.lightgreenLow <= value && value < this.lightgreenHigh) return "lightgreen";
        if(this.yellowLow <= value && value < this.yellowHigh) return "yellow";
        if(this.orangeLow <= value && value < this.oragneHigh) return "orange";
        if(this.redLow <= value ) return "red";
    }
}
*/
/******************************************************
 * Function for adding marker to the markers array
 ******************************************************/
function addMarker(sensorInfo, i) {
  var sensorColor = checkAQHI(sensorInfo.aqhi);
  var iconPath = "images/" + sensorColor + ".png";
  var pinPath = "images/pin_" + sensorColor + ".png";
  /*
        Here we construct a new marker object. In a marker object, 
        we store the location name of the sensor, the  google marker 
        object, the color of the pin on the map, and then sensor ID.
        Also contain the the google information object that will show
        when client click on the pin on the map
    */
  console.log(sensorInfo.device_id);
  var newMarker = {
    //name:sensorInfo.monitor_name,
    name: sensorInfo.station_name,
    marker: new google.maps.Marker({
      position: { lat: sensorInfo.lat, lng: sensorInfo.lng },
      map: map,
      animation: google.maps.Animation.DROP,
      icon: iconPath
    }),
    color: sensorColor,
    deviceID: sensorInfo.device_id,
    info: new google.maps.InfoWindow({
      //content:sensorInfo.monitor_name
      content: sensorInfo.station_name
    }),
    aqhi: sensorInfo.aqhi
  };
  console.log(newMarker.deviceID);
  /*
        We push the new marker object into a array
    */
  markers.push(newMarker);
  /*
        Here we add marker onclick listener to google marker object 
        (Not the marker object we make ourselves).This onclick function 
        will first close the information that shown on the map according 
        to the which pin is last clicked. Then it will show the information 
        of the clicked pin for this time. It will also change the data panel 
        to shown the AQHI data of the place that clicked and change other 
        information in the data panel accrodingly. 
    */
  markers[i].marker.addListener("click", function() {
    /*
        markers.forEach(function(element){
            if(element.deviceID == lastClick){
                element.marker.icon = 'images/' + element.color + '.png';
                element.marker.setMap(null);
                element.marker.setMap(map);
                element.info.setMap(null);
            }
        });
        */
    for (var i = 0; i < markers.length; i++) {
      if (markers[i].device_id == lastClick) {
        markers[i].marker.icon = "images/" + markers[i].color + ".png";
        markers[i].marker.setMap(null);
        markers[i].marker.setMap(map);
        markers[i].info.setMap(null);
        break;
      }
    }
    lastClick = markers[i].deviceID;
    numPoint = 49;
    gap = 6;
    markers[i].marker.icon = "images/pin_" + markers[i].color + ".png";
    markers[i].marker.setMap(null);
    markers[i].marker.setMap(map);
    markers[i].info.open(map, markers[i].marker);
    document.getElementById("sensor-address").innerHTML = markers[i].name;
    document.getElementById("aqhi").className =
      "parammenu-button " + markers[i].color;
    changeContent("aqhi");
    changeButtonColor();
    onPeriodClicked(1, "past_day");
  });
}
/******************************************************
 * Function for clearing all the marker on the map
 ******************************************************/
function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].marker.setMap(null);
  }
  markers = [];
}
/******************************************************
 * Function for changing button bottom line color when
 * clicking any pin on the map.
 ******************************************************/
function changeButtonColor() {
  var buttons = document.getElementsByClassName("parammenu-button");
  for (var i = 0; i < buttons.length; i++) {
    var threshold;
    eval("threshold = thresholdInfo[0]." + buttons[i].id);
    eval(
      "checkColor(pollutionJSON[pollutionJSON.length-1]." +
        buttons[i].id +
        ",buttons[i].id,threshold)"
    );
  }
}
function checkColor(value, id, threshold) {
  var button = document.getElementById(id);
  document.getElementById(id + "-unit").innerHTML = parseFloat(value).toFixed(
    1
  );
  console.log(id, " button enter with ", value);
  if (threshold.green.low <= value && value < threshold.green.high) {
    button.className = "parammenu-button green";
    console.log(id, " button to green");
  }
  if (threshold.lightgreen.low <= value && value < threshold.lightgreen.high) {
    button.className = "parammenu-button lightgreen";
    console.log(id, " button to lightgreen");
  }
  if (threshold.yellow.low <= value && value < threshold.yellow.high) {
    button.className = "parammenu-button yellow";
    console.log(id, " button to yellow");
  }
  if (threshold.orange.low <= value && value < threshold.oragne.high) {
    button.className = "parammenu-button orange";
    console.log(id, " button to orange");
  }
  if (threshold.red.low <= value) {
    button.className = "parammenu-button red";
    console.log(id, " button to red");
  }
  if (value == "null") {
    button.className = "parammenu-button grey";
    console.log(id, " button to grey");
  }
}
/******************************************************
 * Function for handling the error when the browser
 * cannot handle html5 geoloction request.
 ******************************************************/
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
/******************************************************
 * Function for handling the request when the browser
 * can do html5 geolocation. It will move the foucs of
 * the map to the location get by the browser.
 ******************************************************/

function getUserLocation() {
  infoWindow = new google.maps.InfoWindow();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        //infoWindow.setPosition(pos);
        //infoWindow.setContent('Your location');
        //infoWindow.open(map);
        map.setCenter(pos);
      },
      function() {
        //handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    //handleLocationError(false, infoWindow, map.getCenter());
    alert("Bowser doesn't not support locating your location");
  }
}

/******************************************************
 * Function for handling the map request
 ******************************************************/

//var googleEmbedMapUrl = "https://www.google.com/maps/embed/v1/place?key=";
var googleMapUrl = "https://maps.googleapis.com/maps/api/js?key=";
var mapUrl = "php/getID.php";
function getMapUrl() {
  var tag = document.createElement("script");
  postJSON(mapUrl, function(err, json) {
    if (err == null) {
      tag.src = googleMapUrl + json[0].jsMapKey + "&callback=initMap";
      document.getElementsByTagName("head")[0].appendChild(tag);
    } else console.log(err);
  });
}

/******************************************************
 * Function for handling the request when the browser
 * can do html5 geolocation. It will move the foucs of
 * the map to the location get by the browser.
 ******************************************************/
/*
function getUserLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            getJSON(mapUrl,function(err,json){
                document.getElementById("map").src = googleMapUrl + json[0].mapkey + "&q=" + position.coords.latitude + 
                                                        "," + position.coords.longitude;
            })
        });
    } else {
        // Browser doesn't support Geolocation
        console.log("We cannot get the location using Geolocation.")
    }
}*/
/******************************************************
 * Function for handling address submitted by the user
 ******************************************************/
var geocoder;
function getAddress() {
  geocoder = new google.maps.Geocoder();
  var address = document.querySelector('[name="address"]').value;
  geocoder.geocode({ address: address }, function(results, status) {
    if (status == "OK") {
      map.setCenter(results[0].geometry.location);
      /*
          var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
          });
          */
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}
/******************************************************
 * Function for testing fetching data directly from
 * database using php and sending the data in json
 *  fromat
 ******************************************************/

var testPHPUrl = "php/sql-test.php";
function phpFetching() {
  console.log("test sql php");
  postJSON(testPHPUrl, function(err, json) {
    if (err == null) {
      for (var i = 0; i < json.length; i++) console.log(json[i].reading);
    } else console.log(err);
  });
}
