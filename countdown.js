let targetTime = new Date("2023-02-03T00:00:00");  // Change this to the target time
let currentTime = new Date();
let remainingTime = (targetTime - currentTime) / 1000;

setInterval(function() {
  remainingTime -= 60;  // Decrement by 60 seconds (1 minute)
  let minutes = Math.floor(remainingTime / 60);
  console.log(minutes + " minutes remaining");
  if (minutes <= 0) {
    console.log("Time's up!");
    clearInterval(this);
  }
}, 60000);  // Run the function every 60 seconds (1 minute)
