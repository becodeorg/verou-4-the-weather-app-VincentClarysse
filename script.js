const wrapper = document.querySelector('.wrapper')

const foo = async () => {
    try {
        const result = await fetch('http://api.openweathermap.org/data/2.5/forecast?lat=51.05&lon=03.73&units=metric&appid=3ee1b28549d7bac27faae1a3fead6ee4');
        const data = await result.json()
        console.log(data);

        const weatherdescription = document.createElement("p");
        weathercard.appendChild(weatherdescription);
        weatherdescription.innerText = data.list[0].weather[0].description;

        const weathercard=document.createElement("div");
        weathercard.className="weathercard";
        wrapper.appendChild(weathercard);

        const city_name = document.createElement("h2");
        weathercard.appendChild(city_name);
        city_name.innerText = data.city.name;

        const current_temp = document.createElement("p");
        weathercard.appendChild(current_temp);
        current_temp.innerText = data.list[0].main.temp + " °C"
        
        const min_temp = document.createElement("p");
        weathercard.appendChild(min_temp);
        min_temp.innerText = data.list[0].main.temp_min + " °C"

        const max_temp = document.createElement("p");
        weathercard.appendChild(max_temp);
        max_temp.innerText = data.list[0].main.temp_max + " °C"
        
    } catch (err) {
        console.error(err)
    }
}

foo();
