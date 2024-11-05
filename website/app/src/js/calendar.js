// const { populate } = require("dotenv");

// HOUR VIEW 4x6 matrix

const hourList = document.querySelector("ul.hours");
const startHour = 10 * 60; // Start from 10:00 in minutes
const totalIntervals = 96;  // Total intervals for 24 hours with 15-minute increments
const intervalsPerView = 24; // Number of intervals to display per view (4 hours)
let currentStartInterval = startHour;

// Format minutes into HH:MM
function formatTime(minutes) {
    const hour = Math.floor(minutes / 60) % 24;
    const minute = minutes % 60;
    return `${hour < 10 ? "0" : ""}${hour}:${minute === 0 ? "00" : minute}`;
}

// Populate hours based on the current start time
function populateHours() {
    hourList.innerHTML = ""; // Clear any existing content

    for (let i = 0; i < intervalsPerView; i++) {
        const minutes = currentStartInterval + i * 15;
        const formattedTime = formatTime(minutes);
        
        const li = document.createElement("li");
        li.textContent = formattedTime;
        hourList.appendChild(li);
    }
}

// Button event listeners for "Earlier" and "Later"
document.getElementById("prev-hours").addEventListener("click", () => {
    if (currentStartInterval > 0) {
        currentStartInterval -= intervalsPerView * 15;
        populateHours();
    }
});

document.getElementById("next-hours").addEventListener("click", () => {
    if (currentStartInterval + intervalsPerView * 15 < totalIntervals * 15) {
        currentStartInterval += intervalsPerView * 15;
        populateHours();
    }
});

// Initial call to populate the list
populateHours();

hourList.addEventListener("click", (event) => {
    // console.log(target);

    if (event.target.tagName.toLowerCase() === "li") {
        // Remove "active" class from any currently active li in .calendar ul
        const activeItem = hourList.querySelector(".active");
        if (activeItem) activeItem.classList.remove("active");

        // Add "active" class to the clicked li
        event.target.classList.add("active");
    }
})

const spotTag = document.getElementsByClassName("spots")[0];

spotTag.addEventListener("click", (event) => {
    // console.log(target);

    if (event.target.tagName.toLowerCase() === "li") {
        // Remove "active" class from any currently active li in .calendar ul
        const activeItem = spotTag.querySelector(".active");
        if (activeItem) activeItem.classList.remove("active");

        // Add "active" class to the clicked li
        event.target.classList.add("active");
        currentStartInterval = startHour;
        populateHours();
    }
})

// DAY VIEW

const currentDate = document.querySelector(".current-date"),
      daysTag = document.querySelector(".days"),
      prevNextIcon = document.querySelectorAll(".icons img");

// Getting the new date, current year, and month
let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September",
    "Oktober", "November", "Dezember"];

console.log(`Current Month number: ${currMonth}`);
console.log(`Current Month: ${months[currMonth]}`);

const renderCalendar = () => {
    // Getting the first day of the month and adjusting for Monday start (0: Monday, ..., 6: Sunday)
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    firstDayofMonth = (firstDayofMonth === 0) ? 6 : firstDayofMonth - 1;

    let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
    lastDayOfMonth = (lastDayOfMonth === 0) ? 6 : lastDayOfMonth - 1;

    let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    let liTag = "";

    // Add days of previous month at the beginning of the calendar
    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
    }

    // Add all days of the current month
    for (let i = 1; i <= lastDateOfMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    // Add days of the next month to fill the remaining space in the last row
    for (let i = lastDayOfMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
    }

    daysTag.innerHTML = liTag;
}

renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        if (currMonth < 0) {
            currMonth = 11;
            currYear--;
        } else if (currMonth > 11) {
            currMonth = 0;
            currYear++;
        }
        renderCalendar();
        currentStartInterval = startHour;
        populateHours();
    });
});

daysTag.addEventListener("click", (event) => {
    // console.log(target);

    if (event.target.tagName.toLowerCase() === "li") {
        // Remove "active" class from any currently active li in .calendar ul
        const activeItem = daysTag.querySelector(".active");
        if (activeItem) activeItem.classList.remove("active");

        // Add "active" class to the clicked li
        event.target.classList.add("active");
        currentStartInterval = startHour;
        populateHours();
    }
})