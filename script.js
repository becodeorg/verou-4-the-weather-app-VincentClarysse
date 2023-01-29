const wrapper = document.querySelector('.wrapper');
const form = document.getElementById("weatherform");
const input = document.getElementById("weatherinput");

const city_array = [];

const getdayofweek = () => {
const d = new Date();
let today = d.getDay();

switch (today) {
    case 0: "Sunday"
    break;
    case 1: "Monday"
    break;
    case 2: "Tuesday"
    break;
    case 3: "Wednesday"
    break;
    case 4: "Thursday"
    break;
    case 5: "Friday"
    break;
    case 6: "saturday"
}
return today
}



form.addEventListener("submit", showweather = async (e) => {
    e.preventdefault;

        let location = input.value;
        const result = await fetch('http://api.openweathermap.org/data/2.5/forecast?q='+location+'&units=metric&appid=3ee1b28549d7bac27faae1a3fead6ee4');
        const data = await result.json()
        console.log(data);

        const unsplashresult = await fetch("https://api.unsplash.com/search/photos/?query="+data.city.name+"&orientation=landscape&client_id=cATbZHJ6_nm7HLBeUTM8DCHLc9XVaQFCntGhnII42fY");
        const unsplashdata = await unsplashresult.json();
        console.log(unsplashdata)

        const ratio_array = [];    
        for (i=0; i<unsplashdata.results.length; i++) {
            let aspectratio = unsplashdata.results[i].width / unsplashdata.results[i].height;
            if (aspectratio>2.7) {aspectratio = 0}
            ratio_array.push(aspectratio)
        }
        console.log(ratio_array)
        const bestratio = ratio_array.indexOf(Math.max(...ratio_array));
        console.log(bestratio)

        switch (data.cod) {
            default:    switch(city_array.indexOf(data.city.name)) { //prevent same place showing multiple times
                        case -1: createcard(data, unsplashdata, bestratio);
                        break;
                        default: console.log("already there")
            }
            break;
            case "400": console.log("nothing here") 
            break;
            case "404": console.log("not a place")
            break;
        }
})

const createcard = (data, unsplashdata, bestratio) => {
    
    city_array.splice(0,0,data.city.name);

    const wrapper_row=document.createElement("div");
    wrapper_row.className="wrapperrow";
    wrapper.insertBefore(wrapper_row, wrapper.firstChild);
    wrapper_row.style.backgroundImage="linear-gradient(gainsboro, gainsboro),url("+unsplashdata.results[bestratio].urls.regular+")"

    const weather_row=document.createElement("div");
    weather_row.className="weatherrow";
    wrapper_row.appendChild(weather_row);

    const weather_back=document.createElement("div");
    weather_back.className="weatherback";
    wrapper_row.appendChild(weather_back);

    // const bg_image=document.createElement("img");
    // bg_image.className="bg_image";
    // bg_image.src=unsplashdata.results[bestratio].urls.full;
    // weather_row.appendChild(bg_image);

    const weather_in=document.createElement("p");
    weather_in.className="weather_in"
    weather_in.innerHTML="Weather in<br>"+data.city.name;
    weather_back.appendChild(weather_in);

    for(i=0, x=0;i<40;i=i+8,x++) {
    
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
    weatherdescription.style.fontWeight="700";

    const current_temp = document.createElement("p");
    weathercard.appendChild(current_temp);
    current_temp.innerText = data.list[i].main.temp + " °C"

    const currentday = document.createElement("p");
    currentday.className='currentday';
    const day = data.list[i].dt_txt; 
    currentday.innerHTML = new Date(day).toLocaleDateString("en-US",{weekday: "long"});
    weathercard.appendChild(currentday);
    }
}

const close_button = document.querySelector("#close");

close_button.addEventListener("click", () => {
    for(i=0; wrapper.children.length > 0; i++) {
        wrapper.removeChild(wrapper.lastChild);
    }
    for(i=0; i<city_array.length;i++){
        city_array[i]="";
    }
})
