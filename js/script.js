"use strict";
/*********************************************
 * Function to intialize the content in the page
 * @param {string} page Parameter indicate the
 * which page is calling this function
 *********************************************/
function onMainLoad(page) {
  //addEnterToInput();
  pageType = page;
  switch (pageType) {
    case "portal":
      // GET_LATEST_URL = "https://api.airsence.com:9001/getlatestlogin";
      // SENSOR_URL = "https://api.airsence.com:9001/getlocationlogin";
      // POLLUTANT_URL = "https://api.airsence.com:9001/getpollutantlogin";
      GET_LATEST_URL = "https://signalfusion.com:9000/api/v1.3/getlatestlogin";
      SENSOR_URL = "https://signalfusion.com:9000/api/v1.3/getlocationlogin";
      POLLUTANT_URL =
        "https://signalfusion.com:9000/api/v1.3/getpollutantlogin";
      try {
        user_api_key = window.sessionStorage.getItem("api_key");

        if (user_api_key === null) {
          location.href = "/login";
        }

        let user_device_list = window.sessionStorage.getItem("device_id");
        if (user_device_list !== null) {
          user_device_id = user_device_list.split(",").map(Number);
        }
        //console.log("user_api_key: " + user_api_key + "\nuser_device_id: " +user_device_id);
      } catch (err) {
        window.alert(
          "We have some issues when loading some configuration:" + err
        );
      }
      break;
    case "main":
      GET_LATEST_URL = "https://signalfusion.com:9000/api/v1.3/getlatest";
      SENSOR_URL = "https://signalfusion.com:9000/api/v1.3/getlocation";
      POLLUTANT_URL = "https://signalfusion.com:9000/api/v1.3/getpollutant";
      break;
    default:
      GET_LATEST_URL = "https://signalfusion.com:9000/api/v1.3/getlatest";
      SENSOR_URL = "https://signalfusion.com:9000/api/v1.3/getlocation";
      POLLUTANT_URL = "https://signalfusion.com:9000/api/v1.3/getpollutant";
  }
  loadingInfo(pageType);
  onResize();
}
let GET_LATEST_URL, SENSOR_URL, POLLUTANT_URL;
let pageType;
let user_api_key, user_device_id;
// const LOGOUT_URL = "https://api.airsence.com:9001/logout";
// const LOGIN_URL = "https://api.airsence.com:9001/login";
// const UPDATE_URL = "https://api.airsence.com:9001/updateprofile";
// const PROFILE_URL = "https://api.airsence.com:9001/getprofile";
// const POLLUTANT_LIST_URL = "https://api.airsence.com:9001/getpollutantlogin";
// const POLLUTANT_LIST_CSV_URL =
//   "https://api.airsence.com:9001/getpollutantlistcsvlogin";

const LOGOUT_URL = "https://signalfusion.com:9000/api/v1.3/logout";
const LOGIN_URL = "https://signalfusion.com:9000/api/v1.3/login";
const UPDATE_URL = "https://signalfusion.com:9000/api/v1.3/updateprofile";
const PROFILE_URL = "https://signalfusion.com:9000/api/v1.3/getprofile";
const POLLUTANT_LIST_URL =
  "https://signalfusion.com:9000/api/v1.3/getpollutantlogin";
const POLLUTANT_LIST_CSV_URL =
  "https://signalfusion.com:9000/api/v1.3/getpollutantlistcsvlogin";
const SAMPLE_INTERVAL = 30;
/*********************************************
 * URL for access database
 *********************************************/

/*******************For website hosted on GitHub*****************************/
// const INFO_URL = "http://api.airsence.com:9000/getinfo";
// const GET_LATEST_URL = "http://api.airsence.com:9000/getlatestlogin";
// const SENSOR_URL = "http://api.airsence.com:9000/getlocationlogin";
// const POLLUTANT_URL = "http://api.airsence.com:9000/getpollutantlogin";
// const LOGOUT_URL = "http://api.airsence.com:9000/logout";
// const LOGIN_URL = "http://api.airsence.com:9000/login";
/****************************************************************************/

/*******************For website hosted inside AUG***************************/
//const INFO_URL = "api/v1.3/getinfo";
//const GET_LATEST_URL = "api/v1.3/getlatest";
//const SENSOR_URL = "api/v1.3/getlocation";
//const POLLUTANT_URL = "api/v1.3/getpollutant";
/***************************************************************************/

/***********For website hosted inside AUG*******************/
// const INFO_URL = "http://localhost:5000/getinfo";
// const GET_LATEST_URL = "http://localhost:5000/getlatestlogin";
// const SENSOR_URL = "http://localhost:5000/getlocationlogin";
// const POLLUTANT_URL = "http://localhost:5000/getpollutantlogin";
// const LOGOUT_URL = "http://localhost:5000/logout";
// const LOGIN_URL = "http://localhost:5000/login";
/***************************************************************************/
/******************************************************
 * Check cookie to verify whether this user is first time
 * to the website.
 ******************************************************/
function checkCookie() {
  try {
    setUpGuide();
    let ExpiresTime = getCookie("ExpiresTime");
    if (ExpiresTime == "") {
      let nowTime = new Date();
      let expireTime = moment(nowTime.getTime() + COOKIE_EXPIRE).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      document.cookie =
        "ExpiresTime=" + expireTime + ";Expires=" + expireTime + ";path=/";
      // console.log("don't have cookie,", document.cookie);
      startGuide();
    } else {
      let expireTime = new Date(ExpiresTime);
      let nowTime = new Date();
      if (nowTime.getTime() - expireTime.getTime() > 0) {
        let et = moment(nowTime.getTime() + COOKIE_EXPIRE).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        document.cookie = "ExpiresTime=" + et + ";Expires=" + et + ";path=/";
        // console.log("have cookie,", document.cookie);
        startGuide();
      } else {
        // console.log("don't need guide", document.cookie);
      }
    }
  } catch (err) {
    console.error("ERROR when checkCookie: " + err);
  }
}
const COOKIE_EXPIRE = 1000 * 60 * 60 * 24 * 365;
/******************************************************
 * Function for getting speical proprety in the cookie.
 * @param {string} cname Parameter of cookie field
 * @returns {string} Cookie field value
 ******************************************************/
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
/******************************************************
 * Setup user guide for user who first use this website
 ******************************************************/
function setUpGuide() {
  try {
    tour = new Tour({
      //debug:true,
      onStart: function(tour) {
        document.getElementById("guide-overlay").classList.add("active");
      },
      onEnd: function(tour) {
        document.getElementById("guide-overlay").classList.remove("active");
      }
    });
    for (let i = 0; i < guideStep.length; i++) {
      if (guideStep[i].element != "map") {
        tour.addStep({
          element: "#" + guideStep[i].element,
          title: guideStep[i].title,
          content: guideStep[i].content,
          onShown: function(tour) {
            let block = document.getElementById(guideStep[i].element);
            block.classList.add("high-light");
          },
          onHidden: function(tour) {
            let block = document.getElementById(guideStep[i].element);
            block.classList.remove("high-light");
          }
        });
      } else {
        tour.addStep({
          element: "#" + guideStep[i].element,
          title: guideStep[i].title,
          content: guideStep[i].content,
          placement: "left",
          onShown: function(tour) {
            let block = document.getElementById(guideStep[i].element);
            block.classList.add("high-light");
          },
          onHidden: function(tour) {
            let block = document.getElementById(guideStep[i].element);
            block.classList.remove("high-light");
          }
        });
      }
      tour.init();
    }
  } catch (exception) {
    console.error("ERROR when setup guide:" + exception);
    document.getElementById("guide-overlay").classList.remove("active");
  }
}
/******************************************************
 * Function for startring the guide tour
 ******************************************************/
function startGuide() {
  let overlay = document.getElementById("guide-overlay");
  try {
    if (!tour.ended()) tour.start();
    else tour.restart();
    //tour.restart();
  } catch (exception) {
    console.error("ERROR when start guide: " + exception);
    overlay.classList.remove("active");
  }
}
let tour;
/******************************************************
 * Restart guide when client click on "User Guide"
 ******************************************************/
function restartGuide() {
  tour.restart();
}
/******************************************************
 * Function for loading every feature to performing the
 * website. This function is called when google map
 * finishes loading.
 * @param {string} pageType Parameter indicate the
 * which page is calling this function
 ******************************************************/

