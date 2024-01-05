(() => {
    const unsecureWeatherApiKey = "25108cb167ef437d86b204741240201";
    const fetchWeatherApi =
        "https://api.weatherapi.com/v1/current.json?key=25108cb167ef437d86b204741240201&q=Hamilton New Zealand&aqi=no";

    function getLocationInformation(locationDataObject) {
        const obj = {};

        obj.name = locationDataObject.name;
        obj.country = locationDataObject.country;
        obj.timezone = locationDataObject.tz_id;
        obj.localtime = locationDataObject.localtime;

        return obj;
    }

    function getCurrentInformation(currentDataObject) {
        const obj = {};

        obj.lastUpdated = currentDataObject.last_updated;
        obj.temperature = currentDataObject.temp_c;
        obj.conditionText = currentDataObject.condition.text;
        obj.conditionIcon = currentDataObject.condition.icon;
        obj.windDirection = currentDataObject.wind_dir;
        obj.windSpeed = currentDataObject.wind_kph;
        obj.humidity = currentDataObject.humidity;
        obj.precipitation = currentDataObject.precip_mm;

        return obj;
    }

    async function getWeatherInformation(searchTerm) {
        const url = `https://api.weatherapi.com/v1/current.json?key=25108cb167ef437d86b204741240201&q=${searchTerm}`;
        const urlBad = `https://api.weatherapi.com/v1/current.json?key=BadKey&q=${searchTerm}`;

        try {
            const fetchResponse = await fetch(url, { mode: "cors" });
            const responseBodyJSON = await fetchResponse.json();
            return responseBodyJSON;
        } catch (e) {
            console.log(e);
        }
    }

    const weatherInformation = getWeatherInformation("Auckland");

    const locationInformation = weatherInformation.then((jsonData) =>
        getLocationInformation(jsonData.location),
    );

    locationInformation.then((locationDataObject) => {
        console.log(locationDataObject);
    });

    const currentInformation = weatherInformation.then((jsonData) =>
        getCurrentInformation(jsonData.current),
    );

    currentInformation.then((currentDataObject) => {
        console.log(currentDataObject);
    });

    return {};
})();
