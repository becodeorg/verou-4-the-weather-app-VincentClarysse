const wrapper = document.querySelector('.wrapper');
const form = document.getElementById("weatherform");
const input = document.getElementById("weatherinput");

form.addEventListener("submit", showweather = async (e) => {
    e.preventdefault;
    // try {
        let location = input.value;
        const result = await fetch('http://api.openweathermap.org/data/2.5/forecast?q='+location+'&units=metric&appid=3ee1b28549d7bac27faae1a3fead6ee4');
        const data = await result.json()
        
        console.log(data);


        switch (data.cod) {
            default: createcard(data);
            console.log(data.cod+ " default");
            break;
            case "400": console.log("nothing here")
            break;
            case "404": console.log("not a place")
            break;
        }

        
    // } 
    // // catch (err) {
    // //     console.error(err)
    // // }
})

const createcard = (data) => {
    const weathercard=document.createElement("div");
    weathercard.className="weathercard";
    wrapper.appendChild(weathercard);

    const icon = document.createElement("img");
    weathercard.appendChild(icon);
    icon.src="http://openweathermap.org/img/wn/"+ data.list[0].weather[0].icon +"@2x.png"

    const city_name = document.createElement("h2");
    weathercard.appendChild(city_name);
    city_name.innerText = data.city.name;

    const weatherdescription = document.createElement("p");
    weathercard.appendChild(weatherdescription);
    weatherdescription.innerText = data.list[0].weather[0].description;

    const current_temp = document.createElement("p");
    weathercard.appendChild(current_temp);
    current_temp.innerText = data.list[0].main.temp + " °C"
    
    const min_temp = document.createElement("p");
    weathercard.appendChild(min_temp);
    min_temp.innerText = data.list[0].main.temp_min + " °C"

    const max_temp = document.createElement("p");
    weathercard.appendChild(max_temp);
    max_temp.innerText = data.list[0].main.temp_max + " °C"
}
