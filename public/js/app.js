console.log("working");
const time = document.querySelector(".time");
const day = document.querySelector(".day");
const date = document.querySelector(".date");
const place = document.querySelector(".location");

const search = document.getElementsByClassName("input")[0]; // Assuming there is only one element with the "input" class
const search_btn = document.querySelector(".search-btn");
const clockForm = document.querySelector(".clock-form");
const loader = document.getElementById("loader");

clockForm.addEventListener("submit", (event) => {
  event.preventDefault();
  loader.style.display = "block";
  day.textContent = "";
  date.textContent = "";
  place.textContent = "";
  time.textContent = "";

  const address = search.value;
  console.log(address);

  fetch("/time?address=" + address).then((response) => {
    response.json().then((data) => {
      loader.style.display = "none";
      if (data.error) {
        time.textContent = data.error;
        day.textContent = "";
        date.textContent = "";
        place.textContent = "";
        console.log("not working");
      } else {
        place.textContent = address;
        time.textContent = "Time: " + data.time;
        day.textContent = data.dayOfWeek;
        date.textContent = data.day + "/" + data.month + "/" + data.year;

        console.log("working now");
      }
    });
  });
});
