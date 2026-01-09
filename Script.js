

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
        temp.innerHTML = `The temperature in ${city} is ${data.current.temp_c}°C`;
        cityDisplay.innerHTML = `${data.location.name}, ${data.location.country}`;
        humidity.innerHTML = `${data.current.humidity}%`;
        wind.innerHTML = `${data.current.wind_kph} kph`;
        uvIndex.innerHTML = `${data.current.uv}`;
        let icon = data.current.condition.icon;
        disImage.innerHTML = `<img src="https:${icon}" alt="weather icon">`;
        feelsLike.innerHTML = `${data.current.feelslike_c}°C`;
    } catch (error) {
        alert("Something went wrong. Please try again.");
        console.error(error);
    }
    document.getElementById("city").value = "";

}
