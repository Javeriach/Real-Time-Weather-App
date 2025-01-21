// Elements getters
let fullBox = document.getElementById('box');
let serchBTn = document.getElementById('search');
let temp = document.getElementById('temp');
let fullData = document.getElementById('fullData');
let cityName = document.getElementById('cityName');
let msg = document.getElementById('msg');
let darkBtn = document.getElementById('darkBtn');
let darkbtn_icon = document.getElementById('darkbtn_icon');
let icon = document.getElementById('icon');

// for displaying the already entered City related data on clicking the input to get new City's Data
cityName.addEventListener('click', function () {
  fullBox.classList.add('d-none');
  darkbtn_icon.classList.add('d-none');
  fullData.innerHTML = '';
  console.clear();
});

// To get Current City Data
serchBTn.addEventListener('click', function () {
  msg.classList.add('d-none');

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=33068c95f89daa7d00fc2220c223a8da&units=metric`
  )
    .then((response) => {
      if (!response.ok) {
        msg.classList.remove('d-none');
        setTimeout(() => {
          msg.classList.add('d-none');
        }, 3000);
      } else {
        return response.json();
      }
    })
    .then((response) => {
      if (response) {
        let country = response.sys.country;
        fullBox.classList.remove('d-none');
        let weather = response.weather;
        setIcons(weather[0].main);

        temp.innerHTML = response.main.temp + `&deg;C`;
        fullData.innerHTML = `
          <h4>Weather: ${weather[0].main}</h4>
          <h4>${cityName.value}, ${country}</h4>
          <h5 class="mt-0">Feels_like : ${
            response.main.feels_like + `&deg;C`
          } </h5>
          <h5 class="mt-0">Temp_min : ${response.main.temp_min + `&deg;C`}</h5>
          <h5 class="mt-0">Temp_max : ${response.main.temp_max + `&deg;C`} </h5>
          <h5 class="mt-0">Pressure : ${response.main.pressure} </h5>
          <h5 class="mt-0">Humidity: ${response.main.humidity + '%'} </h5>
        `;
        darkbtn_icon.classList.remove('d-none');
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

// Applying the dark Mode
darkBtn.addEventListener('click', function () {
  document.body.classList.toggle('dark-theme');

  if (document.body.classList.contains('dark-theme')) {
    fullBox.classList.remove('box_background');
    darkBtn.innerHTML = `<i class="fa-sharp fa-solid fa-sun fs-3"></i>`;
    darkBtn.classList.remove('bg-white');
    darkBtn.classList.add('bg-dark', 'text-light');
    darkBtn.classList.remove('text-dark');
  } else {
    fullBox.classList.add('box_background');
    darkBtn.innerHTML = `<i class="fa-duotone fa-moon fa-solid fs-3 mt-1"></i>`;
    darkBtn.classList.add('bg-white', 'text-dark');
    darkBtn.classList.remove('bg-dark', 'text-light');
  }
});

// ---------------------Functions Area-------------------------------------------

function setIcons(weather) {
  if (weather === `Smoke`) {
    icon.innerHTML = `<img src="./Images/smoke.png" class="image" >`;
  } else if (weather === `Rain`) {
    icon.innerHTML = `<img src="./Images/smoke.png" class="image" >`;
  } else if (weather === `Sunny`) {
    icon.innerHTML = ` <i id="sun" class="fa-sharp fa-solid fa-sun text-warning d-none"></i>`;
  } else if (weather === 'Clouds') {
    icon.innerHTML = ` <img src="./Images/cloud.png" class="image" id="cloud">`;
  } else if (weather === 'Clear') {
    icon.innerHTML = `<img src="./Images/clear-sky.png" class="image">`;
  } else if (weather === 'Thunderstorm') {
    icon.innerHTML = `<img src="./Images/thunderstorm.png" class="image">`;
  } else if (weather === 'Mist') {
    icon.innerHTML = ` <img src="./Images/mist (1).png" class="image">`;
  } else if (weather === 'Fog') {
    icon.innerHTML = `<img src="./Images/fog.png" class="image">`;
  } else if (weather === 'Haze') {
    icon.innerHTML = ` <img src="./Images/haze (3).png" class="image"> `;
  } else if (weather === 'Snowfall') {
    icon.innerHTML = ` <img src="./Images/snowflake.png" class="image">`;
  } else if (weather === 'Hot') {
    icon.innerHTML = `<img src="./Images/hot.png" class="image"> `;
  } else if (weather === 'Cold') {
    icon.innerHTML = `<img src="./Images/cold.png" class="image"> `;
  }
}