function loadingInfo(pageType) {
  //console.log("Enter loadingInfo");
  // postJSON(
  //   INFO_URL,
  //   function (err, json) {
  //     if (err == null) {
  //       initMap(json[0].map_feature, json[0].mapCenter);
  //       getChartFeature(json[0].chart_feature);
  //       thresholdInfo = json[0].threshold;
  //       colorMap = json[0].colorMap;
  //       unitArray = json[0].unitArray;
  //       checkDays = json[0].checkDays;
  //       pastDue = json[0].pastDue;
  //       lastClick = json[0].lastClick;
  //       refreshTimeChart = json[0].refreshTimeChart;
  //       refreshTimeButton = json[0].refreshTimeButton;
  //       //refreshTimeChart = 20 * 1000;
  //       //refreshTimeBJSON 1000;
  //       guideStep = jsJSONstep;
  //       drawChart();
  //       autoRefreshChaJSON
  //       autoRefreshButJSON
  //       setGeocoder();JSON
  //     } else {
  //       console.error("ERROR when loadingInfo: " + err);
  //       window.alert(
  //         "We have ERROR when we try to initial the web page. Please refresh and try again."
  //       );
  //     }
  //   },
  //   encodeURI("id=" + UID)
  // );

  let json = infoJSON;
  initMap(json[0].map_feature, json[0].mapCenter);
  getChartFeature(json[0].chart_feature);
  thresholdInfo = json[0].threshold;
  colorMap = json[0].colorMap;
  unitArray = json[0].unitArray;
  checkDays = json[0].checkDays;
  pastDue = json[0].pastDue;
  lastClick = json[0].lastClick;
  refreshTimeChart = json[0].refreshTimeChart;
  refreshTimeButton = json[0].refreshTimeButton;
  unitConversion = json[0].unitConversion;
  //refreshTimeChart = 20 * 1000;
  //refreshTimeButton = 30 * 1000;
  guideStep = json[0].guide_step;
  drawChart();
  autoRefreshChart();
  autoRefreshButton();
  if (pageType == "main") {
    setGeocoder();
  }
}

const UID = "4F09FC2FFE674AA9A568A2BD23C95CB9";
let thresholdInfo,
  colorMap,
  unitArray,
  pastDue,
  refreshTimeChart,
  refreshTimeButton,
  checkDays,
  guideStep,
  unitConversion;

/*********************************************
 * Function to set period button to disable
 * @param {number} numOfButton The number of buttons
 * to be disabled
 *********************************************/
function disablePeriodButton(numOfButton) {
  try {
    let pastDay = document.getElementById("past_day");
    let pastWeek = document.getElementById("past_week");
    let past2Week = document.getElementById("past_2_weeks");
    switch (numOfButton) {
      case 1:
        pastDay.disabled = true;
        pastDay.classList.add("disabled");
        break;
      case 2:
        pastDay.disabled = true;
        pastDay.classList.add("disabled");
        pastWeek.disabled = true;
        pastWeek.classList.add("disabled");
        break;
      case 3:
        past2Week.disabled = true;
        past2Week.classList.add("disabled");
        pastWeek.disabled = true;
        pastWeek.classList.add("disabled");
        pastDay.disabled = true;
        pastDay.classList.add("disabled");
        break;
    }
  } catch (err) {
    console.error("ERROR when disablingPeriodButton: " + error);
  }
}
/*********************************************
 * Function to set period button back to normal
 * @param {number} numOfButton The number of buttons
 * to be enabled
 *********************************************/
function enablePeriodButton(numOfButton) {
  try {
    //console.log("enter enable with ",numOfButton);
    let pastDay = document.getElementById("past_day");
    let pastWeek = document.getElementById("past_week");
    let past2Week = document.getElementById("past_2_weeks");
    switch (numOfButton) {
      case 1:
        pastDay.disabled = false;
        pastDay.classList.remove("disabled");
        break;
      case 2:
        pastDay.disabled = false;
        pastDay.classList.remove("disabled");
        pastWeek.disabled = false;
        pastWeek.classList.remove("disabled");
        break;
      case 3:
        pastDay.disabled = false;
        pastDay.classList.remove("disabled");
        pastWeek.disabled = false;
        pastWeek.classList.remove("disabled");
        past2Week.disabled = false;
        past2Week.classList.remove("disabled");
        break;
    }
  } catch (err) {
    console.error("ERROR when enablePeriodButton: " + err);
  }
}
/*********************************************
 * Function to update main showing data in the
 * parameter panel when click on the button.
 * Also will update the chart.
 * @param {string} buttonID The ID of the button
 * that calls this function
 *********************************************/
function changeContent(buttonID) {
  //console.log("enter changeContent with",let1);
  /*
        Get all the element that need to be change when
        a pollution button is clicked.
    */
  lastClickPollution = buttonID; //store the last clicked pollution for later period button click
  //console.log("lastClickPollution in changeContent",lastClickPollution);
  // let legend = document.getElementById("legend");             //pollution name shown in the chart
  // let legendUnit = document.getElementById("legend-unit");    //pollution unit shown in the chart
  let paramButtons = document.getElementsByClassName("parammenu-button"); //array of all pollution button
  let infoBlocks = document.getElementsByClassName("information-section"); //array of all information block below chart
  let infoBlock = document.getElementById(buttonID + "-info"); //the seleted pollution information block
  let circle = document.getElementById("circle"); //circle for AQHI
  let legend = document.getElementById("legend"); //pollution name shown in the chart
  let legendUnit = document.getElementById("legend-unit"); //pollution unit shown in the chart
  document.getElementById("unit-btn-left-id").innerHTML =
    buttonID == "co2" ? "ppm" : "ppb";
  document.getElementById("unit-btn-right-id").innerHTML =
    buttonID == "co2" ? "mg/m<sup>3</sup>" : "μg/m<sup>3</sup>";
  circle.classList.remove("active");
  closeAllInfoBlock();
  enablePeriodButton(3);
  clickHereClicked = false;
  for (let i = 0; i < paramButtons.length; i++) {
    paramButtons[i].classList.remove("active");
  }
  for (let i = 0; i < infoBlocks.length; i++) {
    infoBlocks[i].classList.remove("active");
  }

  try {
    checkEnoughPoint(buttonID);
    updateChart(buttonID);
  } catch (exception) {
    console.error("ERROR when changeContent: " + exception);
    window.alert(
      "We have ERROR when we try to refresh button. Please refresh and try again."
    );
  }

  if (buttonID == "aqhi") {
    let circle = document.getElementById("circle");
    circle.classList.add("active");
  } else {
    let selectedButton = document.getElementById(buttonID); //pollution button selected now
    selectedButton.classList.add("active");
  }
  switch (buttonID) {
    case "pm2_5":
      legend.innerHTML = "PM<sub>2.5</sub>";
      legendUnit.innerHTML = "μg/m<sup>3</sup>";
      break;
    case "no2":
      legend.innerHTML = "NO<sub>2</sub>";
      legendUnit.innerHTML = unitConversionFlag
        ? "μg/m<sup>3</sup>"
        : "ppb<sup>&nbsp;</sup>";
      break;
    case "no":
      legend.innerHTML = "NO<sub>&nbsp;</sub>";
      legendUnit.innerHTML = unitConversionFlag
        ? "μg/m<sup>3</sup>"
        : "ppb<sup>&nbsp;</sup>";
      break;
    case "co":
      legend.innerHTML = "CO<sub>&nbsp;</sub>";
      legendUnit.innerHTML = unitConversionFlag
        ? "μg/m<sup>3</sup>"
        : "ppb<sup>&nbsp;</sup>";
      break;
    case "o3":
      legend.innerHTML = "O<sub>3</sub>";
      legendUnit.innerHTML = unitConversionFlag
        ? "μg/m<sup>3</sup>"
        : "ppb<sup>&nbsp;</sup>";
      break;
    case "aqhi":
      legend.innerHTML = "AQHI<sub>&nbsp;</sub>";
      legendUnit.innerHTML = "&nbsp;<sup>&nbsp;</sup>";
      break;
    case "so2":
      legend.innerHTML = "SO<sub>2</sub>";
      legendUnit.innerHTML = unitConversionFlag
        ? "μg/m<sup>3</sup>"
        : "ppb<sup>&nbsp;</sup>";
      break;
    case "co2":
      legend.innerHTML = "CO<sub>2</sub>";
      legendUnit.innerHTML = unitConversionFlag
        ? "mg/m<sup>3</sup>"
        : "ppm<sup>&nbsp;</sup>";
      break;
    case "pm10":
      legend.innerHTML = "PM<sub>10</sub>";
      legendUnit.innerHTML = "μg/m<sup>3</sup>";
      break;
    default:
      legend.innerHTML = "&nbsp;<sub>&nbsp;</sub>";
      legendUnit.innerHTML = "&nbsp;<sup>&nbsp;</sup>";
  }
  infoBlock.classList.add("active");
  //Change the gradient color bar level number
  //changeLevel(buttonID);
  //showColorBar();
}
let lastClickPollution = "aqhi";
let enoughPoint = true;

