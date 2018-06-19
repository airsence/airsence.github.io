/*********************************************
 * Function to intialize the content in the page
 *********************************************/
function onMainLoad(){
    addEnterToInput();
    onResize();
}
/******************************************************
 * Function for loading every feature to performing the
 * website. This function is called when google map 
 * finishes loading.
 ******************************************************/
//var infoURL = "php/getInfo.php";
//var infoURL = "api/v1/getinfo";
var infoURL = "http://www.signalfusion.com:9000/api/v1/getinfo";
var thresholdInfo,colorMap,unitArray;
//var unitArray = ['co','no2','no','aqhi','o3','pm2_5'];
//var colorMap = {red:"#D7191C",yellow:"#FFFF4D",lightgreen:"#91D049",green:"#1A9641",orange:"#FD9935"};
function loadingInfo(){
    //console.log("Enter loadingInfo");
    getJSON(infoURL,function(err,json){
        if(err == null){
            initMap(json[0].map_feature,json[0].mapCenter);
            getChartFeature(json[0].chart_feature);
            thresholdInfo = json[0].threshold;
            colorMap = json[0].colorMap;
            unitArray = json[0].unitArray;
            checkDays = json[0].checkDays;
            pastDue = json[0].pastDue;
            lastClick = json[0].lastClick;
            refreshTimeChart = json[0].refreshTimeChart;
            refreshTimeButton = json[0].refreshTimeButton;
            drawChart();
            autoRefreshChart();
            autoRefreshButton();
        }
        else console.error(err);
    });
}
/*********************************************
 * Function to set period button to disable
 *********************************************/
function disablePeriodButton(numOfButton) {
    try {
        var pastDay = document.getElementById("past_day");
        var pastWeek = document.getElementById("past_week");
        var past2Week = document.getElementById("past_2_weeks");
        switch (numOfButton) {
            case 1:
                past2Week.disabled = true;
                past2Week.className += " disabled";
                break;
            case 2:
                past2Week.disabled = true;
                past2Week.className += " disabled";
                pastWeek.disabled = true;
                pastWeek.className += " disabled";
                break;
            case 3:
                past2Week.disabled = true;
                past2Week.className += " disabled";
                pastWeek.disabled = true;
                pastWeek.className += " disabled";
                pastDay.disabled = true;
                pastDay.className += " disabled";
                break;
        }
    }
    catch (err) {
        console.error("ERROR:" + err + " when disabling period button");
    }
}
/*********************************************
 * Function to set period button back to normal
 *********************************************/
function enablePeriodButton(numOfButton){
    try{
        //console.log("enter enable with ",numOfButton);
        var pastDay = document.getElementById("past_day");
        var pastWeek = document.getElementById("past_week");
        var past2Week = document.getElementById("past_2_weeks");
        switch(numOfButton){
            case 1:
                pastDay.disabled = false;
                pastDay.className = pastDay.className.replace(/ disabled/g,"");
                break;
            case 2:
                pastDay.disabled = false;
                pastDay.className = pastDay.className.replace(/ disabled/g,"");
                pastWeek.disabled = false;
                pastWeek.className = pastWeek.className.replace(/ disabled/g,"");
                break;
            case 3:
                pastDay.disabled = false;
                pastDay.className = pastDay.className.replace(/ disabled/g,"");
                pastWeek.disabled = false;
                pastWeek.className = pastWeek.className.replace(/ disabled/g,"");
                past2Week.disabled = false;
                past2Week.className = past2Week.className.replace(/ disabled/g,"");
                break;
        }
    }
    catch(err){
        console.error("ERROR: " + err + "when enabling period button");
    }
}
/*********************************************
 * Function to change main showing data in the
 * parameter panel when click on the button.
 * Also will change the chart.
 *********************************************/
