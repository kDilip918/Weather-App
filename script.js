

const cityEl = document.getElementById("city");
const searchBtn = document.getElementById("findCityBtn");

cityEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        searchBtn.click();
    }
});

// find city weather

async function findCity() {

    // accessing the elements where values to putted
    const temp = document.getElementById("temp");
    let cityDisplay = document.getElementById("city-display");
    const disImage = document.querySelector(".dis-img");
    let city = document.getElementById("city").value.trim();
    const humidity = document.getElementById("humidity");
    const wind = document.getElementById("wind");
    const uvIndex = document.getElementById("uvIndex");
    const feelsLike = document.getElementById("feelsLike");

    // empty city validation
    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    // API key & URL
    const API_KEY = "ca57bf760ca54def999164133260501";
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`;

    try {
        // response
        let response = await fetch(url);
        if (!response.ok) {
            alert("City not found");
            return;
        }
        // defining data
        let data = await response.json();
        // output
        console.log(data);
        temp.innerHTML = `The temperature in ${city.toUpperCase()} is ${data.current.temp_c}°C`;
        cityDisplay.innerHTML = `${data.location.name.toUpperCase()}, ${data.location.country.toUpperCase()}`;
        humidity.innerHTML = `${data.current.humidity}%`;
        let icon = data.current.condition.icon;
        wind.innerHTML = `${data.current.wind_kph} kph`;
        uvIndex.innerHTML = `${data.current.uv}`;
        disImage.innerHTML = `<img src="https:${icon}" alt="weather icon">`;
        feelsLike.innerHTML = `${data.current.feelslike_c}°C`;
        function showRecentCities() {
            console.log("Recent Cities function called");
            let forcastWeek = document.querySelector(".forcast");
            let citiesList = document.createElement("div");
            citiesList.classList.add("forcast-week");
            citiesList.innerHTML = `
            <h4>${city.toUpperCase()}</h4>
            <img src="https:${icon}" alt="weather icon">
            <h4>${data.current.condition.text}</h4>
            <h4>${data.current.temp_c}°C</h4>
            `;

            // forcastWeek.prepend(citiesList);
            forcastWeek.prepend(citiesList);
        }
        showRecentCities();
    } catch (error) {
        alert("Something went wrong. Please try again.");
        console.error(error);
    }
    document.getElementById("city").value = "";
    // function to show recent searched cities
}


// function to show map section
function showMap() {
    document.title = "Weather App: Map";
    console.log("Map function called");
    const main = document.querySelector(".main");
    main.style.display = "none";
    const recentCitiesSection = document.querySelector(".main-cities");
    recentCitiesSection.style.display = "none";
    const mapSection = document.querySelector(".showMap");
    mapSection.style.display = "flex";
}
// function to show weather main section
function showWeather() {
    console.log("Weather function called");
    document.title = "Weather App";
    const main = document.querySelector(".main");
    main.style.display = "flex";
    const recentCitiesSection = document.querySelector(".main-cities");
    recentCitiesSection.style.display = "none";
    const mapSection = document.querySelector(".showMap");
    mapSection.style.display = "none";
}

// function for dark Mode and LIght mode
function changeMode() {
    console.log("yes I am mode");
    
    const modeBtn = document.getElementById("modeChange");
    const container = document.querySelector(".container");
    const displayLeft = document.querySelector(".display-left");
    const aircondition = document.querySelector(".air-condition");
    modeBtn.textContent =
        container.style.background === "white"
            ? "Light"
            : "Dark";
    aircondition.style.backgroundColor =
        container.style.background === "white"
            ? "rgb(57, 58, 57)"
            : " rgb(136, 173, 136)";  

    

    container.style.background =
        container.style.background === "white"
            ? "rgb(83 82 82)"
            : "white";

    displayLeft.style.color =
        container.style.background === "white"
            ? "black"
            : "white";

}

