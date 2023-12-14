// Elements getters
let fullBox = document.getElementById('box');
let serchBTn = document.getElementById('search');
let temp = document.getElementById('temp');
let fullData = document.getElementById('fullData');
let cityName = document.getElementById('cityName');
let tempWritten = document.getElementById('temperature');
let msg = document.getElementById('msg');
let darkBtn = document.getElementById('darkBtn');
let darkbtn_icon = document.getElementById('darkbtn_icon');
let icon = document.getElementById('icon');

// for displaying the alread City related on clicking the input to get new City's Data
cityName.addEventListener('click', function () {
  fullBox.classList.add('d-none');
  darkbtn_icon.classList.add('d-none');
  fullData.innerHTML = '';
  console.clear();
});

// To get Current City Data

serchBTn.addEventListener('click', function () {
  msg.classList.add('d-none');

  let response = fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=33068c95f89daa7d00fc2220c223a8da&units=metric`
  );
  let output = response
    .then((response) => {
      if (response.ok !== true) {
        msg.classList.remove('d-none');
        setTimeout(() => {
          msg.classList.add('d-none');
        }, 3000);
      } else {
        let ans = response.json();
        return ans;
      }
    })
    .then((response) => {
      if (response !== undefined) {
        let country = response.sys.country;
        let date;

        let timeString;

        timeString = giveTime(country);

        timeString.then((time) => {
          fullBox.classList.remove('d-none');
          let weather = response.weather;
          setIcons(weather[0].main);

          temp.innerHTML = response.main.temp + `&deg;C`;
          fullData.innerHTML = `
                            <h4>Weather: ${weather[0].main}</h4>
                            <h4>Time:${time.time}</h4>
                            <h4>Date:${time.date}</h4>
                            <h4>${cityName.value},${country}</h4>
                            <h5 class="mt-0">Feels_like : ${
                              response.main.feels_like + `&deg;C`
                            } </h5>
                            <h5  class="mt-0">Temp_min : ${
                              response.main.temp_min + `&deg;C`
                            }</h5>
                            <h5  class="mt-0">Temp_max : ${
                              response.main.temp_max + `&deg;C`
                            } </h5>
                            <h5  class="mt-0">Pressure : ${
                              response.main.pressure
                            } </h5>
                            <h5  class="mt-0">Humidity: ${
                              response.main.humidity + '%'
                            } </h5>
                           `;
          darkbtn_icon.classList.remove('d-none');
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

// Applyin the dark Mode
darkBtn.addEventListener('click', function () {
  document.body.classList.toggle('dark-theme');

  if (document.body.classList.contains('dark-theme')) {
    // for removing the box background images
    fullBox.classList.remove('box_background');
    // after aplying dark background we are adding changing the dark mode symbol into light mode icon
    darkBtn.innerHTML = `<i   class="fa-sharp fa-solid fa-sun fs-3" ></i>`;
    // for changing the dark mode button background
    darkBtn.classList.remove('bg-white');
    darkBtn.classList.add('bg-dark');
    darkBtn.classList.remove('text-dark');
    darkBtn.classList.add('text-light');
  } else {
    fullBox.classList.add('box_background');
    // for reverting the colors
    darkBtn.innerHTML = `<i class="fa-duotone fa-moon fa-solid fs-3 mt-1"></i>`;
    darkBtn.classList.add('bg-white');
    darkBtn.classList.remove('bg-dark');
    darkBtn.classList.add('text-dark');
    darkBtn.classList.remove('text-light');
  }
});

// ---------------------Functions Area-------------------------------------------

function setIcons(weather) {
  // set Display all the icons to display none at the start

  if (weather === `Smoke`) {
    icon.innerHTML = `<img src="./Images/smoke.png" class="image" >`;
  } else if (weather === `Rain`) {
    icon.innerHTML = `<img src="./Images/smoke.png" class="image" >`;
  } else if (weather === `Sunny`) {
    icon.innerHTML = ` <i  id="sun" class="fa-sharp fa-solid fa-sun text-warning d-none" ></i>`;
  } else if (weather === 'Clouds') {
    icon.innerHTML = `  <img src="./Images/cloud.png"  class="image" id="cloud">`;
  } else if (weather === 'Clear') {
    icon.innerHTML = `<img src="./Images/clear-sky.png" class="image ">`;
  } else if (weather === 'Thunderstorm') {
    icon.innerHTML = `<img src="./Images/thunderstorm.png"  class="image ">`;
  } else if (weather === 'Mist') {
    icon.innerHTML = ` <img  src="./Images/mist (1).png"  class="image ">`;
  } else if (weather === 'Fog') {
    icon.innerHTML = `<img  src="./Images/fog.png" class="image">`;
  } else if (weather === 'Haze') {
    icon.innerHTML = ` <img  src="./Images/haze (3).png"  class="image"> `;
  } else if (weather === 'Snowfall') {
    icon.innerHTML = ` <img  src="./Images/snowflake.png"  class="image ">`;
  } else if (weather === 'Hot') {
    icon.innerHTML = `<img  src="./Images/hot.png"  class="image "> `;
  } else if (weather === 'Cold') {
    icon.innerHTML = `<img src="./Images/cold.png"  class="image ">  `;
  }
}

// for getting the current City Time
function giveTime(country) {
  // As the API is not giving the correct info time about india so use special case for india
  if (country === 'IN') {
    let currentDate = new Date();
    // Format the date and time
    const indianDateTime = currentDate.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
    });

    let date = indianDateTime.split(',');

    let timeString = {};

    let dateSlash = date[0];

    let dateSections = dateSlash.split('/');

    let indainMonth;
    if (dateSections[1] <= 9) {
      indainMonth = '0' + dateSections[1];
    }
    let monthName = giveMonthname(indainMonth);
    let dateStrig = `${monthName} ${dateSections[0]}, ${dateSections[2]}`;

    timeString.date = dateStrig;
    timeString.time = date[1];

    //  here we are making a promise to return data as Promise because at this function calling is receiving it a as a Promise
    return new Promise((resole, reject) => {
      // When it will resole then it will give the timeString data
      resole(timeString);
    });
  }
  //    for the all countries time except India
  else {
    const apiUrl = `https://api.api-ninjas.com/v1/worldtime?city=${cityName.value}`;

    const headers = {
      'X-Api-Key': 'LmDGwxQ1VVrJrhE+eg5eUg==5mdzcUVAZ84wsSjo',
    };

    let time = fetch(apiUrl, { headers: headers });
    let timePromis = time
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        // for displaying the date in WeekDay monthName date, year
        // for displaying the time and date in hour:minutes:seconds AmoPm

        // getting segments for the time and date from the given Api respnse
        let hour = result.hour;

        let fulldate = result.datetime;
        let day_of_week = result.day_of_week;
        let seconds = result.second;
        let minutes = result.minute;

        let date = result.date;
        let day = result.day;
        let month = result.month;
        let year = result.year;
        let amOrpm = '';

        //    for Am or PM
        let presethour = hour % 12;
        hour >= 0 && hour === 11 ? (amOrpm = 'Am') : (amOrpm = 'Pm');
        hour >= 12 ? (amOrpm = 'Pm') : (amOrpm = 'Am');
        let monthName = giveMonthname(month);
        console.log(presethour);
        if (presethour === 0) {
          //    for 12%12 = 0 => 0=12 so
          presethour = 12;
        }
        let timeString = `${presethour}:${minutes}:${seconds} ${amOrpm}`;

        let dateString = ` ${day_of_week} ${monthName}  ${day}, ${year}`;
        let objectTime = {};
        objectTime.time = timeString;
        objectTime.date = dateString;

        //   Promise always return a Promise
        return objectTime;
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    return timePromis;
  }
}

// for getting the month name

function giveMonthname(monthN0) {
  switch (monthN0) {
    case '01': {
      return 'January';
    }

    case '02': {
      return 'Feb';
    }

    case '03': {
      return 'March';
    }

    case '04': {
      return 'April';
    }

    case '05': {
      return 'May';
    }

    case '06': {
      return 'June';
    }

    case '07': {
      return 'July';
    }

    case '08': {
      return 'August';
    }

    case '09': {
      return 'September';
    }

    case '10': {
      return 'October';
    }

    case '11': {
      return 'November';
    }

    case '12': {
      return 'December';
    }
  }
}