/*********************************************
 * Function to add Enter for searhing to the
 * address search button
 *********************************************/
function addEnterToInput() {
  let text = document.getElementById("address");
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
function autoRefreshChart() {
  window.setInterval(function() {
    try {
      for (let i = 0; i < markers.length; i++) {
        if (markers[i].deviceID == lastClick) {
          isAutoRefreshChart = true;
          markers[i].markerElement.click();
          break;
        }
      }
    } catch (exception) {
      console.error("ERROR when autoRefreshChart: " + exception);
    }
  }, refreshTimeChart);
}
let isAutoRefreshChart = false;
/*********************************************
 * Function to auto refresh button value every
 * several time
 *********************************************/
function autoRefreshButton() {
  window.setInterval(function() {
    for (let i = 0; i < markers.length; i++) {
      if (markers[i].deviceID == lastClick) {
        //isAutoRefreshButton = true;
        let loadingOverlay = document.getElementById("loading");
        loadingOverlay.classList.add("active");
        let message;
        if (pageType === "main") {
          message = encodeURI("id=" + UID + "&device_id=" + lastClick);
        } else {
          message = encodeURI("id=" + user_api_key + "&device_id=" + lastClick);
        }
        try {
          postJSON(
            GET_LATEST_URL,
            function(err, json) {
              if (err == null) {
                if (json != null && json.length > 0) {
                  markers[i].pollutant_data = json[0]["pollutant_data"];
                  //Change the timestamp to local time
                  let stillUtc = moment.utc(json[0]["timestamp"]).toDate();
                  let local = moment(stillUtc)
                    .local()
                    .format("YYYY-MM-DD HH:mm:ss");
                  markers[i].updateTime = local;
                  if (checkTime(markers[i].updateTime)) {
                    changeButtonColor(markers[i]);
                    changeTime(markers[i].updateTime);
                  } else {
                    notLatestSensor();
                  }
                } else {
                  notLatestSensor();
                }
              } else if (err == 401) {
                window.alert("Seesion timeout! Please login again.");
                window.location.replace("/login");
              } else {
                console.error(
                  "ERROR: " + err + "when auto refresh button value"
                );
              }
              loadingOverlay.classList.remove("active");
            },
            message
          );
        } catch (err) {
          console.error("ERROR when autoRefreshButton: " + err);
          loadingOverlay.classList.remove("active");
        }
        break;
      }
    }
  }, refreshTimeButton);
}
/*********************************************
 * Function to show the menu when menu button
 * clicked
 *********************************************/
function onMenuClick() {
  //console.log("enter onMenuClick");
  let menu = document.getElementById("navbar-collapse");
  if (!menuClicked) {
    menu.classList.add("active");
    menuClicked = true;
  } else {
    menu.classList.remove("active");
    menuClicked = false;
  }
}
let menuClicked = false;
/*********************************************
 * Function to show the detail information of
 * the chosen pollution, about and how to use
 * @param {string} id The of the button that
 * calls this function
 *********************************************/
function onClickHere(id) {
  closeAllInfoBlock();
  let info = document.getElementById(id + "detail");
  info.classList.add("active");
}
let clickHereClicked = false;
/*********************************************
 * Function to close all the detail information
 * block
 *********************************************/
function closeAllInfoBlock() {
  let infoBlocks = document.getElementsByClassName("detail-info");
  for (let i = 0; i < infoBlocks.length; i++) {
    infoBlocks[i].classList.remove("active");
  }
}
/*********************************************
 * Function to change the time in the
 * parameter form. The time comes from DB showing
 * the latest update in DB.
 * @param {string} updateTime The timestamp
 * to be updated for in the page
 *********************************************/
function changeTime(updateTime) {
  try {
    let time = document.getElementById("time");
    let date = moment(updateTime).format("MMM DD, HH:mm");
    time.innerHTML = "Last Updated:" + date;
  } catch (exception) {
    console.error("ERROR when changeTime: " + exception);
  }
}
/*********************************************
 * Function to check whether the data for the
 * sensor is fresh enough to show.
 * @param {string} updateTime The timestamp
 * to be checked whether out of date
 *********************************************/
function checkTime(timestamp) {
  let date = new Date(timestamp);
  let now = new Date();

  let different = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  if (different > pastDue) return false;
  else return true;
}

/*****************************************
 * Function for get json file
 * from server (using GET method).
 * @param {string} url The request url
 * @param {callback} callback Callbcak funciton of the
 * request
 *****************************************/
function getJSON(url, callback) {
  let xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function() {
    let status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
}
/*****************************************
 * Function for get json file
 * from server (using POST method)
 * @param {string} url The request url
 * @param {callback} callback Callbcak funciton of the
 * request
 * @param {encodeURI} message Message to be posted
 *****************************************/
function postJSON(url, callback, message = null) {
  let xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.responseType = "json";
  xhr.withCredentials = true;
  xhr.onload = function() {
    let status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
      console.error(xhr.response.message);
    }
  };
  xhr.send(message);
}

/***********************************************
 * For changing period time to show different
 * time period in the chart
 * @param {number} time Coefficient of the gap
 * @param {string} id  ID of the button that calls this function
 ***********************************************/
function onPeriodClicked(time, id) {
  //console.log("enter onPeriodClicked");
  let clickedButton = document.getElementById(id);
  let periodButtons = document.getElementsByClassName("period_button");
  for (let i = 0; i < periodButtons.length; i++) {
    periodButtons[i].classList.remove("active");
  }
  clickedButton.classList.add("active");
  if (time == 1) {
    numPoint = DAY_POINT;
    gap = 12;
  } else {
    numPoint = time * 24 + 1;
    gap = time * 3;
  }
  updateChart(lastClickPollution);
}
const DAY_POINT = 97;
let numPoint = DAY_POINT;
let gap = 6;
/***********************************************
 * For spliting the label
 ***********************************************/
String.prototype.splice = function(idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

/***********************************************
 * Draw the chart under the parameter form
 ***********************************************/
let myChart;
let pollutantJSON = [];
let o3_yAxes,
  no2_yAxes,
  no_yAxes,
  aqhi_yAxes,
  pm2_5_yAxes,
  co_yAxes,
  so2_yAxes,
  co2_yAxes,
  pm10_yAxes;
let largeFont, smallFont;
let o3_yAxes_half, no2_yAxes_half, no_yAxes_half, aqhi_yAxes_half;
let pm2_5_yAxes_half,
  co_yAxes_half,
  so2_yAxes_half,
  co2_yAxes_half,
  pm10_yAxes_half;
/***********************************************
 * Get chart feature from json
 * @param {object} json JSON object including information
 * of the y axis
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
  pm10_yAxes = json.pm10_yAxes;

  o3_yAxes_half = json.o3_yAxes_half;
  no2_yAxes_half = json.no2_yAxes_half;
  no_yAxes_half = json.no_yAxes_half;
  aqhi_yAxes_half = json.aqhi_yAxes_half;
  pm2_5_yAxes_half = json.pm2_5_yAxes_half;
  co_yAxes_half = json.co_yAxes_half;
  so2_yAxes_half = json.so2_yAxes_half;
  co2_yAxes_half = json.co2_yAxes_half;
  pm10_yAxes_half = json.pm10_yAxes_half;

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
}
/***********************************************
 * The actual function for rendering the chart
 * Now the chart has two different gradient color
 * background. The color bar is using a different
 * color gradient from the chart
 ***********************************************/

function drawChart() {
  //console.log("Enter drawChart");
  let ctx = document.getElementById("myChart").getContext("2d");
  //gradient background shown in the chart
  normalGradient = ctx.createLinearGradient(0, 0, 0, 300);
  halfGradient = ctx.createLinearGradient(0, 0, 0, 300);
  let colorBar = document.getElementById("color-bar").getContext("2d");
  let gradientBar = colorBar.createLinearGradient(0, 0, 0, 245);

  normalGradient.addColorStop(0.15, colorMap.high);
  normalGradient.addColorStop(0.3, colorMap.medium_high);
  normalGradient.addColorStop(0.5, colorMap.medium);
  normalGradient.addColorStop(0.7, colorMap.low);
  normalGradient.addColorStop(0.85, colorMap.very_low);

  halfGradient.addColorStop(0.2, colorMap.medium);
  halfGradient.addColorStop(0.5, colorMap.low);
  halfGradient.addColorStop(0.8, colorMap.very_low);

  gradientBar.addColorStop(0.1, colorMap.high);
  gradientBar.addColorStop(0.3, colorMap.medium_high);
  gradientBar.addColorStop(0.5, colorMap.medium);
  gradientBar.addColorStop(0.7, colorMap.low);
  gradientBar.addColorStop(0.9, colorMap.very_low);

  colorBar.fillStyle = gradientBar;
  colorBar.fillRect(0, 0, 30, 245);
  let date = [];
  let value = [];
  try {
    /*
        for (let i = 0 ; i < numPoint; i++) {
            date.push(pollutantJSON[i].timestamp);
            value.push(pollutantJSON[i].aqhi);
        }
        */
    myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: date,
        datasets: [
          {
            data: value,
            backgroundColor: normalGradient,
            // borderColor: "#54a4db"
            borderColor: "#b2b2b2",
            pointRadius: 0,
            pointHitRadius: 4
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          yAxes: [aqhi_yAxes],
          xAxes: [largeFont]
        },
        elements: {
          line: {
            tension: 0.1,
            borderWidth: 2,
            borderColor: "#b2b2b2"
          },
          point: {
            borderWidth: 0,
            hoverBorderWidth: 0
            // pointStyle: "line"
          }
        },

        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              let label = data.datasets[tooltipItem.datasetIndex].label || "";
              if (label) {
                label += ": ";
              }
              label = tooltipItem.yLabel.toFixed(1);
              return label;
            },
            title: function(tooltipItem, data) {
              let title = data.labels[tooltipItem[0].index];
              title = moment(title).format("HH:mm");
              return title;
            }
          }
        },
        annotation: {
          annotations: [
            {
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: 5,
              borderColor: "rgba(75, 192, 192, 0.8)",
              borderWidth: 3,
              borderDash: [15, 5],
              label: {
                enabled: true,
                position: "right",
                fontFamily: "sans-serif",
                fontStyle: "bold",
                content: "Detection Limit",
                backgroundColor: "rgba(0, 0, 0, 0.4)"
              }
            }
          ]
        }
      }
    });
  } catch (exception) {
    console.error("ERROR when drawChart: " + exception);
    window.alert(
      "We have ERROR when we try to draw the chart. Please refresh and try again."
    );
  }
}