var lastClickPollution = "aqhi";
var enoughPoint = true;
function changeContent(buttonID){
    //console.log("enter changeContent with",var1);
    /*
        Get all the element that need to be change when
        a pollution button is clicked.
    */
    lastClickPollution = buttonID;
    //console.log("lastClickPollution in changeContent",lastClickPollution);                                  //store the last clicked pollution for later period button click
    var paramname = document.getElementById("paramname");       //pollution name shown in the circle
    var unit = document.getElementById("unit");                  //pollution unit shown in the circle
    var legend = document.getElementById("legend");             //pollution name shown in the chart
    var legendUnit = document.getElementById("legend-unit");    //pollution unit shown in the chart
    var circle = document.getElementById("circle");             //circle color
    circle.className = "circle";
    var selectedButton = document.getElementById(buttonID);                         //pollution button selected now
    var paramButtons = document.getElementsByClassName("parammenu-button");     //array of all pollution button
    var infoBlocks = document.getElementsByClassName("information-section");    //array of all information block below chart 
    var infoBlock = document.getElementById(buttonID+"-info");                      //the seleted pollution information block
    closeAllInfoBlock();
    enablePeriodButton(3);
    clickHereClicked = false;
    for(var i = 0; i < paramButtons.length; i++){
        paramButtons[i].className = paramButtons[i].className.replace(" active","");
        infoBlocks[i].className = infoBlocks[i].className.replace(" active","");
    }
    circle.className += (" " + selectedButton.className.split(" ")[1]);
    //Change the value and color for the circle
    try{
        if (singleSensorJSON != null ) {
            var unitNum = singleSensorJSON[0][buttonID];
            if (buttonID == "aqhi") {
                unit.innerHTML = unitNum != null && unitNum != "NULL" ?parseInt(unitNum) :  "--";
            }
            else {
                unit.innerHTML = unitNum > 0 && unitNum != null && unitNum != "NULL"? unitNum.toFixed(1) : "--";
            }
            //enoughPoint flag is to check whether there are enough points for updating the chart
            enoughPoint = checkNullPoint(buttonID); 
            updateChart(buttonID);
        }
    }
    catch(exception){
        console.error("changeContent Exception:",exception);
    }
    //change the name and unit in the circle accrodingly
    switch(buttonID)
    {   
        case "pm2_5":
        paramname.innerHTML="PM<sub>2.5</sub>";
        legend.innerHTML="PM<sub>2.5</sub>";
        legendUnit.innerHTML="μg/m<sup>3</sup>";
        break;
        case "no2":
        paramname.innerHTML="NO<sub>2</sub>";
        legend.innerHTML="NO<sub>2</sub>";
        legendUnit.innerHTML="ppb<sup>&nbsp;</sup>";
        break;
        case "no":
        paramname.innerHTML="NO<sub> </sub>";
        legend.innerHTML="NO<sub> </sub>";
        legendUnit.innerHTML="ppb<sup>&nbsp;</sup>";
        break;
        case "co":
        paramname.innerHTML="CO<sub> </sub>";
        legend.innerHTML="CO<sub> </sub>";
        legendUnit.innerHTML="ppb<sup>&nbsp;</sup>";
        break;
        case "o3":
        paramname.innerHTML="O<sub>3</sub>";
        legend.innerHTML="O<sub>3</sub>";
        legendUnit.innerHTML="ppb<sup>&nbsp;</sup>";
        break;
        case "aqhi":
        paramname.innerHTML="AQHI<sub> </sub>";
        legend.innerHTML="AQHI<sub> </sub>";
        legendUnit.innerHTML="&nbsp;<sup>&nbsp;</sup>";
        break;
        case "so2":
        paramname.innerHTML="SO<sub>2</sub>";
        legend.innerHTML="SO<sub>2</sub>";
        legendUnit.innerHTML="ppb<sup>&nbsp;</sup>";
        break;
        case "co2":
        paramname.innerHTML="CO<sub>2</sub>";
        legend.innerHTML="CO<sub>2</sub>";
        legendUnit.innerHTML="ppm<sup>&nbsp;</sup>";
        break;
    }
    //Set selected button to active and show the infoBlock of selected pollutant
    selectedButton.className += " active";
    infoBlock.className += " active";
}
/*********************************************
 * Function to add Enter for searhing to the 
 * address search button
 *********************************************/
