 // Initialize the map and set the view to a default location (Jakarta)
 var map = L.map('map').setView([-6.2088, 106.8456], 13); // Jakarta coordinates 
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     maxZoom: 18,
     attribution: '© OpenStreetMap contributors'
 }).addTo(map);

 // Add a marker that will be updated on click
 var marker; 

 // Function to update the form fields with the clicked coordinates
 function onMapClick(e) {
     var lat = e.latlng.lat;
     var lng = e.latlng.lng;

     // Set the form fields with the latitude and longitude
     document.getElementById('latitude').value = lat;
     document.getElementById('longitude').value = lng;

     // If the marker exists, update its position, otherwise create a new marker
     if (marker) {
         marker.setLatLng(e.latlng);
     } else {
         marker = L.marker(e.latlng).addTo(map);
     }
 }

 // Add the click event to the map
 map.on('click', onMapClick);

 // Function to zoom to the point specified in the form
 document.getElementById('zoomToPoint').addEventListener('click', function() {
     var lat = parseFloat(document.getElementById('latitude').value);
     var lng = parseFloat(document.getElementById('longitude').value);

     if (!isNaN(lat) && !isNaN(lng)) {
         map.setView([lat, lng], 13); // Zoom to the specified point
         if (marker) {
             marker.setLatLng([lat, lng]); // Move marker to the new location
         } else {
             marker = L.marker([lat, lng]).addTo(map); // Add marker if it doesn't exist
         }
     } else {
         alert("Silakan masukkan lintang dan bujur yang valid."); // Alert if inputs are invalid
     }
 });