let normalGradient, halfGradient;
/*********************************************
 * Function to close pop out menu and change
 * the position of navbar button and logo
 * It also change the font size of the xAxes
 * of the chart
 *********************************************/
function onResize() {
  if (menuClicked) {
    let menu = document.getElementById("navbar-collapse");
    menu.classList.remove("active");
    menuClicked = false;
  }
  if (
    (window.innerWidth < 1224 && window.innerWidth > 850) ||
    window.innerWidth < 480
  ) {
    if (chartFontSize != 12) {
      try {
        myChart.options.scales.xAxes[0] = smallFont;
        chartFontSize = 12;
        myChart.update();
        //console.log('change to small font for chart');
      } catch (err) {}
    }
  } else {
    if (chartFontSize != 14) {
      try {
        myChart.options.scales.xAxes[0] = largeFont;
        chartFontSize = 14;
        myChart.update();
        //console.log('change to large font for chart');
      } catch (err) {}
    }
  }
}
let chartFontSize = 14;
/******************************************************
 * Function for checking whether the pollutant have
 * enough value to shwo on the chart. If there is not
 * enough value to show, it will disable period button
 * @param {array} pollutant The pollutant level array
 ******************************************************/
function checkEnoughPoint(pollutant) {
  try {
    if (pollutantJSON != null && pollutantJSON.length > 0) {
      let dayPointNum = 0;
      let weekPointNum = 0;
      let twoWeekPointNum = 0;
      for (let i = 0; i < pollutantJSON.length; i++) {
        if (
          pollutantJSON[i][pollutant] != null &&
          pollutantJSON[i][pollutant] != "NULL"
        ) {
          //console.log(pollutantJSON.length,i);
          let dataTime = new Date(pollutantJSON[i].timestamp);
          let nowTime = new Date();
          let difference =
            (nowTime.getTime() - dataTime.getTime()) / (1000 * 60 * 15);
          if (difference <= 2 * 24) {
            dayPointNum += 1;
            weekPointNum += 1;
            twoWeekPointNum += 1;
          } else if (24 * 2 < difference <= 2 * 24 * 7) {
            weekPointNum += 1;
            twoWeekPointNum += 1;
          } else if (2 * 24 * 7 < difference) {
            twoWeekPointNum += 1;
          }
        }
      }
      if (dayPointNum > 0) {
        enoughPoint = true;
        onPeriodClicked(1, "past_day");
      } else if (weekPointNum > 0) {
        enoughPoint = true;
        onPeriodClicked(7, "past_week");
        disablePeriodButton(1);
      } else if (twoWeekPointNum > 0) {
        enoughPoint = true;
        onPeriodClicked(14, "past_2_weeks");
        disablePeriodButton(2);
      } else {
        enoughPoint = false;
        disablePeriodButton(3);
      }
    } else {
      enoughPoint = false;
      disablePeriodButton(3);
    }
  } catch (err) {
    enoughPoint = false;
    console.error("ERROR when checkEnoughtPoint: ", err);
    disablePeriodButton(3);
  }
}
/******************************************************
 * Function for updating the chart when click on the
 * period choice or pollution button
 * @param {Array.<number>} pollutant The pollutant level array
 ******************************************************/
