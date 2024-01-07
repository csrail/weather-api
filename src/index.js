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

    function displayLocationInformation(locationDataObject) {
        const mainComponent = document.createElement("div");

        const cityComponent = document.createElement("div");
        const citySubComponent = document.createElement("div");
        const cityDescriptorElement = document.createElement("div");
        const cityInformationElement = document.createElement("div");

        cityDescriptorElement.textContent = "City";
        cityInformationElement.textContent = locationDataObject.name;
        citySubComponent.append(cityDescriptorElement, cityInformationElement);

        cityComponent.append(citySubComponent);
        mainComponent.append(cityComponent);

        const countryComponent = document.createElement("div");
        const countrySubComponent = document.createElement("div");
        const countryDescriptorElement = document.createElement("div");
        const countryInformationElement = document.createElement("div");

        countryDescriptorElement.textContent = "Country";
        countryInformationElement.textContent = locationDataObject.country;
        countrySubComponent.append(
            countryDescriptorElement,
            countryInformationElement,
        );

        countryComponent.append(countrySubComponent);
        mainComponent.append(countryComponent);

        const timezoneComponent = document.createElement("div");
        const timezoneSubComponent = document.createElement("div");
        const timezoneDescriptorElement = document.createElement("div");
        const timezoneInformationElement = document.createElement("div");

        timezoneDescriptorElement.textContent = "Timezone";
        timezoneInformationElement.textContent = locationDataObject.timezone;
        timezoneSubComponent.append(
            timezoneDescriptorElement,
            timezoneInformationElement,
        );

        timezoneComponent.append(timezoneSubComponent);
        mainComponent.append(timezoneComponent);

        const localtimeComponent = document.createElement("div");
        const localtimeSubComponent = document.createElement("div");
        const localtimeDescriptorElement = document.createElement("div");
        const localtimeInformationElement = document.createElement("div");

        localtimeDescriptorElement.textContent = "Time";
        localtimeInformationElement.textContent = locationDataObject.localtime;
        localtimeSubComponent.append(
            localtimeDescriptorElement,
            localtimeInformationElement,
        );

        localtimeComponent.append(localtimeSubComponent);
        mainComponent.append(localtimeComponent);

        document.body.append(mainComponent);
}

    locationInformation.then((locationDataObject) => {
        displayLocationInformation(locationDataObject)
    });

    const currentInformation = weatherInformation.then((jsonData) =>
        getCurrentInformation(jsonData.current),
    );

    function displayCurrentInformation(currentDataObject) {
        const mainComponent = document.createElement("div");

        const lastUpdatedComponent = document.createElement("div");
        const lastUpdatedSubComponent = document.createElement("div");
        const lastUpdatedDescriptorElement = document.createElement("div");
        const lastUpdatedInformationElement = document.createElement("div");

        lastUpdatedDescriptorElement.textContent = "Last Updated:";
        lastUpdatedInformationElement.textContent =
            currentDataObject.lastUpdated;
        lastUpdatedSubComponent.append(
            lastUpdatedDescriptorElement,
            lastUpdatedInformationElement,
        );

        lastUpdatedComponent.append(lastUpdatedSubComponent);
        mainComponent.append(lastUpdatedComponent);

        const temperatureComponent = document.createElement("div");
        const temperatureSubComponent = document.createElement("div");
        const temperatureDescriptorElement = document.createElement("div");
        const temperatureInformationElement = document.createElement("div");

        temperatureDescriptorElement.textContent = "Temperature";
        temperatureInformationElement.textContent = `${currentDataObject.temperature}\u00B0C`;
        temperatureSubComponent.append(
            temperatureDescriptorElement,
            temperatureInformationElement,
        );

        temperatureComponent.append(temperatureSubComponent);
        mainComponent.append(temperatureComponent);

        const conditionTextComponent = document.createElement("div");
        const conditionTextSubComponent = document.createElement("div");
        const conditionTextDescriptorElement = document.createElement("div");
        const conditionTextInformationElement = document.createElement("div");

        conditionTextDescriptorElement.textContent = "Condition";
        conditionTextInformationElement.textContent = `${currentDataObject.conditionText}`;
        conditionTextSubComponent.append(
            conditionTextDescriptorElement,
            conditionTextInformationElement,
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

    currentInformation.then((currentDataObject) => {
        const mainComponent = document.createElement("div");

        const lastUpdatedComponent = document.createElement("div");
        const lastUpdatedSubComponent = document.createElement("div");
        const lastUpdatedDescriptorElement = document.createElement("div");
        const lastUpdatedInformationElement = document.createElement("div");

        lastUpdatedDescriptorElement.textContent = "Last Updated:";
        lastUpdatedInformationElement.textContent =
            currentDataObject.lastUpdated;
        lastUpdatedSubComponent.append(
            lastUpdatedDescriptorElement,
            lastUpdatedInformationElement,
        );

        lastUpdatedComponent.append(lastUpdatedSubComponent);
        mainComponent.append(lastUpdatedComponent);

        const temperatureComponent = document.createElement("div");
        const temperatureSubComponent = document.createElement("div");
        const temperatureDescriptorElement = document.createElement("div");
        const temperatureInformationElement = document.createElement("div");

        temperatureDescriptorElement.textContent = "Temperature";
        temperatureInformationElement.textContent = `${currentDataObject.temperature}\u00B0C`;
        temperatureSubComponent.append(
            temperatureDescriptorElement,
            temperatureInformationElement,
        );

        temperatureComponent.append(temperatureSubComponent);
        mainComponent.append(temperatureComponent);

        const conditionTextComponent = document.createElement("div");
        const conditionTextSubComponent = document.createElement("div");
        const conditionTextDescriptorElement = document.createElement("div");
        const conditionTextInformationElement = document.createElement("div");

        conditionTextDescriptorElement.textContent = "Condition";
        conditionTextInformationElement.textContent = `${currentDataObject.conditionText}`;
        conditionTextSubComponent.append(
            conditionTextDescriptorElement,
            conditionTextInformationElement,
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
    });

    const formElement = document.createElement("form");
    const inputSearchElement = document.createElement("input");
    inputSearchElement.setAttribute("type", "text");

    const inputSubmitElement = document.createElement("input");
    inputSubmitElement.setAttribute("type", "submit")

    formElement.addEventListener("submit", (e) => {
       e.preventDefault()
       getWeatherInformation(inputSearchElement.value).then((weatherInformationResponse) => {
           displayLocationInformation(weatherInformationResponse.location);
           displayCurrentInformation(getCurrentInformation(weatherInformationResponse.current))
       })
    })

    formElement.append(inputSearchElement, inputSubmitElement)
    document.body.append(formElement)


    return {};
})();