function addEnterToInput(){
    var text = document.getElementById("address");
    text.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("search-button").click();
        }
    });
}
/*********************************************
 * Function to auto refresh chart value every
 * several time
 *********************************************/
var refreshTimeChart;
var isAutoRefreshChart = false;
function autoRefreshChart(){
    window.setInterval(function(){
        for (var i = 0; i < markers.length; i++) {
            if (markers[i].deviceID == lastClick) {
                isAutoRefreshChart = true;
                google.maps.event.trigger(markers[i].marker, 'click');
                break;  
            }
        }
    },refreshTimeChart);
}
/*********************************************
 * Function to auto refresh button value every
 * several time
 *********************************************/
var refreshTimeButton;
//var isAutoRefreshButton = false;
//var getLatestURL = "api/v1/getlatest";
var getLatestURL = "http://www.signalfusion.com:9000/api/v1/getlatest";
function autoRefreshButton(){
    window.setInterval(function(){
        for (var i = 0; i < markers.length; i++) {
            if (markers[i].deviceID == lastClick) {
                //isAutoRefreshButton = true;
                var loadingOverlay = document.getElementById("loading");
                loadingOverlay.className += " active";
                var message = encodeURI("device_id=" + lastClick)
                try{
                    postJSON(getLatestURL,function(err,json){
                        if(err == null){
                            if(json != null && json.length > 0)
                            markers[i].pollutant_data = json[0]['pollutant_data'];
                            markers[i].updateTime = json[0]['timestamp'];
                            changeButtonColor(markers[i]);
                            changeTime(markers[i].updateTime);
                        }
                        else{
                            console.error("ERROR: " + err + "when auto refresh button value");
                        }
                        loadingOverlay.className = loadingOverlay.className.replace(" active","");
                    },message)
                }
                catch(err){
                    console.error("ERROR:" + err + "when refresh button pollutant value");
                    loadingOverlay.className = loadingOverlay.className.replace(" active","");
                }
                break;  
            }
        }
    },refreshTimeButton);
}
/*********************************************
 * Function to show the menu when menu button
 * clicked
 *********************************************/
var menuClicked = false;
function onMenuClick(){
    //console.log("enter onMenuClick");
    var menu = document.getElementById("navbar-collapse");
    if(!menuClicked){
        menu.className += " active";
        menuClicked = true;
    }else{
        menu.className = menu.className.replace(" active","");
        menuClicked = false;
    }
}
/*********************************************
 * Function to show the detail information of 
 * the chosen pollution, about and how to use
 *********************************************/
var clickHereClicked = false;
function onClickHere(id){
    closeAllInfoBlock();
    var info = document.getElementById(id+"detail");
    info.className += " active";
}
/*********************************************
 * Function to close all the detail information 
 * block
 *********************************************/
function closeAllInfoBlock(){
    var infoBlocks = document.getElementsByClassName("detail-info");
    for(var i = 0; i < infoBlocks.length; i++){
        infoBlocks[i].className = infoBlocks[i].className.replace(" active","");
    }
}
/*********************************************
 * Function to change the time in the
 * parameter form. The time comes from DB showing 
 * the latest update in DB.
 *********************************************/
function changeTime(updateTime){
    try{
        var time = document.getElementById("time");
        var date = moment(updateTime).format("MMM DD, HH:mm");
        time.innerHTML = "Last Updated:" + date;
    }
    catch(exception){
        console.error("changeTime Exception:",exception);
    }
}
/*********************************************
 * Function to check whether the data for the 
 * sensor is fresh enough to show.
 *********************************************/
var pastDue;
function checkTime(timestamp) {
    var date = new Date(timestamp);
    var now = new Date();
    var different = (now.getTime() - date.getTime()) / (1000*60*60);
    if(different > pastDue) 
        return false;
    else
        return true;
}

/*****************************************
 * Function for get or post json file 
 * from server.
 *****************************************/
