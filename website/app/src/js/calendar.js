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
    });
});