function updateChart(pollutant) {
  //console.log("enter updateChart with " + pollutant);
  let date = [];
  // let value = [];
  let value = new Array(numPoint).fill(-100);
  let dict = {};
  let multiple = numPoint == DAY_POINT ? 1 : 60 / SAMPLE_INTERVAL;
  let unitConversionMul = 1;
  if (pollutant in unitConversion && unitConversionFlag) {
    unitConversionMul = unitConversion[pollutant];
  }
  try {
    if (pollutantJSON != null && pollutantJSON.length > 0 && enoughPoint) {
      let now = new Date();
      let nowTimeTick =
        parseInt(now.getTime() / (1000 * 60 * SAMPLE_INTERVAL)) *
        (1000 * 60 * SAMPLE_INTERVAL);
      for (let i = 0; i < numPoint; i++) {
        let timeTick = nowTimeTick - 1000 * 60 * SAMPLE_INTERVAL * multiple * i;
        let nowTime = moment(timeTick)
          .local()
          .format("YYYY-MM-DD HH:mm:ss");
        date.push(nowTime);
      }

      for (let i = 0; i < pollutantJSON.length; i++) {
        let stillUtc = moment.utc(pollutantJSON[i].timestamp).toDate();
        let local = moment(stillUtc)
          .local()
          .format("YYYY-MM-DD HH:mm:ss");
        dict[local] = pollutantJSON[i][pollutant];
      }

      for (let i = 0; i < numPoint; i++) {
        if (dict[date[i]]) {
          value[i] = dict[date[i]] * unitConversionMul;
        }
      }
      // let numPointIndex, pollutantJSONIndex;
      // for (
      //   numPointIndex = 0, pollutantJSONIndex = 0;
      //   numPointIndex < numPoint;
      //   numPointIndex++
      // ) {
      //   let nextPollutantJsonPointNum = pollutantJSONIndex * multiple;
      //   if (nextPollutantJsonPointNum >= pollutantJSON.length) {
      //     nextPollutantJsonPointNum = pollutantJSON.length - 1;
      //   }
      //   let stillUtc = moment
      //     .utc(pollutantJSON[nextPollutantJsonPointNum].timestamp)
      //     .toDate();
      //   let local = moment(stillUtc)
      //     .local()
      //     .format("YYYY-MM-DD HH:mm:ss");

      //   nextPollutantJsonPointNum = pollutantJSONIndex * multiple + 1;
      //   if (nextPollutantJsonPointNum >= pollutantJSON.length) {
      //     nextPollutantJsonPointNum = pollutantJSON.length - 1;
      //   }
      //   let stillUtcPlus = moment
      //     .utc(pollutantJSON[nextPollutantJsonPointNum].timestamp)
      //     .toDate();
      //   let localPlus = moment(stillUtcPlus)
      //     .local()
      //     .format("YYYY-MM-DD HH:mm:ss");
      //   //console.log(local,localPlus,date[numPointIndex]);
      //   if (local == date[numPointIndex]) {
      //     value.push(pollutantJSON[pollutantJSONIndex * multiple][pollutant]);
      //     pollutantJSONIndex++;
      //   } else if (localPlus == date[numPointIndex]) {
      //     value.push(
      //       pollutantJSON[pollutantJSONIndex * multiple + 1][pollutant]
      //     );
      //     pollutantJSONIndex++;
      //   } else {
      //     value.push(-100);
      //   }
      // }
      //console.log("pollutantJSON:",pollutantJSON);
      //console.log("date:",date);
    } else {
      //console.error("No data can be used for updating the chart");
      //console.log(pollutantJSON,pollutantJSON.length,enoughPoint)
      window.alert("No data can be used for updating the chart");
    }
    let valueMax = Math.max(...value);
    let unitSelected = unitConversionFlag ? "ugm3" : "ppb";
    let pollutantThreshold = new PollutantThreshold(
      thresholdInfo[unitSelected][pollutant]
    );
    if (pollutantThreshold["high"].low < valueMax) {
      pollutantThreshold["high"].high = valueMax;
      let axes_feature = {
        ticks: {
          beginAtZero: true,
          fontSize: 14,
          min: 0
        },
        fontColor: "#515151"
      };
      myChart.options.scales.yAxes[0] = axes_feature;
      changeGradient(pollutantThreshold, 5);
    } else if (pollutantThreshold["medium_high"].low < valueMax) {
      // pollutantThreshold["medium_high"].high = valueMax;
      let axes_feature = {
        ticks: {
          beginAtZero: true,
          fontSize: 14,
          min: 0,
          max: pollutantThreshold["medium_high"].high
        },
        fontColor: "#515151"
      };
      myChart.options.scales.yAxes[0] = axes_feature;
      changeGradient(pollutantThreshold, 4);
    } else if (pollutantThreshold["medium"].low < valueMax) {
      // pollutantThreshold["medium"].high = valueMax;
      let axes_feature = {
        ticks: {
          beginAtZero: true,
          fontSize: 14,
          min: 0,
          max: pollutantThreshold["medium"].high
        },
        fontColor: "#515151"
      };
      myChart.options.scales.yAxes[0] = axes_feature;
      changeGradient(pollutantThreshold, 3);
    } else if (pollutantThreshold["low"].low < valueMax) {
      // pollutantThreshold["low"].high = valueMax;
      let axes_feature = {
        ticks: {
          beginAtZero: true,
          fontSize: 14,
          min: 0,
          max: pollutantThreshold["low"].high
        },
        fontColor: "#515151"
      };
      myChart.options.scales.yAxes[0] = axes_feature;
      changeGradient(pollutantThreshold, 2);
    } else if (pollutantThreshold["very_low"].low < valueMax) {
      // pollutantThreshold["very_low"].high = valueMax;
      let axes_feature = {
        ticks: {
          beginAtZero: true,
          fontSize: 14,
          min: 0,
          max: pollutantThreshold["very_low"].high
        },
        fontColor: "#515151"
      };
      myChart.options.scales.yAxes[0] = axes_feature;
      changeGradient(pollutantThreshold, 1);
    }
    // if (Math.max(...value) > thresholdInfo[pollutant].medium.high) {
    //   //Ajust yAxes according to the pollutant
    // } else {
    //   let axes_feature = {
    //     ticks: {
    //       beginAtZero: true,
    //       fontSize: 14,
    //       max: thresholdInfo[pollutant]["medium"].high,
    //       min: 0
    //     },
    //     fontColor: "#515151"
    //   };
    //   //Ajust yAxes according to the pollutant to the half version
    //   myChart.options.scales.yAxes[0] = axes_feature;
    //   //myChart.data.datasets[0].backgroundColor = halfGradient;
    //   changeGradient(pollutant, 3);
    // }
    myChart.data.labels = date;
    myChart.data.datasets[0].data = value;
    if (["co2", "aqhi"].includes(pollutant)) {
      myChart.options.annotation.annotations[0].value = -100;
    } else {
      myChart.options.annotation.annotations[0].value =
        thresholdInfo[pollutant].low_limit;
    }
    myChart.update();
  } catch (exception) {
    window.alert(
      "We have ERROR when we try to update the chart. Please refresh and try again."
    );
    console.error("ERROR when updateChart: ", exception);
  }
}
/**********************************
 * Class for pollutant threshold
 * @property {number} low_limit
 * @property {{low:number,high:number}} very_low
 * @property {{low:number,high:number}} low
 * @property {{low:number,high:number}} medium
 * @property {{low:number,high:number}} medium_high
 * @property {{low:number,high:number}} high
 *********************************/
class PollutantThreshold {
  constructor(thresholdInfo) {
    this.low_limit = thresholdInfo.low_limit;
    this.very_low = {
      low: thresholdInfo["very_low"].low,
      high: thresholdInfo["very_low"].high
    };
    this.low = {
      low: thresholdInfo["low"].low,
      high: thresholdInfo["low"].high
    };
    this.medium = {
      low: thresholdInfo["medium"].low,
      high: thresholdInfo["medium"].high
    };
    this.medium_high = {
      low: thresholdInfo["medium_high"].low,
      high: thresholdInfo["medium_high"].high
    };
    this.high = {
      low: thresholdInfo["high"].low,
      high: thresholdInfo["high"].high
    };
  }
}
/*************************************************************************
 * Change gradient for color bar and chart background. The gradient is
 * generated differently according to different pollutant. It will use
 * the threshold information of different pollutant to calculate the
 * stop point of the color.
 * @param {{low_limit:number,very_low:{low:number,high:number},low:{low:number,high:number},medium:{low:number,high:number},medium_high:{low:number,high:number},high:{low:number,high:number}}} pollutantThreshold
 * The pollutant threshold of specific pollutant
 * @param {number} levelNum The number of level to be calculated into gradient.
 ************************************************************************/
function changeGradient(pollutantThreshold, levelNum) {
  let ctx = document.getElementById("myChart").getContext("2d");
  let gradient = ctx.createLinearGradient(0, 0, 0, 300);
  let colorBar = document.getElementById("color-bar").getContext("2d");
  let gradientBar = colorBar.createLinearGradient(0, 0, 0, 245);
  let level = ["very_low", "low", "medium", "medium_high", "high"];
  let full = 1;
  let difference, percentage, colorPrecentage;
  for (let i = 0; i < levelNum; i++) {
    difference =
      pollutantThreshold[level[i]].high - pollutantThreshold[level[i]].low;
    percentage = difference / pollutantThreshold[level[levelNum - 1]].high;
    colorPrecentage = full - percentage >= 0 ? full - percentage : 0;
    gradient.addColorStop(colorPrecentage, colorMap[level[i]]);
    gradientBar.addColorStop(colorPrecentage, colorMap[level[i]]);
    full -= percentage;
  }
  colorBar.fillStyle = gradientBar;
  colorBar.fillRect(0, 0, 30, 245);
  myChart.data.datasets[0].backgroundColor = gradient;
}
/*************************************************************
 * Function for initialize Google Map. The center is
 * fetch from the info json. It will test whether the browser
 * support html5 geolocation and locate the user position.
 * @param {object} mapFeature Mapbox map feature in json format
 * @param {{lng:number,lat:number}} mapCenter Map feature in json format
 *************************************************************/