function getJSON(url, callback){
    var xhr;
    if (window.XMLHttpRequest){
        xhr= new XMLHttpRequest();
    }
    else{
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
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

function postJSON(url, callback,message=null){
    var xhr;
    if (window.XMLHttpRequest){
        xhr= new XMLHttpRequest();
    }
    else{
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.responseType = 'json';
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

function postDB(url, callback,message=null){
    var xhr;
    if (window.XMLHttpRequest){
        xhr= new XMLHttpRequest();
    }
    else{
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //xhr.responseType = 'json';
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


/***********************************************
 * For changing period time to show different
 * time period in the chart
 ***********************************************/
var numPoint = 49;
var gap = 6;
function onPeriodClicked(time,id){
    //console.log("enter onPeriodClicked");
    var clickedButton = document.getElementById(id);
    var periodButtons = document.getElementsByClassName("period_button");
    for(var i = 0; i < periodButtons.length; i++){
        periodButtons[i].className = periodButtons[i].className.replace(" active","");
    }
    clickedButton.className += " active";
    if(time == 1){
        numPoint = 49;
        gap = 6;
    }else{
        numPoint = time*24+1;
        gap = time*3;
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
 * Draw the chart under the parameter form
 ***********************************************/
var myChart;
var pollutantJSON = [];
var o3_yAxes,no2_yAxes,no_yAxes,aqhi_yAxes,pm2_5_yAxes,co_yAxes,largeFont,smallFont;
/***********************************************
 * Get chart feature from json
 ***********************************************/
function getChartFeature(json) {
    //console.log("enter getChartFeature");
    largeFont = json.largeFont;
    smallFont = json.smallFont;
    o3_yAxes = json.o3_yAxes;
    no2_yAxes = json.no2_yAxes;
    no_yAxes = json.no_yAxes;
    aqhi_yAxes = json.aqhi_yAxes;
    pm2_5_yAxes = json.pm2_5_yAxes;
    co_yAxes = json.co_yAxes;
    so2_yAxes = json.so2_yAxes;
    co2_yAxes = json.co2_yAxes;
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
}
/***********************************************
 * The actual function for rendering the chart
 ***********************************************/
function drawChart() {
    //console.log("Enter drawChart");
    var ctx = document.getElementById("myChart").getContext('2d');
    var gradient = ctx.createLinearGradient(0, 20, 0, 300);                    //gradient background shown in the chart
    gradient.addColorStop(0.1, colorMap.red);
    gradient.addColorStop(0.3, colorMap.orange);
    gradient.addColorStop(0.5, colorMap.yellow);
    gradient.addColorStop(0.7, colorMap.lightgreen);
    gradient.addColorStop(0.9, colorMap.green);
    var date = [];
    var value = [];
    try{
        /*
        for (var i = 0 ; i < numPoint; i++) {
            date.push(pollutantJSON[i].timestamp);
            value.push(pollutantJSON[i].aqhi);
        }
        */
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: date,
                datasets: [{
                    data: value,
                    backgroundColor: gradient,
                    borderColor: "#54a4db"
                }]
            },
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                scales: {
                    yAxes: [aqhi_yAxes],
                    xAxes: [largeFont]
                },
                elements: {
                    line: {
                        tension: 0.1
                    }
                },
            }
        });
    }
    catch(exception){
        console.error("drawChart Exception:",exception);
    }
}
/*********************************************
 * Function to close pop out menu and change
 * the position of navbar button and logo
 * It also change the font size of the xAxes
 * of the chart
 *********************************************/
var chartFontSize = 14;
function onResize(){
    if(menuClicked){
        var menu = document.getElementById("navbar-collapse");
        menu.className = menu.className.replace(" active","");
        menuClicked = false;
    }
    if((window.innerWidth < 1224 && window.innerWidth > 850) || window.innerWidth < 480){
        if(chartFontSize != 12){
            myChart.options.scales.xAxes[0] = smallFont;
            chartFontSize = 12;
            myChart.update(); 
            //console.log('change to small font for chart');           
        }
    }else{
        if(chartFontSize != 14){
            myChart.options.scales.xAxes[0] = largeFont;
            chartFontSize = 14;
            myChart.update();            
            //console.log('change to large font for chart');           
        }
    }
}
/******************************************************
 * Function for checking whether the pollutant have 
 * enough value to shwo on the chart. If there is not 
 * enough value to show, it will disable period button
 ******************************************************/
function checkNullPoint(pollutant){
    try{
        if(pollutantJSON != null){
            valueNum = 0;
            for(var i = 0; i < pollutantJSON.length; i++){
                if(pollutantJSON[i][pollutant] != null && pollutantJSON[i][pollutant] != "NULL")
                    valueNum += 1
            }
            //console.log("valueNum:",valueNum);
            if(valueNum < 49){
                disablePeriodButton(3);
                return false
            }
            else if(valueNum < 336){
                disablePeriodButton(2);
                return true
            }
            else if(valueNum < 672){
                disablePeriodButton(1);
                return true
            } 
        }
    }
    catch(err){
        console.error("ERROR: " + err + " when checkNullPoint");
    }
}
/******************************************************
 * Function for updating the chart when click on the 
 * period choice or pollution button
 ******************************************************/

function updateChart(pollutant){
    //console.log("enter updateChart with " + pollutant);
    var date = [];
    var value = [];
    var multiple = (numPoint == 49 ? 1:2);
    try{
        if(pollutantJSON != null && pollutantJSON.length > 0 && enoughPoint){
            for(var i = 0; i < numPoint; i++){
                //console.log("json length:",pollutantJSON.length);
                date.push(pollutantJSON[i*multiple].timestamp);
                value.push(pollutantJSON[i*multiple][pollutant]);
            }
            eval("myChart.options.scales.yAxes[0] = " + pollutant + "_yAxes");  //Ajust yAxes according to the pollutant
        }
        else{
            console.error("No data can be used for updating the chart");
        }
        myChart.data.labels = date;
        myChart.data.datasets[0].data = value;
        myChart.update();
    }
    catch(exception){
        console.error("updateChart Exception:",exception);
    }
    
}

/******************************************************
 * Function for initialize Google Map. The center is 
 * set at A.U.G. It will test whether the browser support
 * html5 geolocation and locate the user position.
 ******************************************************/
var map,infoWindow;
var sensorInfoJSON;
var markers = [];
var lastClick;
var boundLock = false;
function initMap(mapFeature,mapCenter) {
    try {
        //console.log("enter initMap");
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: mapCenter,
            styles: mapFeature
        });
        /*
            Add Listener to the map. When the bound change, 
            it will be called every 4s to renew the marker 
            on the map
        */
        map.addListener('bounds_changed', function () {
            if (!boundLock) {
                boundLock = true;
                //clearMarkers();
                initMarker();
                window.setTimeout(function () {
                    boundLock = false;
                }, 4000);
            }
        });
    }
    catch(err){
        window.alert("We have ERROR:" + err + " when we try to initialize Google Map. Please refresh the page and try again.")
    }
    
}

/******************************************************
 * Function for getting sensor location information
 * and put marker on the map
 ******************************************************/
var sensorUrl = "http://www.signalfusion.com:9000/api/v1/getlocation";
//var sensorUrl = "api/v1/getlocation";
//var sensorUrl = "php/getSensorLocationWithPollutant.php";
var bounds,lng1,lng2,lat1,lat2;
function initMarker(){
    //console.log("Enter initMarker");
    bounds = map.getBounds();
    lat1 = bounds.f.b;
    lat2 = bounds.f.f;
    lng1 = bounds.b.b;
    lng2 = bounds.b.f;
    var boundsMessage = encodeURI('lng1=' + lng1 + '&lng2=' + lng2 + '&lat1=' + lat1 + '&lat2=' + lat2);
    postJSON(sensorUrl,function(err,json){
        if(err == null){
            sensorInfoJSON = json;
            drop(); 
        }
        else console.error(err);
    },boundsMessage);
}   
/******************************************************
 * Function for dropping marker on the map.
 ******************************************************/
var firstDrop = true;
function drop() {
    //clearMarkers();
    //console.log("enter drop");
    try{
        for (var i = 0; i < sensorInfoJSON.length; i++) {
            addMarker(sensorInfoJSON[i]);
        }
        //After drop the marker, send a 'click' trigger to the last clicked marker
        if(firstDrop){
            for (var i = 0; i < markers.length; i++) {
                if (markers[i].deviceID == lastClick) {
                    google.maps.event.trigger(markers[i].marker, 'click');
                    break;
                }
            }
            firstDrop = false;
        }
    }
    catch(err){
        window.alert("We have ERROR:" + err + " when we try to get sensor information on the map. Please refresh and try again.")
    }
}

/******************************************************
 * Function that return the color for the sensor pin 
 * according to the aqhi value
 ******************************************************/
function checkAQHI(aqhi) {
    if(0 < aqhi && aqhi <= 2) return "green";
    else if(2 < aqhi && aqhi <= 4) return "lightgreen";
    else if(4 < aqhi && aqhi <= 6) return "yellow";
    else if(6 < aqhi && aqhi <= 8) return "orange";
    else if(8 < aqhi) return "red";
    else return "grey";
}

/******************************************************
 * Function for adding marker to the markers array
 ******************************************************/
//var pollutantURL = "php/getPollutantDataDB.php";
//var pollutantURL = "api/v1/getpollutant";
var pollutantURL = "http://www.signalfusion.com:9000/api/v1/getpollutant";
var checkDays;
var sensorIDArray = [];
function addMarker(sensorInfo) {
    //console.log("enter addMarker");
    /*
        Here we construct a new marker object. In a marker object, 
        we store the location name of the sensor, the  google marker 
        object, the color of the pin on the map, and then sensor ID.
        Also contain the the google information object that will show
        when client click on the pin on the map
    */
    if (sensorIDArray.indexOf(sensorInfo.sensor_info.device_id) == -1) {
        var sensorColor;
        if(checkTime(sensorInfo.timestamp))
            sensorColor = checkAQHI(parseInt(sensorInfo.sensor_info.aqhi));
        else
            sensorColor = "grey";
        var iconPath = 'images/' + sensorColor + '.png';
        var pinPath = 'images/pin_' + sensorColor + '.png';
        sensorIDArray.push(sensorInfo.sensor_info.device_id);
        var newMarker = {
            name: sensorInfo.sensor_info.station_name,
            marker: new google.maps.Marker({
                position: { lat: sensorInfo.sensor_info.lat, lng: sensorInfo.sensor_info.lng },
                map: map,
                animation: google.maps.Animation.DROP,
                icon: iconPath
            }),
            color: sensorColor,
            deviceID: sensorInfo.sensor_info.device_id,
            info: new google.maps.InfoWindow({
                content: sensorInfo.sensor_info.station_name
            }),
            aqhi: sensorInfo.pollutant_data.aqhi,
            pollutant_data:sensorInfo.pollutant_data,
            updateTime: sensorInfo.timestamp
        };
        /*
         Here we add marker onclick listener to google marker object 
         (Not the marker object we make ourselves).This onclick function 
         will first close the information that shown on the map according 
         to the which pin is last clicked. Then it will show the information 
         of the clicked pin for this time. It will also change the data panel 
         to shown the AQHI data of the place that clicked and change other 
         information in the data panel accordingly. 
        */
        newMarker.marker.addListener('click', function () {
            //Finding the lastclick pin and change its icon back to circle
            for (var i = 0; i < markers.length; i++) {
                if (markers[i].deviceID == lastClick) {
                    markers[i].marker.icon = "images/" + markers[i].color + ".png";
                    markers[i].marker.setMap(null);
                    markers[i].marker.setMap(map);
                    markers[i].info.setMap(null);
                    break;
                }
            }
            lastClick = newMarker.deviceID;
            //Change the number of point and gap for the chart back to one day style
            numPoint = 49;
            gap = 6;
            //Make the icon of the sensor clicked this time to pin 
            newMarker.marker.icon = 'images/pin_' + newMarker.color + '.png';
            newMarker.marker.setMap(null);
            newMarker.marker.setMap(map);
            newMarker.info.open(map, newMarker.marker);
            document.getElementById("sensor-address").innerHTML = newMarker.name;
            var messagePollutant = encodeURI("device_id=" + lastClick + "&days=" + checkDays + "&interval_minutes=30");
            //console.log("message",messagePollutant);
            /*
              While loading data from DB, an overlay will 
              come out and show a loading circle until the 
              loading finishes.
            */
            var loadingOverlay = document.getElementById("loading");
            loadingOverlay.className += " active";
            postJSON(pollutantURL,function(err,json){
                if(err == null){
                    pollutantJSON = json;
                    //console.log(json);
                    if(pollutantJSON != null && pollutantJSON.length > 0){
                        //changepollutantJSON(newMarker);
                        //console.log("Pollutant Json:",json);
                        changeButtonColor(newMarker);
                        changeTime(newMarker.updateTime);
                    } 
                    else nullPollutantJSON();
                    if(isAutoRefreshChart){
                        changeContent(lastClickPollution);
                        isAutoRefreshChart = false;
                    }
                    else{
                        changeContent("aqhi");
                        onPeriodClicked(1, "past_day");    
                    }
                    document.getElementById("article-left").className = "left";
                }
                else{
                    console.error(err);
                    disablePeriodButton(3);
                    loadingOverlay.className = "loading-overlay";
                    document.getElementById("article-left").className = "left";
                }
            },messagePollutant);
        });
        /*
            We push the new marker object into a array
        */
        markers.push(newMarker);
    }
}
/******************************************************
 * Function for clearing all the marker on the map
 ******************************************************/
function clearMarkers() {
    //console.log("Enter clearMarkers");
    for (var i = 0; i < markers.length; i++) {
      markers[i].marker.setMap(null);
    }
    markers = [];
    sensorIDArray = [];
  }
/******************************************************
 * Function for changing button bottom line color when 
 * clicking any pin on the map. Also change the pollutant
 * level number in the button and temperature and humidity
 ******************************************************/
var singleSensorJSON = [];
function changeButtonColor(newMarker){
    try{    
        //console.log("Enter changeButtonColor")
        var buttons = document.getElementsByClassName("parammenu-button");
        
        singleSensorJSON = [newMarker.pollutant_data];
        
        for(var i = 0; i < buttons.length; i++){
            var threshold = thresholdInfo[buttons[i].id];
            var value = singleSensorJSON[0][buttons[i].id];
            checkColor(value,buttons[i].id,threshold);
        };
        var temperature = document.getElementById("temperature");
        var humidity = document.getElementById("humidity");
        if(singleSensorJSON[0]['temperature'] != null && singleSensorJSON[0]['temperature'] != "NULL")
            temperature.innerHTML = parseFloat(singleSensorJSON[0]['temperature']).toFixed(1) + "&deg;C";
        else
            temperature.innerHTML = "--" + "&deg;C";;
        if(singleSensorJSON[0]['humidity'] != null && singleSensorJSON[0]['humidity'] != "NULL")
            humidity.innerHTML = parseFloat(singleSensorJSON[0]['humidity']).toFixed(1) + "%";
        else
            humidity.innerHTML = "--" + "%";
        changeContent(lastClickPollution);
        document.getElementById("loading").className = "loading-overlay";
    }
    catch(err){
        console.error(err)
    }
    
}
function checkColor(value,id,threshold){
    try{
        var button = document.getElementById(id);
        if(id == 'aqhi'){
            document.getElementById(id+"-unit").innerHTML = value != null && value != "null" ?parseInt(value) : "--";
        }
        else{
            document.getElementById(id+"-unit").innerHTML = value > 0 && value != null && value != "null"? parseFloat(value).toFixed(1) : "--";
        }
        //console.log(id,' button enter with ',value);
        if(value < threshold.green.high){
            button.className = "parammenu-button green";
            //console.log(id," button to green");
        } 
        if(threshold.lightgreen.low <= value && value < threshold.lightgreen.high){
            button.className = "parammenu-button lightgreen";
            //console.log(id," button to lightgreen");        
        }
        if(threshold.yellow.low <= value && value < threshold.yellow.high){
            button.className = "parammenu-button yellow";
            //console.log(id," button to yellow");        
        }
        if(threshold.orange.low <= value && value < threshold.orange.high){
            button.className = "parammenu-button orange";
            //console.log(id," button to orange");        
        }
        if(threshold.red.low <= value){
            button.className = "parammenu-button red";
            //console.log(id," button to red");        
        }
        if(value == "null" || value == null || value == "NULL"){
            button.className = "parammenu-button grey";
            //console.log(id," button to grey");
        }
    }
    catch(err){
        console.error(err);
    }

}
/******************************************************
 * Function for handling the error when the browser
 * cannot handle html5 geoloction request.
 ******************************************************/
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    try{
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }
    catch(err){
        console.error(err);
    }

}
/******************************************************
 * Function for handling the request when the browser 
 * can do html5 geolocation. It will move the foucs of 
 * the map to the location get by the browser.
 ******************************************************/

function getUserLocation() {
    try {
        infoWindow = new google.maps.InfoWindow;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                //infoWindow.setPosition(pos);
                //infoWindow.setContent('Your location');
                //infoWindow.open(map);
                map.setCenter(pos);
            }, function () {
                //handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            //handleLocationError(false, infoWindow, map.getCenter());
            alert("Bowser doesn't not support locating your location");
        }
    }
    catch(err){
        console.error(err);
    }
    
}

