const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

let futureDate = new Date(2020, 11, 9, 12, 30, 0);

// console.log(futureDate)
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
let month = futureDate.getMonth();
month = months[month];
const date = futureDate.getDate();
let day = futureDate.getDay();
day = weekdays[day]

giveaway.textContent = `Giveaway ends on ${day}, ${date} ${month} ${year} at ${hours}:${minutes}am` 
// time in ms
const futureTime = futureDate.getTime();
function getRemainingTime(){
  let today = new Date().getTime();
  let secondDifference = Math.floor((futureTime - today)/1000);

  const oneDay = 24*60*60;
  const oneHour = 60*60;
  const oneMin = 60;

  let days = Math.floor(secondDifference/oneDay);
  let remainingHours = secondDifference%oneDay;

  let hours = Math.floor(remainingHours/oneHour);
  let remainingMinutes = remainingHours%oneHour;

  let mins = Math.floor(remainingMinutes/oneMin);
  let remainingSeconds = remainingMinutes%oneMin;

  let seconds = remainingSeconds;
  
  const values = [days, hours, mins, seconds];
  
  function format(item){
    if(item < 10){
      return item = `0${item}`;
    }
    return item;
  }

  items.forEach(function(item, index){
    item.innerHTML = format(values[index]);
  });
  if(secondDifference < 0){
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this givaway has
    expired</h4>`
  }
}

// countdown
let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();
