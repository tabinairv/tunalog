// Initialize the map
var map = L.map('map').setView([-2.548926, 118.0148634], 5); // Koordinat tengah Indonesia

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add markers for the different locations
var locations = [
    {"name": "PPS Nizam Zachman", "lat": -6.09954000, "lng": 106.79976000},
    {"name": "PPS Cilacap", "lat": -7.72705000, "lng": 109.02339000},
    {"name": "PPN Palabuhanratu", "lat": -6.98993000, "lng": 106.54326000},
    {"name": "PPN Prigi", "lat": -8.28895000, "lng": 111.73052000},
    {"name": "PPP Pondok Dadap", "lat": -8.43294000, "lng": 112.68178000},
    {"name": "PPP Labuhan Lombok", "lat": -8.48676000, "lng": 116.66136000},
    {"name": "PU Benoa", "lat": -8.75272000, "lng": 115.22081000},
    // Add other locations here...
];
locations.forEach(function(location) {
    L.marker([location.lat, location.lng])
        .addTo(map)
        .bindPopup("<b>" + location.name + "</b>")
        .openPopup();
});


// Flag to track if Ctrl is being held down
let isCtrlPressed = false;
// Add an event listener for the 'keydown' and 'keyup' to detect Ctrl key press
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey) {
        isCtrlPressed = true;
    }
});

document.addEventListener('keyup', function(event) {
    if (!event.ctrlKey) {
        isCtrlPressed = false;
    }
});

// Prevent default scroll behavior (zooming) when Ctrl is not pressed
map.scrollWheelZoom.disable();

// Enable scroll zoom only when Ctrl is pressed
map.on('wheel', function(event) {
    if (isCtrlPressed) {
        map.scrollWheelZoom.enable(); // Enable zoom when Ctrl is pressed
    } else {
        map.scrollWheelZoom.disable(); // Disable zoom when Ctrl is not pressed
    }
});

// After everything is loaded, ensure the map's size is correct
map.invalidateSize();