function initMap(mapFeature, mapCenter) {
  try {
    mapboxgl.accessToken = mapFeature.accessToken;
    map = new mapboxgl.Map({
      container: "map",
      style: mapFeature.style,
      center: [mapCenter.lng, mapCenter.lat],
      zoom: mapFeature.zoom
    });
    map.on("render", function() {
      if (!boundLock) {
        boundLock = true;
        //clearMarkers();
        initMarker();
        window.setTimeout(function() {
          boundLock = false;
        }, 4000);
      }
    });
  } catch (err) {
    window.alert(
      "We have ERROR when we try to initialize Mapbox Map. Please refresh the page and try again."
    );
    console.err("ERROR when initMap: ", err);
  }
}
let map, infoWindow;
let sensorInfoJSON;
let markers = [];
let lastClick;
let boundLock = false;
/******************************************************
 * Function for getting sensor location information
 * and put marker on the map. In portal, instead of
 * checking in special area, it check for specific devices
 * binding to that user api key
 ******************************************************/
function initMarker() {
  //console.log("Enter initMarker");
  if (pageType === "main") {
    bounds = map.getBounds();
    lat1 = bounds._sw.lat;
    lat2 = bounds._ne.lat;
    lng1 = bounds._sw.lng;
    lng2 = bounds._ne.lng;
    let message = encodeURI(
      "id=" +
        UID +
        "&lng1=" +
        lng1 +
        "&lng2=" +
        lng2 +
        "&lat1=" +
        lat1 +
        "&lat2=" +
        lat2
    );
    postJSON(
      SENSOR_URL,
      function(err, json) {
        if (err == null) {
          sensorInfoJSON = json;
          drop();
        } else if (err == 401) {
          window.alert("Seesion timeout! Please login again.");
          window.location.replace("/login");
        } else {
          console.error(err);
        }
      },
      message
    );
  } else {
    let message = encodeURI(
      "id=" + user_api_key + "&device_id=" + user_device_id
    );
    postJSON(
      SENSOR_URL,
      function(err, json) {
        if (err == null) {
          sensorInfoJSON = json;
          drop();
        } else if (err == 401) {
          window.alert("Seesion timeout! Please login again.");
          window.location.replace("/login");
        } else {
          console.error(err);
        }
      },
      message
    );
  }
}
let bounds, lng1, lng2, lat1, lat2;
/******************************************************
 * Function for dropping marker on the map. Outside portal,
 * it will do a virtual click on the closest device to the
 * client. In portal, it will choose the first device in
 * the return device list.
 ******************************************************/
function drop() {
  //clearMarkers();
  //console.log("enter drop");
  try {
    if (sensorInfoJSON && sensorInfoJSON.length > 0) {
      for (let i = 0; i < sensorInfoJSON.length; i++) {
        addMarker(sensorInfoJSON[i]);
      }
    }
    //After drop the marker, send a 'click' trigger to the last clicked marker
    //This will only do once when the whole website is first loaded.
    if (sensorInfoJSON && sensorInfoJSON.length > 0 && firstDrop) {
      /*
            geolocator.on('geolocate',function(data){
                console.log(data.coords.latitude,);
            })
            */
      if (pageType === "main") {
        var options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        };

        function success(pos) {
          var crd = pos.coords;

          // console.log("Your current position is:");
          // console.log(`Latitude : ${crd.latitude}`);
          // console.log(`Longitude: ${crd.longitude}`);
          // console.log(`More or less ${crd.accuracy} meters.`);
          let distanceArray = [];
          let min = Infinity;
          let minID;
          for (let i = 0; i < sensorInfoJSON.length; i++) {
            let lat = sensorInfoJSON[i].sensor_info.lat;
            let lng = sensorInfoJSON[i].sensor_info.lng;
            let distance = Math.sqrt(
              (crd.latitude - lat) ^ (2 + (crd.longitude - lng)) ^ 2
            );
            if (distance < min) {
              min = distance;
              minID = sensorInfoJSON[i].sensor_info.serial_number;
            }
          }
          lastClick = minID;
          //console.log(`latsClick: ${lastClick}`);
          for (let i = 0; i < markers.length; i++) {
            if (markers[i].deviceID == lastClick) {
              markers[i].markerElement.click();
              //markers[i].popup.addTo(map);
              break;
            }
          }
          // firstDrop = false;
        }

        function error(err) {
          console.warn(`ERROR(${err.code}): ${err.message}`);
          //console.log(`latsClick: ${lastClick}`);
          lastClick = sensorInfoJSON[0].sensor_info.serial_number;
          for (let i = 0; i < markers.length; i++) {
            if (markers[i].deviceID == lastClick) {
              markers[i].markerElement.click();
              //markers[i].popup.addTo(map);
              break;
            }
          }
          // firstDrop = false;
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
      } else {
        markers[0].markerElement.click();
        map.setCenter(markers[0].marker.getLngLat());
      }
      firstDrop = false;
    }
  } catch (err) {
    window.alert(
      "We have ERROR when we try to get sensor information on the map. Please refresh and try again."
    );
    console.error("ERROR when drop: ", err);
  }
}
let firstDrop = true;
/******************************************************
 * Function that return the color for the sensor pin
 * according to the aqhi value
 * @param {number} aqhi AQHI level
 ******************************************************/
function checkAQHI(aqhi) {
  if (0 < aqhi && aqhi <= 2) return "very_low";
  else if (2 < aqhi && aqhi <= 4) return "low";
  else if (4 < aqhi && aqhi <= 6) return "medium";
  else if (6 < aqhi && aqhi <= 8) return "medium_high";
  else if (8 < aqhi) return "high";
  else return "grey";
}

/******************************************************
 * Function for adding marker to the markers array
 * @param {{device_id:number,serial_number:number,station_name:string,lat:number,lng:number,aqhi:number}} sensorInfo
 * The sensor infomation to add as a marker on the map
 ******************************************************/
