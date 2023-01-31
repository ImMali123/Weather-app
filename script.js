function getLocation() {
  if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async position => {
          const long = position.coords.longitude;
          const lat = position.coords.latitude;
          console.log('Lat: ' +lat+ ' Long: ' +long);

          const data = await getWeatherdata(lat,long);
          renderWeatherdata(data);

          var map = L.map('map').setView([12.8878816, 77.6429334], 5);
          L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }).addTo(map);
        
          let marker = L.marker([lat, long]).addTo(map);
          marker.bindPopup(data.name).openPopup();

          map.on('click',async function(e) {
            console.log("Lat: " +e.latlng.lat+ "Long: " +e.latlng.lng);
            const data = await getWeatherdata(e.latlng.lat,e.latlng.lng);
            renderWeatherdata(data);
          })
      })
  }
}


// const myCallback=()=>{
//   console.log('i just woke up!');
// }

// setTimeout(myCallback,5000); //Set Timeout Higher order argument of function

async function getWeatherdata(lat,long) {
  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=ddfaba4398b491fa4ef3e29a5e934c6e`;

  let response = await fetch(api);
  let data = await response.json();

  console.log(data);
  return data;
}
getLocation();

getWeatherdata();

function renderWeatherdata(data){
  document.getElementById("name").innerHTML = data.name;
  document.getElementById("Temp").innerHTML = data.main.temp;
  document.getElementById("temp_Min").innerHTML = data.main.temp_min;
  document.getElementById("temp_Max").innerHTML = data.main.temp_max;
  document.getElementById("country").innerHTML = data.sys.country;
  document.getElementById("humidity").innerHTML = data.main.humidity;
  

}