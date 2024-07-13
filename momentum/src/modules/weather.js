export async function getWeather(city, onSuccess, onError) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=73df295429937e939bc0e3fcc39260d2&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(json => {
      if (json.cod == 200) {
        onSuccess({
          id: json.weather[0].id,
          temp: Math.round(json.main.temp),
          description: json.weather[0].description,
          speed: Math.round(json.wind.speed),
          humidity: json.main.humidity,
        });
      }

      let errorMessage = 'Error! ';

      if (json.cod == 400) {
        errorMessage += json.message + " ' '";
        onError({errorMessage});
      } else if (json.cod == 404) {
        errorMessage += json.message +` for "${city}"`;
        onError({errorMessage});
      }
      
      })
};