function addMarker(sensorInfo) {
  try {
    //console.log("enter addMarker");
    /*
            Here we construct a new marker object. In a marker object,
            we store the location name of the sensor, the  google marker
            object, the color of the pin on the map, and then sensor ID.
            Also contain the the google information object that will show
            when client click on the pin on the map
        */
    if (sensorIDArray.indexOf(sensorInfo.sensor_info.device_id) == -1) {
      let sensorColor, iconPath;
      let stillUtc = moment.utc(sensorInfo.timestamp).toDate();
      let local = moment(stillUtc)
        .local()
        .format("YYYY-MM-DD HH:mm:ss");
      if (checkTime(local)) {
        sensorColor = checkAQHI(parseInt(sensorInfo.sensor_info.aqhi));
        iconPath = "/images/" + parseInt(sensorInfo.sensor_info.aqhi) + ".png";
      } else {
        sensorColor = "grey";
        iconPath = "/images/grey.png";
      }
      //let pinPath = 'images/pin_' + sensorColor + '.png';
      sensorIDArray.push(sensorInfo.sensor_info.device_id);
      let markerElement = document.createElement("div");
      markerElement.className = "marker";
      markerElement.style.backgroundImage = "url(" + iconPath + ")";
      markerElement.style.width = "25px";
      markerElement.style.height = "25px";
      markerElement.style.cursor = "pointer";
      markerElement.id = "device_" + sensorInfo.sensor_info.serial_number;
      let popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML("<h1>" + String(sensorInfo.sensor_info.station_name) + "</h1>")
        .setLngLat([sensorInfo.sensor_info.lng, sensorInfo.sensor_info.lat]);
      let marker = new mapboxgl.Marker(markerElement)
        .setLngLat([sensorInfo.sensor_info.lng, sensorInfo.sensor_info.lat])
        .addTo(map);

      let newMarker = new MyMarker({
        name: sensorInfo.sensor_info.station_name,
        marker: marker,
        color: sensorColor,
        deviceID: sensorInfo.sensor_info.serial_number,
        aqhi: sensorInfo.pollutant_data.aqhi,
        pollutant_data: sensorInfo.pollutant_data,
        updateTime: local,
        markerElement: markerElement,
        popup: popup
      });

      /*
             Here we add marker onclick listener to Mapbox marker object
             (Not the marker object we make ourselves).This marker object is
             binded with a html element.
             This onclick function will first close the information that shown on the map according
             to the which pin is last clicked. Then it will show the information
             of the clicked pin for this time. It will also change the data panel
             to shown the AQHI data of the place that clicked and
             change other information in the data panel accordingly.
            */

      markerElement.addEventListener("click", function() {
        //Finding the lastclick pin and change its icon back to circle
        for (let i = 0; i < markers.length; i++) {
          if (markers[i].deviceID == lastClick) {
            if (markers[i].color === "grey") {
              markers[i].markerElement.style.backgroundImage =
                "url(/images/grey.png)";
            } else if (markers[i].aqhi <= 10) {
              markers[i].markerElement.style.backgroundImage =
                "url(/images/" + markers[i].aqhi + ".png)";
            } else {
              markers[i].markerElement.style.backgroundImage =
                "url(/images/10.png)";
            }
            markers[i].markerElement.style.height = "25px";
            markers[i].markerElement.style.width = "25px";
            if (markers[i].popup.isOpen()) markers[i].popup.remove();
            break;
          }
        }
        lastClick = newMarker.deviceID;
        //Change the number of point and gap for the chart back to one day style
        //numPoint = 49;
        //gap = 6;
        //Make the icon of the sensor clicked this time to pin
        newMarker.popup.addTo(map);
        markerElement.style.backgroundImage =
          "url(/images/pin_" + newMarker.color + ".png)";
        markerElement.style.height = "35px";
        markerElement.style.width = "35px";
        document.getElementById("sensor-address").innerHTML = newMarker.name;
        let enddate = moment.utc().format("YYYY-MM-DD HH:mm:ss");
        let startdate = moment
          .utc()
          .subtract(checkDays * 24 + 1, "hours")
          .format("YYYY-MM-DD HH:mm:ss");
        //console.log("enddate:",enddate);
        //console.log("startdate:",startdate);
        let messagePollutant;
        if (pageType === "main") {
          messagePollutant = encodeURI(
            "id=" +
              UID +
              "&device_id=" +
              lastClick +
              "&startdate='" +
              startdate +
              "'&enddate='" +
              enddate +
              "'"
          );
        } else {
          messagePollutant = encodeURI(
            "id=" +
              user_api_key +
              "&device_id=" +
              lastClick +
              "&startdate='" +
              startdate +
              "'&enddate='" +
              enddate +
              "'"
          );
        }

        //console.log("startdate:",startdate);
        //console.log("enddate:",enddate);
        //console.log("message",messagePollutant);

        //  While loading data from DB, an overlay will
        //  come out and show a loading circle until the
        //  loading finishes.

        let loadingOverlay = document.getElementById("loading");
        loadingOverlay.classList.add("active");
        postJSON(
          POLLUTANT_URL,
          function(err, json) {
            if (err == null) {
              pollutantJSON = json;

              //  First check whether is data for the sensor. If there is
              //  not any data can be loaded, then call the nullPollutantJSON
              //  function to handle this situation.

              if (pollutantJSON == null || pollutantJSON.length == 0) {
                //  If there is data can be loaded from the sensor,
                //  the next step is to check whether it is the latest
                //  data.
                nullPollutantJSON();
              } //Removed! Enabling this hides latest data when averages are missing
              if (checkTime(newMarker.updateTime)) {
                changeButtonColor(newMarker);
                changeTime(newMarker.updateTime);
              } else {
                notLatestSensor();
              }
              //    Auto refresh and client click have different process way.
              //    For auto refresh, it will not change the button to AQHI and
              //    just refresh all the value shown in the button, refrehs the chert
              //    and won't change the chart period to one day. For client click,
              //    we need to change the button to AQHI and also change the period back
              //    to one day.

              if (isAutoRefreshChart) {
                changeContent(lastClickPollution);
                isAutoRefreshChart = false;
              } else {
                changeContent("aqhi");
                //onPeriodClicked(1, "past_day");
              }
              document
                .getElementById("article-left")
                .classList.remove("non-active");
              loadingOverlay.classList.remove("active");
              if (firstLoad) {
                firstLoad = false;
                checkCookie();
              }
            } else if (err == 401) {
              window.alert("Seesion timeout! Please login again.");
              window.location.replace("/login");
            } else {
              console.error(err);
              disablePeriodButton(3);
              loadingOverlay.classList.remove("active");
              document
                .getElementById("article-left")
                .classList.remove("non-active");
            }
          },
          messagePollutant
        );
      });

      //    We push the new marker object into a array
      markers.push(newMarker);
    }
  } catch (err) {
    console.error("ERROR when addMarker: ", err);
    window.alert(
      "We have ERROR when we try to add sensor to the map. Please refresh and try again."
    );
  }
}
let sensorIDArray = [];
let markerID = 0;
let firstLoad = true;
/**************************************
 * The marker object class that contain
 * more infomation than the original
 * map provided one
 * @property {string} name
 * @property {mapboxgl.Marker} marker
 * @property {string} color
 * @property {number} deviceID
 * @property {number} aqhi
 * @property {Array.<number>} pollutant_data
 * @property {string} updateTime
 * @property {HTMLElement} markerElement
 * @property {mapboxgl.Popup} popup
 **************************************/
class MyMarker {
  constructor(newMarker) {
    this.name = newMarker.name;
    this.marker = newMarker.marker;
    this.color = newMarker.color;
    this.deviceID = newMarker.deviceID;
    this.aqhi = newMarker.aqhi;
    this.pollutant_data = newMarker.pollutant_data;
    this.updateTime = newMarker.updateTime;
    this.markerElement = newMarker.markerElement;
    this.popup = newMarker.popup;
  }
}
/******************************************************
 * Function for changing button bottom line color when
 * clicking any pin on the map. Also change the pollutant
 * level number in the button and temperature and humidity
 * @param {MyMarker} newMarker The marker clicked
 ******************************************************/
function changeButtonColor(newMarker) {
  try {
    //console.log("Enter changeButtonColor")
    let buttons = document.getElementsByClassName("parammenu-button");
    singleSensorJSON = [newMarker.pollutant_data];
    let unitSelected = unitConversionFlag ? "ugm3" : "ppb";
    for (let i = 0; i < buttons.length; i++) {
      let threshold = thresholdInfo[unitSelected][buttons[i].id];
      let value = singleSensorJSON[0][buttons[i].id];
      if (buttons[i].id in unitConversion && value && unitConversionFlag) {
        value = value * unitConversion[buttons[i].id];
      }
      checkColor(value, buttons[i].id, threshold);
    }
    checkColor(
      singleSensorJSON[0]["aqhi"],
      "aqhi",
      thresholdInfo[unitSelected]["aqhi"]
    );

    let temperature = document.getElementById("temperature");
    let humidity = document.getElementById("humidity");
    if (
      singleSensorJSON[0]["temperature"] != null &&
      singleSensorJSON[0]["temperature"] != "NULL"
    ) {
      temperature.innerHTML =
        parseFloat(singleSensorJSON[0]["temperature"]).toFixed(1) + "&deg;C";
    } else {
      temperature.innerHTML = "--" + "&deg;C";
    }
    if (
      singleSensorJSON[0]["humidity"] != null &&
      singleSensorJSON[0]["humidity"] != "NULL"
    ) {
      humidity.innerHTML =
        parseFloat(singleSensorJSON[0]["humidity"]).toFixed(1) + "%";
    } else {
      humidity.innerHTML = "--" + "%";
    }
    changeContent(lastClickPollution);
    document.getElementById("loading").classList.remove("active");
  } catch (err) {
    console.error("ERROR when changeButtonColor: ", err);
    window.alert(
      "We have ERROR when we try to change the button color. Please refresh and try again."
    );
  }
}
let singleSensorJSON = [];
/******************************************************
 * Function for check the according color for given
 * pollutant level.
 * @param {number} value The pollutant level
 * @param {string} id The clicked button id
 * @param {PollutantThreshold} threshold Threshold infomation object
 ******************************************************/
