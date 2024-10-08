let socket = io()

if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
        let {latitude,longitude} = position.coords
        socket.emit("send-message",{latitude,longitude})        
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

socket.on('new-User',(val)=>{
    console.log(val);
})

let map =  L.map("map").setView([0,0],10);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:"kormangla blr"
}).addTo(map)


// L.marker([1,1]).addTo(map).bindPopup('User 2').openPopup()

const marker = {}
socket.on("recived-location",(data)=>{
    
    const {id,latitude,longitude,userName} = data
    // L.marker([latitude,longitude]).addTo(map).bindPopup(userName).openPopup()
    map.setView([latitude,longitude],16)
    if(marker[id]){
        // marker[id].setLatLng([latitude,longitude])
        L.marker([latitude,longitude]).addTo(map).bindPopup(userName).openPopup()
    }else{
        // marker[id] = L.marker([latitude,longitude]).addTo(map)
        L.marker([latitude,longitude]).addTo(map).bindPopup(userName).openPopup()
    }
})

socket.on('user-disconnected',(id)=>{
    if(marker[id]){
        map.removeLayer(marker[id])
        delete marker[id]
    }

})