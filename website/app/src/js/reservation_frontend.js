// function removeElement(this) {

// }

function reserveDone() {
    const parent = document.getElementsByTagName("body")[0];
    const popupDiv = document.createElement("div");
    const popupCard = document.createElement("div");

    popupDiv.setAttribute("class", `popup-div-abgelehnt`);

    popupCard.setAttribute("class", `popup-card-abgelehnt`);

    popupCard.innerHTML = `
        <h1 style="padding: 6px; padding-top: 24px; text-align: center; font-weight: bold;">Wir sind für dieses Zeitraum leider ausreserviert! :(</h1>
        <h2 style="padding: 6px; margin-bottom: 24px; text-align: center; font-weight: bold;"> Bitte einen anderen Zeitpunkt waehlen! </h2>
        <button onclick="this.parentElement.parentElement.remove();" class="transform hover:bg-velo-blue transition duration-400 hover:border-white hover:text-white lg:mb-0 mb-8 lg:ml-auto lg:mr-auto lg:z-30 bg-velo-kaki self-center p-2 w-32 lg:w-40 border-4 border-black rounded-2xl">OK</button>
    `;

    popupDiv.appendChild(popupCard);
    parent.appendChild(popupDiv);
}

function reserveError() {
    const parent = document.getElementsByTagName("body")[0];
    const popupDiv = document.createElement("div");
    const popupCard = document.createElement("div");

    popupDiv.setAttribute("class", `popup-div-abgelehnt`);

    popupCard.setAttribute("class", `popup-card-abgelehnt`);

    popupCard.innerHTML = `
        <h1 style="padding: 6px; padding-top: 24px; text-align: center; font-weight: bold;">Wir sind für dieses Zeitraum leider ausreserviert! :(</h1>
        <h2 style="padding: 6px; margin-bottom: 24px; text-align: center; font-weight: bold;"> Bitte einen anderen Zeitpunkt waehlen! </h2>
        <button onclick="this.parentElement.parentElement.remove();" class="transform hover:bg-velo-blue transition duration-400 hover:border-white hover:text-white lg:mb-0 mb-8 lg:ml-auto lg:mr-auto lg:z-30 bg-velo-kaki self-center p-2 w-32 lg:w-40 border-4 border-black rounded-2xl">OK</button>
    `;

    popupDiv.appendChild(popupCard);
    parent.appendChild(popupDiv);
}

function submitReservierung() {
    const toClose = document.getElementsByClassName("popup-div-akzeptiert")[0];
    // Form Validation !!
    const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September",
        "Oktober", "November", "Dezember"];

    let day = document.querySelector(".days > .active").innerText; // const dayFormatted: string = json.day < 10 ? `0${json.day}` : `${json.day}`;
    const hour = document.querySelector(".hours > .active").innerText,
    floor = document.querySelector(".spots > .active").innerText,
    [monthName, year] = document.querySelector(".current-date").innerText.split(" ");

    day =  day < 10 ? `0${day}` : `${day}`

    // Define a map of month names to numbers
    const monthMap = {
        Januar: "01",
        Februar: "02",
        März: "03",
        April: "04",
        Mai: "05",
        Juni: "06",
        Juli: "07",
        August: "08",
        September: "09",
        Oktober: "10",
        November: "11",
        Dezember: "12"
    };

    const month = monthMap[monthName];

    const startDate = `${year}-${month}-${day}T${hour}:00`;
    const endDate = `${year}-${month}-${day}T${(Number((hour).split(":")[0]) + 2)}:${(hour).split(":")[1]}:00`;

    console.log(startDate);
    console.log(endDate);

    const url = "https://localhost/make-reservation";
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const sendData = JSON.stringify({
        floor,
        startDate,
        endDate,
        personen: "2",
    });

    const myRequest = new Request(url, {
        method: "POST",
        body: sendData,
        headers: myHeaders,
        // implement cors samesite later !!
    });

    console.log(sendData);

    fetch(myRequest)
        .then((response) => {
            if (response.status == 200)
                console.log(response);
                return response.json();
        })
        .then((json) => {
            console.log(json);
            if (json.message === "All 2-seated tables on the floor are reserved during the specified time.") {
                toClose.remove();
                reserveError();
            } else if (json.message === "Some 2-seated tables on the floor are available during the specified time.") {
                toClose.remove()
                reserveDone();
            }
        });
}

