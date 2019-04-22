let infoJSON = [
  {
    threshold: {
      aqhi: {
        low_limit: 0,
        very_low: {
          low: 1,
          high: 3
        },
        low: {
          low: 3,
          high: 5
        },
        medium: {
          low: 5,
          high: 7
        },
        medium_high: {
          low: 7,
          high: 9
        },
        high: {
          low: 9,
          high: 11
        }
      },
      co: {
        low_limit: 50,
        very_low: {
          low: 0,
          high: 1500
        },
        low: {
          low: 1500,
          high: 4000
        },
        medium: {
          low: 4000,
          high: 6000
        },
        medium_high: {
          low: 6000,
          high: 9000
        },
        high: {
          low: 9000,
          high: 18000
        }
      },
      no: {
        low_limit: 5,
        very_low: {
          low: 0,
          high: 250
        },
        low: {
          low: 250,
          high: 100
        },
        medium: {
          low: 100,
          high: 250
        },
        medium_high: {
          low: 250,
          high: 500
        },
        high: {
          low: 500,
          high: 1000
        }
      },
      no2: {
        low_limit: 5,
        very_low: {
          low: 0,
          high: 25
        },
        low: {
          low: 25,
          high: 60
        },
        medium: {
          low: 60,
          high: 80
        },
        medium_high: {
          low: 80,
          high: 100
        },
        high: {
          low: 100,
          high: 140
        }
      },
      o3: {
        low_limit: 10,
        very_low: {
          low: 0,
          high: 25
        },
        low: {
          low: 25,
          high: 60
        },
        medium: {
          low: 60,
          high: 80
        },
        medium_high: {
          low: 80,
          high: 100
        },
        high: {
          low: 100,
          high: 150
        }
      },
      co2: {
        low_limit: 0,
        very_low: {
          low: 0,
          high: 450
        },
        low: {
          low: 450,
          high: 2000
        },
        medium: {
          low: 2000,
          high: 6000
        },
        medium_high: {
          low: 6000,
          high: 10000
        },
        high: {
          low: 10000,
          high: 20000
        }
      },
      so2: {
        low_limit: 5,
        very_low: {
          low: 0,
          high: 1
        },
        low: {
          low: 1,
          high: 3
        },
        medium: {
          low: 3,
          high: 5
        },
        medium_high: {
          low: 5,
          high: 7
        },
        high: {
          low: 7,
          high: 12
        }
      },
      pm2_5: {
        low_limit: 5,
        very_low: {
          low: 0,
          high: 5
        },
        low: {
          low: 5,
          high: 10
        },
        medium: {
          low: 10,
          high: 25
        },
        medium_high: {
          low: 25,
          high: 50
        },
        high: {
          low: 50,
          high: 80
        }
      },
      pm10: {
        low_limit: 5,
        very_low: {
          low: 0,
          high: 10
        },
        low: {
          low: 10,
          high: 20
        },
        medium: {
          low: 20,
          high: 40
        },
        medium_high: {
          low: 40,
          high: 60
        },
        high: {
          low: 60,
          high: 80
        }
      }
    },
    map_feature: {
      style: "mapbox://styles/mapbox/light-v9",
      zoom: 15,
      accessToken:
        "pk.eyJ1IjoiYWlyc2VuY2UiLCJhIjoiY2pqdTRudnptMHFkdzNqbXJudDlxNTNtNSJ9.SyH1YLu7o00oWFaK4A26XA"
    },
    chart_feature: {
      largeFont: {
        type: "time",
        bounds: "ticks",
        distribution: "series",
        time: {
          unit: "second",
          parser: "YYYY-MM-DD HH-mm-ss",
          displayFormats: {
            second: "MMM DD HH:mm"
          }
        },
        ticks: {
          source: "labels",
          maxRotation: 0,
          fontSize: 14,
          fontColor: "#515151"
        }
      },
      smallFont: {
        type: "time",
        bounds: "ticks",
        distribution: "series",
        time: {
          unit: "second",
          parser: "YYYY-MM-DD HH-mm-ss",
          displayFormats: {
            second: "MMM DD HH:mm"
          }
        },
        ticks: {
          source: "labels",
          maxRotation: 0,
          fontSize: 10,
          fontColor: "#515151"
        }
      },
      o3_yAxes: {
        ticks: {
          beginAtZero: true,
          fontSize: 14,

          min: 0
        },
        fontColor: "#515151"
      },
      o3_yAxes_half: {
        ticks: {
          beginAtZero: true,
          fontSize: 14,
          max: 80,
          min: 0
        },
        fontColor: "#515151"
      },
      so2_yAxes: {
        ticks: {
          beginAtZero: true,
          fontSize: 14,

          min: 0
        },
        fontColor: "#515151"
      },
      so2_yAxes_half: {
        ticks: {
          beginAtZero: true,
          fontSize: 14,
          max: 5,
          min: 0
        },
        fontColor: "#515151"
      },
      co2_yAxes: {
        ticks: {
          beginAtZero: true,
          fontSize: 14,

          min: 0
        },
        fontColor: "#515151"
      },
      co2_yAxes_half: {
        ticks: {
          beginAtZero: true,
          fontSize: 14,
          max: 6000,
          min: 0
        },
        fontColor: "#515151"
      },
      no2_yAxes: {
        ticks: {
          beginAtZero: true,
          fontSize: 14,

          min: 0
        },
        fontColor: "#515151"
      },
      no2_yAxes_half: {
        ticks: {
          beginAtZero: true,
          fontSize: 14,
          max: 80,
          min: 0
        },
        fontColor: "#515151"
      },
      no_yAxes: {
        ticks: {
          beginAtZero: true,
          fontSize: 14,

          min: 0
        },
        fontColor: "#515151"
      },
      no_yAxes_half: {
        ticks: {
          beginAtZero: true,
          fontSize: 14,
          max: 250,
          min: 0
        },
        fontColor: "#515151"
      },
      co_yAxes: {
        ticks: {
          beginAtZero: true,
          fontSize: 14,

          min: 0
        },
        fontColor: "#515151"
      },
      co_yAxes_half: {
        ticks: {
          beginAtZero: true,
          fontSize: 14,
          max: 6000,
          min: 0
        },
        fontColor: "#515151"
      },
      aqhi_yAxes: {
        ticks: {
          beginAtZero: true,
          fontSize: 14,

          min: 0
        },
        fontColor: "#515151"
      },
      aqhi_yAxes_half: {
        ticks: {
          beginAtZero: true,
          fontSize: 14,
          max: 7,
          min: 0
        },
        fontColor: "#515151"
      },
      pm2_5_yAxes: {
        ticks: {
          beginAtZero: true,
          fontSize: 14,

          min: 0
        },
        fontColor: "#515151"
      },
      pm2_5_yAxes_half: {
        ticks: {
          beginAtZero: true,
          fontSize: 14,
          max: 25,
          min: 0
        },
        fontColor: "#515151"
      },
      pm10_yAxes: {
        ticks: {
          beginAtZero: true,
          fontSize: 14,

          min: 0
        },
        fontColor: "#515151"
      },
      pm10_yAxes_half: {
        ticks: {
          beginAtZero: true,
          fontSize: 14,
          max: 40,
          min: 0
        },
        fontColor: "#515151"
      }
    },
    colorMap_old: {
      high: "#D7191C",
      medium_high: "#FD9935",
      medium: "#FFFF4D",
      low: "#91D049",
      very_low: "#1A9641"
    },
    colorMap: {
      very_low: "#00ccff",
      low: "#006699",
      medium: "#ffcc00",
      medium_high: "#ff6666",
      high: "#cc0000"
    },
    unitArray: ["co", "no2", "no", "aqhi", "o3", "pm2_5", "so2", "co2", "pm10"],
    pastDue: 6,
    checkDays: 14,
    mapCenter: { lat: 43.71151, lng: -79.541739 },
    lastClick: 31025,
    refreshTimeChart: 1800000,
    refreshTimeButton: 180000,
    buttonList: [
      { name: "CO", sub: "", unit: "co" },
      { name: "NO", sub: "", unit: "no" },
      { name: "NO", sub: "2", unit: "no2" },
      { name: "PM", sub: "2.5", unit: "pm2_5" },
      { name: "SO", sub: "2", unit: "so2" },
      { name: "O", sub: "3", unit: "o3" },
      { name: "CO", sub: "2", unit: "co2" },
      { name: "PM", sub: "10", unit: "pm10" }
    ],
    guide_step: [
      {
        element: "data-panel",
        title: "Pollutant Button",
        content:
          "Number in the button shows consentration of that pollutant.Click the button you can see trend of that pollutant in the chart"
      },
      {
        element: "chart",
        title: "Pollutant Chart",
        content: "Here is chart that shows the trend of chosen pollutant."
      },
      {
        element: "period",
        title: "Period Choose Button",
        content: "Click the button for different period of time trend."
      },
      {
        element: "info-section",
        title: "Pollutant information",
        content:
          "Here is some brief introduction of chosen pollutant.Click 'Click Here' for more information."
      },
      {
        element: "map",
        title: "Device Location",
        content:
          "Pins in the map shown where those AisSENCE deivce is deployed.Click the pin to get pollutant data of that device. Color of the pin shows the AQHI level of that area."
      }
    ],

    infoSection: [
      {
        id: 1,
        name: "aqhi",
        brief:
          "The Air Quality Health Index (AQHI) is an air quality scale from 1-10+ that can help you make decisions so as to reduce health risks arising from your exposure to air pollution.",
        detail:
          "<b>The Air Quality Health Index (AQHI)</b> is an overall air quality indicator that signifies its potential risk to your health on a scale from 1 to 10, with 1 being low health risk and 10 being a very high health risk. The index provides a simple scale to allow people to tailor their activities according to outdoor air quality. The index takes into account nitrogen dioxide, ozone, and fine particulate matter levels for its calculation. Further details on AQHI can be found on the Ministry of Environment and Climate Change information page: <br/>",
        link: "http://www.airqualityontario.com/science/aqhi_description.php"
      },
      {
        id: 2,
        name: "co",
        brief:
          "Carbon Monoxide (CO) is produced by incomplete combustion from vehicles. Colourless and odourless, it can reduce oxygen delivery within the human body.",
        detail:
          "<b>Carbon Monoxide (CO)</b> is produced by incomplete combustion. CO is an odourless, tasteless, and poisonous gas, though it does not usually exist at high enough concentrations to cause acute damage; typical levels are around 100 ppb (0.1 ppm), whereas toxic effects are generally seen above 35 ppm. CO is an indicator of traffic pollution as the vast majority of CO is produced by vehicular emissions, often by cars that are poorly maintained or have defective catalytic converters in their exhaust systems. Further details on CO can be found on the Ministry of Environment and Climate Change information page: <br/>",
        link: "http://www.airqualityontario.com/science/pollutants/carbon.php"
      },
      {
        id: 3,
        name: "co2",
        brief:
          "Carbon dioxide(CO<sub>2</sub>) is the main product of combustion and respiration processes and typically occurs at concentrations near 400 ppm.",
        detail:
          "<b>Carbon dioxide(CO<sub>2</sub>)</b> is a naturally occurring molecule that forms as a result of respiration processes. CO<sub>2</sub> is a greenhouse gas (GHG) due to its ability to trap heat from the sun within Earth's atmosphere, which keeps the world at a livable temperature. Ambient concentration of CO<sub>2</sub> has risen from pre-industrial levels of ~280 ppm to the current average of ~410 ppm, most likely due to human activity. This increased abundance of CO<sub>2</sub> traps extra energy and heat from the sun, which is believed to be detrimental to climate stability. Further details on CO<sub>2</sub> can be found on the Global CCS Institute information page:<br/>",
        link:
          "https://hub.globalccsinstitute.com/publications/what-happens-when-co2-stored-underground-qa-ieaghg-weyburn-midale-co2-monitoring-and-storage-project/1-what-carbon-dioxide-co2"
      },
      {
        id: 4,
        name: "no",
        brief:
          "Nitric Oxide (NO) is a strong indicator of diesel vehicle emissions but can also come from other combustion processes.",
        detail:
          "<b>Nitrogen Oxide (NO)</b> is a strong indicator of diesel vehicle emissions but can also come from other combustion processes. Concentrations across cities can be highly variable with greater concentrations found near primary sources (e.g. highways, loading docks). Nitric oxide can irritate the throat and promote asthma attacks in susceptible individuals. This pollutant is rapidly oxidized under most ambient conditions to nitrogen dioxide (NO<sub>2>/sub>), which is significantly more hazardous to health. Although comparatively safe, NO can be a useful indicator of traffic density and composition.",
        link: ""
      },
      {
        id: 5,
        name: "no2",
        brief:
          "Nitrogen Dioxide (NO<sub>2</sub>) is a by-product of incomplete combustion (gasoline, natural gas, coal) which can cause smog, airway irritation, and induce attacks in asthmatics.",
        detail:
          "<b>Nitrogen Dioxide (NO<sub>2</sub>)</b> is a by-product of incomplete combustion (diesel, gasoline, natural gas, coal). It is a major component in smog formation and a useful indicator of vehicle emissions. Concentrations of NO<sub>2</sub> vary across cities and tend to be higher near major roads with greater numbers of heavy-duty diesel vehicles. Nitrogen oxide (NO) is converted to NO<sub>2</sub> by reaction with ozone (O<sub>3</sub>),causing the ratio of these two pollutants to change rapidly near emission sources. The proposed Canadian Ambient Air Quality Standards for 2020 are 17 ppb (annual average of 1-hour values) and 60 ppb (3-year average of annual 98th percentile of daily 1-hour maximum values). Further details on NO<sub>2</sub> can be found on the Ministry of Environment and Climate Change information page:<br/>",
        link: "http://www.airqualityontario.com/science/pollutants/nitrogen.php"
      },
      {
        id: 6,
        name: "o3",
        brief:
          "Ozone (O<sub>3</sub>) is an irritant and a major component of smog. It typically has similar concentrations across a city.",
        detail:
          "<b>Ozone (O<sub>3</sub>)</b> is a colourless gas created through a reaction of sunlight and emissions from incomplete combustion (NO<sub>x</sub> and volatile organic carbon compounds). Ozone is a major component of smog and has been linked to increased hospital emissions and premature death. Ozone can also irritate the respiratory tract and eyes. Concentrations of ozone tend to be similar across a city and the concentrations may be lower in locations with high traffic. While ozone in the upper atmosphere is protective, exposure to ozone at ground level can impact health. The current Canadian Ambient Air Quality Standard (2015) is 63 ppb (3-year average of the annual 4th highest daily 8-hour averaged concentration). Further details on O<sub>3</sub> can be found on the Ministry of Environment and Climate Change information page: <br/>",
        link: "http://www.airqualityontario.com/science/pollutants/ozone.php"
      },
      {
        id: 7,
        name: "pm2_5",
        brief:
          "Fine Particulate Matter (PM<sub>2.5</sub>) is all airborne particles with a diameter of 2.5 microns or less.",
        detail:
          "<b>Fine Particulate Matter (PM<sub>2.5</sub>)</b> includes any airborne particle (e.g. smoke, fumes, dust, ash, and pollen) with a diameter of 2.5 microns or less. PM<sub>2.5</sub> has been associated with increased hospital visits and premature death, especially amongst children, the elderly, and those with respiratory issues. PM<sub>2.5</sub> can have elevated concentrations near sources (e.g. barbecues, fires, construction) but otherwise has concentrations that are generally similar across an urban area. The current (2015) Canadian Ambient Air Quality Standards are 10 µg/m<sup>3</sup> (annual) and 28 µg/m<sup>3</sup> (24-hour) based on three-year averaging. Further details on PM<sub>2.5</sub> can be found on the Ministry of Environment and Climate Change information page: <br/>",
        link:
          "http://www.airqualityontario.com/science/pollutants/particulates.php"
      },
      {
        id: 8,
        name: "pm10",
        brief:
          "PM<sub>10</sub> includes airborne particles of diameter between 2.5 and 10 microns.",
        detail:
          "<b>PM<sub>10</sub></b> includes airborne particles of diameter between 2.5 and 10 microns. Particles of this size are able to penetrate the deeper parts of the lungs, but do not affect the air exchange regions (alveoli) as readily as PM<sub>2.5</sub>. For this reason, most authorities set standards for PM<sub>10</sub> concentrations in ambient air to be higher than those for PM<sub>2.5</sub>. Environment Canada currently does not consider PM10 to be a criteria air pollutant and does not set air quality standards for this pollutant. Further details on PM<sub>10</sub> can be found on the Ministry of Environment and Climate Change information page: <br/>",
        link:
          "http://www.airqualityontario.com/science/pollutants/particulates.php"
      },
      {
        id: 9,
        name: "so2",
        brief:
          "Sulfur dioxide(SO<sub>2</sub>) is an invisible gas with a sharp, pungent odour. It reacts easily with other substances to form harmful compounds, such as sulfuric acid, sulfurous acid and sulfate particles.",
        detail:
          "<b>Sulfur dioxide(SO<sub>2</sub>)</b> is a colourless gas which is responsible for the smell of burnt matches. At higher concentrations, the odour becomes sharp, pungent, and choking. It can be oxidized to sulphur trioxide, which in the presence of water vapour is readily transformed to sulphuric acid mist. SO<sub>2</sub> is a major contributor to acid rain, although steps undertaken in the last 50 years or so to clean up industrial emissions have greatly reduced its concentrations in Europe and North America. It is a precursor to sulphates, which are one of the main components of respirable particles in the atmosphere. Further details on SO<sub>2</sub> can be found on the Ministry of Environment and Climate Change information page: <br/>",
        link: "http://www.airqualityontario.com/science/pollutants/sulphur.php"
      },
      {
        id: 10,
        name: "about",
        brief: "",
        detail:
          "<b>The AirSENCE system</b> accurately monitors the Air Quality Health Index (AQHI) as well as five other harmful pollutants in the air we breathe and provides observable data on each in real time. Learn more here:<br/>",
        link: "http://airsence.augsignals.com/"
      }
    ],
    header: {
      slogen: "HOW CLEAN IS YOUR AIR?",
      slogen_1: "BREATHE SAFE",
      slogen_2: "BREATHE EASY"
    },
    navbar: {
      FirstButton: "About",
      SecondButton: "User Guide",
      Resources: {
        name: "Resources",
        link: "/resources"
      },
      Twitter: {
        link: "https://twitter.com/theairsence",
        image: "images/twitter.png"
      },
      ContactUs: {
        link: "http://augsignals.com/contact-us/",
        image: "images/envelope.png"
      },
      LastButton: {
        name: "Survey",
        link: "/survey"
      }
    },
    navButton: [
      {
        id: "resources",
        name: "Resources",
        link: "/resources",
        onClick: "",
        image: ""
      },
      {
        id: "twitter",
        name: "",
        link: "https://twitter.com/theairsence",
        onClick: "",
        image: "images/twitter.png"
      },
      {
        id: "contact-us",
        name: "",
        link: "http://augsignals.com/contact-us/",
        onClick: "",
        image: "images/envelope.png"
      },
      {
        id: "survey",
        name: "Survey",
        link: "/survey",
        onClick: "",
        image: ""
      }
    ],
    periodButton: [
      { id: 1, name: "Past Day", buttonID: "past_day" },
      { id: 2, name: "Past Week", buttonID: "past_week" },
      { id: 3, name: "Past 2 Weeks", buttonID: "past_2_weeks" }
    ],
    iconButton: [
      {
        display: "none",
        class: "fas fa-thermometer-half",
        id: "temperature"
      },
      {
        display: "none",
        class: "fas fa-tint",
        id: "humidity"
      },
      {
        display: "none",
        class: "fas fa-volume-up",
        id: "noise"
      }
    ],
    languageButton: {
      languages: ["English", "Chinese", "Greek"],
      enable: false
    },
    ppbConversion: {
      so2: 2.62,
      no2: 1.88,
      no: 1.25,
      o3: 2,
      co: 1.145,
      co2: 1.94
    }
  }
];
