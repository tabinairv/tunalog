document.addEventListener("DOMContentLoaded", function () {
    // Initialize the map
    var map = L.map('map-container').setView([-6.200, 106.816], 10); // Default to Jakarta

    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Marker to show selected location
    var marker = L.marker([-6.200, 106.816], { draggable: true }).addTo(map);

    // Get input elements
    var lintangInput = document.getElementById("lintang");
    var bujurInput = document.getElementById("bujur");

    // Function to update input fields when clicking on map
    function onMapClick(e) {
        var lat = e.latlng.lat.toFixed(6);
        var lng = e.latlng.lng.toFixed(6);

        // Update input fields
        lintangInput.value = lat;
        bujurInput.value = lng;

        // Move marker to clicked location
        marker.setLatLng(e.latlng);
    }

    // Listen for map clicks
    map.on('click', onMapClick);

    // Update marker position when dragging
    marker.on('dragend', function (e) {
        var lat = marker.getLatLng().lat.toFixed(6);
        var lng = marker.getLatLng().lng.toFixed(6);

        // Update input fields
        lintangInput.value = lat;
        bujurInput.value = lng;
    });

    // Function to update map when input fields change
    function updateMapFromInput() {
        var lat = parseFloat(lintangInput.value);
        var lng = parseFloat(bujurInput.value);

        if (!isNaN(lat) && !isNaN(lng)) {
            var newLatLng = L.latLng(lat, lng);

            // Move marker and set map view
            marker.setLatLng(newLatLng);
            map.setView(newLatLng, 12);
        }
    }

    // Listen for input changes
    lintangInput.addEventListener("change", updateMapFromInput);
    bujurInput.addEventListener("change", updateMapFromInput);
});