function checkColor(value, id, threshold) {
  try {
    /*
            If the value is null, the button value will show as "--".
            If the value is less than the minimal sensor detectable level,
            it will show as "<(threhold)". Ohterwise, it will show as the value.
        */
    if (id == "aqhi") {
      let paramUnit = document.getElementById("unit");
      let circle = document.getElementById("circle");
      paramUnit.innerHTML =
        value != null && value != "null" ? parseInt(value) : "--";
      if (value < threshold.very_low.high) {
        circle.className = "circle very_low";
        //console.log(id," button to green");
      }
      if (threshold.low.low <= value && value < threshold.low.high) {
        circle.className = "circle low";
        //console.log(id," button to lightgreen");
      }
      if (threshold.medium.low <= value && value < threshold.medium.high) {
        circle.className = "circle medium";
        //console.log(id," button to yellow");
      }
      if (
        threshold.medium_high.low <= value &&
        value < threshold.medium_high.high
      ) {
        circle.className = "circle medium_high";
        //console.log(id," button to orange");
      }
      if (threshold.high.low <= value) {
        circle.className = "circle high";
        //console.log(id," button to red");
      }
      if (value == "null" || value == null || value == "NULL") {
        circle.className = "circle grey";
        //console.log(id," button to grey");
      }
    } else {
      let button = document.getElementById(id);
      let buttonUnit = document.getElementById(id + "-unit");
      if (value != null && value != "null") {
        if (value >= threshold.low_limit) {
          buttonUnit.innerHTML = parseFloat(value).toFixed(1);
        } else {
          buttonUnit.innerHTML = "<" + threshold.low_limit;
        }
      } else {
        buttonUnit.innerHTML = "--";
      }
      if (value < threshold.very_low.high) {
        button.className = "parammenu-button very_low";
        //console.log(id," button to green");
      }
      if (threshold.low.low <= value && value < threshold.low.high) {
        button.className = "parammenu-button low";
        //console.log(id," button to lightgreen");
      }
      if (threshold.medium.low <= value && value < threshold.medium.high) {
        button.className = "parammenu-button medium";
        //console.log(id," button to yellow");
      }
      if (
        threshold.medium_high.low <= value &&
        value < threshold.medium_high.high
      ) {
        button.className = "parammenu-button medium_high";
        //console.log(id," button to orange");
      }
      if (threshold.high.low <= value) {
        button.className = "parammenu-button high";
        //console.log(id," button to red");
      }
      if (value == "null" || value == null || value == "NULL") {
        button.className = "parammenu-button grey";
        //console.log(id," button to grey");
      }
    }
    //console.log(id,' button enter with ',value);
  } catch (err) {
    console.error("ERROR when checkColor: ", err);
  }
}

/******************************************************
 * Function for handling address submitted by the user
 ******************************************************/

function setGeocoder() {
  try {
    geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken
    });
    document.getElementById("address").appendChild(geocoder.onAdd(map));
    geolocator = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      fitBoundsOptions: {
        maxZoom: 12
      },
      trackUserLocation: true
    });
    map.addControl(geolocator);
    setTimeout(function() {
      geolocator.trigger();
    }, 1000);
  } catch (err) {
    console.error("ERROR when setGeocoder: ", err);
    window.alert(
      "We have ERROR when we try to set up location search. Please refresh and try again."
    );
  }
}
let geocoder, geolocator;
/******************************************************
 * Function dealing with the sitution when there is no
 * data for the sensor can be loaded.
 ******************************************************/

function nullPollutantJSON() {
  try {
    singleSensorJSON = null;
    pollutantJSON = null;
    document.getElementById("time").innerHTML = "No Data Available";
    // document.getElementById("unit").innerHTML = "--";
    // document.getElementById("temperature").innerHTML = "--" + "&deg;C";
    // document.getElementById("humidity").innerHTML = "--" + "%";
    // document.getElementById("circle").className = "circle grey";
    disablePeriodButton(3);
    if (myChart != null) {
      myChart.data.labels = [];
      myChart.data.datasets[0].data = [];
      myChart.update();
    }
    // for (let i = 0; i < unitArray.length; i++) {
    //   let unitNum = document.getElementById(unitArray[i] + "-unit");
    //   unitNum.innerHTML = "--";
    //   let buttonColor = document.getElementById(unitArray[i]);
    //   buttonColor.className = "parammenu-button grey";
    // }
    document.getElementById("loading").classList.remove("active");
    document.getElementById("article-left").classList.remove("non-active");
  } catch (err) {
    console.error("ERROR when nullPollutantJSON: " + err);
  }
  window.alert(
    "Sorry, we have some problem to get data from this sensor. Please try another one."
  );
}
/******************************************************
 * Function dealing with the sitution when there is no
 * LATEST data for the sensor can be loaded.
 ******************************************************/
function notLatestSensor() {
  try {
    document.getElementById("time").innerHTML = "Data is out of date";
    document.getElementById("unit").innerHTML = "--";
    document.getElementById("temperature").innerHTML = "--" + "&deg;C";
    document.getElementById("humidity").innerHTML = "--" + "%";
    document.getElementById("circle").className = "circle grey";
    for (let i = 0; i < unitArray.length; i++) {
      if (unitArray[i] == "aqhi") {
        continue;
      }
      let unitNum = document.getElementById(unitArray[i] + "-unit");
      if (unitNum) {
        unitNum.innerHTML = "--";
      }
      let buttonColor = document.getElementById(unitArray[i]);
      buttonColor.className = "parammenu-button grey";
    }
    document.getElementById("loading").classList.remove("active");
    document.getElementById("article-left").classList.remove("non-active");
  } catch (err) {
    console.error("ERROR when notLatestSensor: " + err);
  }
  window.alert("Sorry. Latest data is not available for this sensor");
}
/******************************************************
 * Function to handle logout for user
 ******************************************************/
function OnLogoutClicked() {
  // let xhr = new XMLHttpRequest();
  // xhr.open("POST", LOGOUT_URL, true);
  // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // //let user_api_key = window.sessionStorage.getItem("api_key");
  // let message = encodeURI("id=" + user_api_key);
  // xhr.send(message);
  // ClearSession();
  window.location.replace("/logout");
}
/******************************************************
 * Function for logouting user
 ******************************************************/
function LogoutUser() {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", LOGOUT_URL, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.withCredentials = true;
  //let user_api_key = window.sessionStorage.getItem("api_key");
  let message = encodeURI("id=" + user_api_key);
  xhr.send(message);
  console.log("logout");
  ClearSession();
}
/******************************************************
 * Function to clear variables from session storage
 * after a session is closed
 ******************************************************/
function ClearSession() {
  window.sessionStorage.removeItem("api_key");
  window.sessionStorage.removeItem("device_id");
}
/******************************************************
 * Function for showing gradient color bar
 ******************************************************/
// function showColorBar(){
//     let popup = document.getElementById("popup");
//     popup.classList.add("show");
// }
// function toggleColorBar(){
//     let popup = document.getElementById("popup");
//     popup.classList.toggle("show");
// }
// function changeLevel(buttonID){
//     let level_2 = document.getElementById("level-2");
//     let level_3 = document.getElementById("level-3");
//     let level_4 = document.getElementById("level-4");
//     let level_5 = document.getElementById("level-5");
//     let level_6 = document.getElementById("level-6");

//     level_2.innerHTML = thresholdInfo[buttonID].very_low.high;
//     level_3.innerHTML = thresholdInfo[buttonID].low.high;
//     level_4.innerHTML = thresholdInfo[buttonID].medium.high;
//     level_5.innerHTML = thresholdInfo[buttonID].medium_high.high;
//     level_6.innerHTML = thresholdInfo[buttonID].high.high;
// }

/*********************************************
 * Function to change unit when unit button
 * clicked or when the pollutant button click
 * @param {string} unitTypeID Selected unit ID
 *********************************************/
function onUnitChange(unitTypeID) {
  if (unitTypeID == "unit-btn-left-id") {
    document.getElementById("unit-btn-left-id").classList.add("active");
    document.getElementById("unit-btn-right-id").classList.remove("active");
    unitConversionFlag = false;
  } else {
    document.getElementById("unit-btn-right-id").classList.add("active");
    document.getElementById("unit-btn-left-id").classList.remove("active");
    unitConversionFlag = true;
  }
  markers.forEach(marker => {
    if (marker.deviceID == lastClick) {
      changeButtonColor(marker);
    }
  });
}
let unitConversionFlag;
