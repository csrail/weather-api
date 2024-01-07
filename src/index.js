(() => {
    const unsecureWeatherApiKey = "25108cb167ef437d86b204741240201";
    const fetchWeatherApi =
        "https://api.weatherapi.com/v1/current.json?key=25108cb167ef437d86b204741240201&q=Hamilton New Zealand&aqi=no";

    function getLocationInfo(locationDataObject) {
        const obj = {};

        obj.name = locationDataObject.name;
        obj.country = locationDataObject.country;
        obj.timezone = locationDataObject.tz_id;
        obj.localtime = locationDataObject.localtime;

        return obj;
    }

    function getCurrentInfo(currentDataObject) {
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

    async function getWeatherInfo(searchTerm) {
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

    const weatherInfo = getWeatherInfo("Auckland");

    const locationInfo = weatherInfo.then((jsonData) =>
        getLocationInfo(jsonData.location),
    );

    function displayLocationInfo(locationDataObject) {
        const mainComponent = document.createElement("div");

        const cityComponent = document.createElement("div");
        const citySubComponent = document.createElement("div");
        const cityDescriptorElement = document.createElement("div");
        const cityInfoElement = document.createElement("div");

        cityDescriptorElement.textContent = "City";
        cityInfoElement.textContent = locationDataObject.name;
        citySubComponent.append(cityDescriptorElement, cityInfoElement);

        cityComponent.append(citySubComponent);
        mainComponent.append(cityComponent);

        const countryComponent = document.createElement("div");
        const countrySubComponent = document.createElement("div");
        const countryDescriptorElement = document.createElement("div");
        const countryInfoElement = document.createElement("div");

        countryDescriptorElement.textContent = "Country";
        countryInfoElement.textContent = locationDataObject.country;
        countrySubComponent.append(
            countryDescriptorElement,
            countryInfoElement,
        );

        countryComponent.append(countrySubComponent);
        mainComponent.append(countryComponent);

        const timezoneComponent = document.createElement("div");
        const timezoneSubComponent = document.createElement("div");
        const timezoneDescriptorElement = document.createElement("div");
        const timezoneInfoElement = document.createElement("div");

        timezoneDescriptorElement.textContent = "Timezone";
        timezoneInfoElement.textContent = locationDataObject.timezone;
        timezoneSubComponent.append(
            timezoneDescriptorElement,
            timezoneInfoElement,
        );

        timezoneComponent.append(timezoneSubComponent);
        mainComponent.append(timezoneComponent);

        const localtimeComponent = document.createElement("div");
        const localtimeSubComponent = document.createElement("div");
        const localtimeDescriptorElement = document.createElement("div");
        const localtimeInfoElement = document.createElement("div");

        localtimeDescriptorElement.textContent = "Time";
        localtimeInfoElement.textContent = locationDataObject.localtime;
        localtimeSubComponent.append(
            localtimeDescriptorElement,
            localtimeInfoElement,
        );

        localtimeComponent.append(localtimeSubComponent);
        mainComponent.append(localtimeComponent);

        document.body.append(mainComponent);
}

    locationInfo.then((locationDataObject) => {
        displayLocationInfo(locationDataObject)
    });

    const currentInfo = weatherInfo.then((jsonData) =>
        getCurrentInfo(jsonData.current),
    );

    function displayCurrentInfo(currentDataObject) {
        const mainComponent = document.createElement("div");

        const lastUpdatedComponent = document.createElement("div");
        const lastUpdatedSubComponent = document.createElement("div");
        const lastUpdatedDescriptorElement = document.createElement("div");
        const lastUpdatedInfoElement = document.createElement("div");

        lastUpdatedDescriptorElement.textContent = "Last Updated:";
        lastUpdatedInfoElement.textContent =
            currentDataObject.lastUpdated;
        lastUpdatedSubComponent.append(
            lastUpdatedDescriptorElement,
            lastUpdatedInfoElement,
        );

        lastUpdatedComponent.append(lastUpdatedSubComponent);
        mainComponent.append(lastUpdatedComponent);

        const temperatureComponent = document.createElement("div");
        const temperatureSubComponent = document.createElement("div");
        const temperatureDescriptorElement = document.createElement("div");
        const temperatureInfoElement = document.createElement("div");

        temperatureDescriptorElement.textContent = "Temperature";
        temperatureInfoElement.textContent = `${currentDataObject.temperature}\u00B0C`;
        temperatureSubComponent.append(
            temperatureDescriptorElement,
            temperatureInfoElement,
        );

        temperatureComponent.append(temperatureSubComponent);
        mainComponent.append(temperatureComponent);

        const conditionTextComponent = document.createElement("div");
        const conditionTextSubComponent = document.createElement("div");
        const conditionTextDescriptorElement = document.createElement("div");
        const conditionTextInfoElement = document.createElement("div");

        conditionTextDescriptorElement.textContent = "Condition";
        conditionTextInfoElement.textContent = `${currentDataObject.conditionText}`;
        conditionTextSubComponent.append(
            conditionTextDescriptorElement,
            conditionTextInfoElement,
        );

        conditionTextComponent.append(conditionTextSubComponent);
        mainComponent.append(conditionTextComponent);


        const conditionIconComponent = document.createElement("div");
        const conditionIconSubComponent = document.createElement("div");
        const conditionIconDescriptorElement = document.createElement("div");
        const conditionIconImageElement = document.createElement("img");

        conditionIconDescriptorElement.textContent = "";
        conditionIconImageElement.src = `${currentDataObject.conditionIcon}`;
        conditionIconSubComponent.append(
            conditionIconDescriptorElement,
            conditionIconImageElement,
        );

        conditionIconComponent.append(conditionIconSubComponent);
        mainComponent.append(conditionIconComponent);

        document.body.append(mainComponent);
    }

    currentInfo.then((currentDataObject) => {
        displayCurrentInfo(currentDataObject)
    });

    const formElement = document.createElement("form");
    const inputSearchElement = document.createElement("input");
    inputSearchElement.setAttribute("type", "text");

    const inputSubmitElement = document.createElement("input");
    inputSubmitElement.setAttribute("type", "submit")

    formElement.addEventListener("submit", (e) => {
       e.preventDefault()
       getWeatherInfo(inputSearchElement.value).then((weatherInfoResponse) => {
           displayLocationInfo(getLocationInfo(weatherInfoResponse.location));
           displayCurrentInfo(getCurrentInfo(weatherInfoResponse.current))
       })
    })

    formElement.append(inputSearchElement, inputSubmitElement)
    document.body.append(formElement)


    return {};
})();
