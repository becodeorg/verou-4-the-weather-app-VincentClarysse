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
            default:    switch(city_array.indexOf(data.city.name)) {
                        case -1: createcard(data);
                        break;
                        default: console.log("already there")
            }
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

const city_array = [];

const createcard = (data) => {
    
    city_array.splice(0,0,data.city.name);
    console.log(city_array)

    const weather_row=document.createElement("div");
    weather_row.className="weatherrow";
    wrapper.appendChild(weather_row);


    const weather_in=document.createElement("p");
    weather_in.className="weather_in"
    weather_in.innerHTML="weather in "+data.city.name;
    weather_row.appendChild(weather_in);

    for(i=0;i<40;i=i+8) {
   
    const weathercard=document.createElement("div");
    weathercard.className="weathercard";
    weather_row.appendChild(weathercard);

    const icon = document.createElement("img");
    weathercard.appendChild(icon);
    icon.src="http://openweathermap.org/img/wn/"+ data.list[i].weather[0].icon +"@2x.png"

    const city_name = document.createElement("h2");
    weathercard.appendChild(city_name);
    city_name.innerText = data.city.name;

    const weatherdescription = document.createElement("p");
    weathercard.appendChild(weatherdescription);
    weatherdescription.innerText = data.list[i].weather[0].description;

    const current_temp = document.createElement("p");
    weathercard.appendChild(current_temp);
    current_temp.innerText = data.list[i].main.temp + " °C"
    
    // const min_temp = document.createElement("p");
    // weathercard.appendChild(min_temp);
    // min_temp.innerText = data.list[i].main.temp_min + " °C"

    // const max_temp = document.createElement("p");
    // weathercard.appendChild(max_temp);
    // max_temp.innerText = data.list[i].main.temp_max + " °C"
    }
}
