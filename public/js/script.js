let socket = io()

if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
        let {latitude,longitude} = position.coords
        socket.emit("sendLocation",{latitude,longitude})
        
    },
    (error)=>{
       
        console.log(error);
    },{
        enableHighAccuracy:true,
        maximumAge:0,
        timeout:5000,
    }
)
}

// script.js
// document.addEventListener('DOMContentLoaded', (event) => {
//     // Initialize the map only after the DOM has fully loaded
//     var map = L.map('map').setView([51.505, -0.09], 13);

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(map);
// });



let map =  L.map("map").setView([0,0],10);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:"kormangla blr"
}).addTo(map)
