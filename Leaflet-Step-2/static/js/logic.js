// Creating the map object
var myMap = L.map("map", {
    center: [34.0522, -118.2437],
    zoom: 5
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Load the GeoJSON url.
let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson';

var geojson;

// To do:
d3.json(url).then(function (data) {
    console.log(data);
    L.geoJSON(data, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            console.log('Creatin marker');
            return null;
        }

    });
});
function onEachFeature(feature, layer){
    console.log('Creating pop up')
}