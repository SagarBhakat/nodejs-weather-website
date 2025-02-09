console.log("Client side javascript file is loaded");
const form = document.querySelector('form');
const button = document.querySelector('button');
const input = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');



async function fetchWeather(location) {
    const response = await fetch(`/weather?address=${encodeURIComponent(location)}`);
    const data = await response.json();
    // console.log(data);
    if (data.error) {
        messageOne.textContent = data.error;

    } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
        console.log(data.location);
        console.log(data.forecast);
    }
}





form.addEventListener('submit', (event) => {
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    event.preventDefault();
    fetchWeather(input.value);

})