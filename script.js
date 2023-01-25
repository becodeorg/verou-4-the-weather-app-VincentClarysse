
const city_name = document.getElementById("cityheader")
const current_temp = document.getElementById("currenttemp")
const min_temp = document.getElementById("mintemp")
const max_temp = document.getElementById("maxtemp")
const weatherdescription = document.getElementById("description")
const icon = document.getElementById("icon")

const foo = async () => {
    try {
        const result = await fetch('http://api.openweathermap.org/data/2.5/forecast?lat=51.05&lon=03.73&units=metric&appid=3ee1b28549d7bac27faae1a3fead6ee4');
        const data = await result.json()
        console.log(data);

        city_name.innerText = data.city.name
        current_temp.innerText = data.list[0].main.temp + " °C"
        min_temp.innerText = data.list[0].main.temp_min + " °C"
        max_temp.innerText = data.list[0].main.temp_max + " °C"
        weatherdescription.innerText = data.list[0].weather[0].description;

    } catch (err) {
        console.error(err)
    }
}

foo();
