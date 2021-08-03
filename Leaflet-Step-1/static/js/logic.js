// Load the GeoJSON url.
let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson';

// Get marker color bases on earthquake magnitude
function getColor(mag) {
    if (mag >= 5) {
        return '#C73866'
    } else {
        if (mag > 4) {
            return '#FE676e'
        } else {
            if (mag > 3) {
                return '#FD8F52'
            } else {
                if (mag > 2) {
                    return '#FFBD71'
                } else {
                    if (mag > 1) {
                        return '#FFDCA2'
                    } else {
                        return '#C8C6C9'
                    }
                }
            }
        }
    }
};

// Function for map features
function createFeature(data) {
    //Pop up layer using title, title and magnitude
    function onEachFeature(feature, layer) {
        layer.binfPopup('<h1>' + feature.properties.title + '</h1>' + '<hr>' + '<p>' + 'Type : ' + feature.properties.type + '</p>' + '<br>' + '<p>' + 'Magnitude : ' + feature.properties.mag + '</p>')
    }
}
    // Creating circle marker
    var earthquake = L.geoJson(data,{
        poinToLayer: function(feature, latlng){
            // Defining circle radius according to the magnitude
            return new L.CircleMarker(latlng,{
                radius : feature.properties.mag * 5,
                fillOpacity : 0.6,
                color : getColor(feature.properties.mag)
            })
        }
    });


// Creating the map object
let myMap = L.map('map', {
    center: [34.0522, -118.2437],
    zoom: 5
});

// Adding the tile layer
let layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


