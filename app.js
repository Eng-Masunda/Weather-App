

//Get longitude and latitude of current location
window.addEventListener('load', ()=> {
    let long;
    let lat;
    //Get html elements
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let humidityDescription = document.querySelector('.humidity');
    let temperatureSection = document.querySelector('.temperature');
    let visibilitySection = document.querySelector('.visibility');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/d2920b04e084e0fce455f6cc70338058/${lat},${long}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                //selecting current data from API
                const { temperature, summary, humidity, visibility, icon } = data.currently;
                //Set DOM elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                humidityDescription.textContent = humidity;
                visibilitySection.textContent = visibility;
                //Formula to convert to degrees celsius
                let celsius = (temperature - 32) * ( 5 / 9 );
                //Set Icons
                setIcons(icon, document.querySelector(".icon"));
                //To switch between farenheit and degrees
                temperatureSection.addEventListener('click', () =>{
                    if (temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "°C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                });
            });
        });

    }else {
        h1.textContent = "Browser does not support geolocation";
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon =  icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});