/******************************************************
 * Function for handling address submitted by the user
 ******************************************************/
var geocoder;
function getAddress(){
    try{
        geocoder = new google.maps.Geocoder();
        var address = document.querySelector('[name="address"]').value;
        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == 'OK') {
              map.setCenter(results[0].geometry.location);
              /*
              var marker = new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location
              });
              */
            } else {
              alert('Geocode was not successful for the following reason: ' + status);
            }
          });
    }
    catch(err){
        console.error(err);
    }
  
}

/******************************************************
 * Function dealing with the sitution when there is no
 * data for the sensor can be loaded.
 ******************************************************/

function nullPollutantJSON(){
    try{
        singleSensorJSON = null;
        pollutantJSON = null;
        document.getElementById("time").innerHTML = "No Data Available";
        document.getElementById("unit").innerHTML = "--";   
        document.getElementById("temperature").innerHTML = "--" + "&deg;C";
        document.getElementById("humidity").innerHTML = "--" + "%";
        document.getElementById("circle").className = "circle grey";
        disablePeriodButton(3);
        if(myChart != null){
            myChart.data.labels= [];
            myChart.data.datasets[0].data=[];
            myChart.update();
        }
        for (var i = 0; i < unitArray.length; i++){
            var unitNum = document.getElementById(unitArray[i]+"-unit");
            unitNum.innerHTML = "--";
            var buttonColor = document.getElementById(unitArray[i]);
            buttonColor.className = "parammenu-button grey";
        }
        document.getElementById("loading").className = "loading-overlay";
        document.getElementById("article-left").className = "left";
        window.alert("Sorry, we have some problem to get data from this sensor. Please try another one.");
    }
    catch(err){
        console.error("ERROR: " + err + " when nullPollutantJSON");
    }
}

function notLatestSensor(){
    try{
        document.getElementById("time").innerHTML = "Data is out of date";
        document.getElementById("unit").innerHTML = "--";   
        document.getElementById("temperature").innerHTML = "--" + "&deg;C";
        document.getElementById("humidity").innerHTML = "--" + "%";
        document.getElementById("circle").className = "circle grey";
        for (var i = 0; i < unitArray.length; i++){
            var unitNum = document.getElementById(unitArray[i]+"-unit");
            unitNum.innerHTML = "--";
            var buttonColor = document.getElementById(unitArray[i]);
            buttonColor.className = "parammenu-button grey";
        }
        document.getElementById("loading").className = "loading-overlay";
        document.getElementById("article-left").className = "left";
        window.alert("Sorry. Latest data is not available for this sensor");
    }
    catch(err){
        console.error("ERROR: " + err + " when notLatestSensor");
    }
}