function popupAvailable() {
    const parent = document.getElementsByTagName("body")[0];
    const popupDiv = document.createElement("div");
    const popupCard = document.createElement("div");

    popupDiv.setAttribute("class", `popup-div-akzeptiert`);

    popupCard.setAttribute("class", `popup-card-akzeptiert`);

    popupCard.innerHTML = `
        <h1 style="padding: 12px; margin-bottom: 6px; text-align: center; font-weight: bold;">Reservierungsformular</h1>
        <div style="width: 75%;" class="form-div">
        <label for="vorname" style="flex-grow: 1; width: 50%">Vorname:</label>
        <input type="text" id="vorname" style="flex-grow: 1;">
        </div>
        <div style="width: 75%;" class="form-div">
        <label for="nachname" style="flex-grow: 1; width: 50%">Nachname:</label>
        <input type="text" id="nachname" style="flex-grow: 1;">
        </div>
        <div style="width: 75%;" class="form-div">
        <label for="telefon" style="flex-grow: 1; width: 50%">Telefon:</label>
        <input type="text" id="telefon" style="flex-grow: 1;">
        </div>
        <button onclick="submitReservierung()" class="transform hover:bg-velo-blue transition duration-400 hover:border-white hover:text-white lg:mb-0 mb-8 lg:ml-auto lg:mr-auto lg:z-30 bg-velo-kaki self-center p-2 w-32 lg:w-40 border-4 border-black rounded-2xl" style="margin-top: 6px;">OK</button>
    `;

    popupDiv.appendChild(popupCard);
    parent.appendChild(popupDiv);
}

function popupFull() {
    const parent = document.getElementsByTagName("body")[0];
    const popupDiv = document.createElement("div");
    const popupCard = document.createElement("div");

    popupDiv.setAttribute("class", `popup-div-abgelehnt`);

    popupCard.setAttribute("class", `popup-card-abgelehnt`);

    popupCard.innerHTML = `
        <h1 style="padding: 6px; padding-top: 24px; text-align: center; font-weight: bold;">Wir sind für dieses Zeitraum leider ausreserviert! :(</h1>
        <h2 style="padding: 6px; margin-bottom: 24px; text-align: center; font-weight: bold;"> Bitte einen anderen Zeitpunkt waehlen! </h2>
        <button onclick="this.parentElement.parentElement.remove();" class="transform hover:bg-velo-blue transition duration-400 hover:border-white hover:text-white lg:mb-0 mb-8 lg:ml-auto lg:mr-auto lg:z-30 bg-velo-kaki self-center p-2 w-32 lg:w-40 border-4 border-black rounded-2xl">OK</button>
    `;

    popupDiv.appendChild(popupCard);
    parent.appendChild(popupDiv);
}

function submitReservation() {
    // Form Validation !!
    const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September",
        "Oktober", "November", "Dezember"];

    let day = document.querySelector(".days > .active").innerText; // const dayFormatted: string = json.day < 10 ? `0${json.day}` : `${json.day}`;
    const hour = document.querySelector(".hours > .active").innerText,
    floor = document.querySelector(".spots > .active").innerText,
    [monthName, year] = document.querySelector(".current-date").innerText.split(" ");

    day =  day < 10 ? `0${day}` : `${day}`

    // Define a map of month names to numbers
    const monthMap = {
        Januar: "01",
        Februar: "02",
        März: "03",
        April: "04",
        Mai: "05",
        Juni: "06",
        Juli: "07",
        August: "08",
        September: "09",
        Oktober: "10",
        November: "11",
        Dezember: "12"
    };

    const month = monthMap[monthName];

    const startDate = `${year}-${month}-${day}T${hour}:00`;
    const endDate = `${year}-${month}-${day}T${(Number((hour).split(":")[0]) + 2)}:${(hour).split(":")[1]}:00`;

    console.log(startDate);
    console.log(endDate);

    const url = "https://localhost/check-reservations";
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const sendData = JSON.stringify({
        floor,
        startDate,
        endDate,
        personen: "2",
    });

    const myRequest = new Request(url, {
        method: "POST",
        body: sendData,
        headers: myHeaders,
        // implement cors samesite later !!
    });

    console.log(sendData);

    fetch(myRequest)
        .then((response) => {
            if (response.status == 200)
                console.log(response);
                return response.json();
        })
        .then((json) => {
            console.log(json);
            if (json.message === "All 2-seated tables on the floor are reserved during the specified time.") {
                popupFull();
            } else if (json.message === "Some 2-seated tables on the floor are available during the specified time.") {
                popupAvailable();
            }
        });


}