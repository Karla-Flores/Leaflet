// Load the GeoJSON url.
let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';

// Creating the map object
var myMap = L.map("map", {
    center: [34.0522, -118.2437],
    zoom: 5
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

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

// Depth function
function getFillColor(depth) {
    if (depth >= 90) {
        return '#feb236'
    } else {
        if (depth > 60) {
            return '#eca1a6'
        } else {
            if (depth > 50) {
                return '#d64161'
            } else {
                if (depth > 40) {
                    return '#ff7b25'
                } else {
                    if (depth > 30) {
                        return '#FFDCA2'
                    } else {
                        if (depth > 20) {
                            return '#C8C6C9'
                        } else {
                            if (depth >10) {
                                return
                            }
                        }
                    }
                }
            }
        }
    }
}

// Get Data
d3.json(url).then(function (data) {
    console.log(data);
    L.geoJSON(data, {
        onEachFeature: onEachFeature,
        // Creating circle marker
        pointToLayer: function (feature, latlng) {
            console.log('Creatin marker');
            return new L.CircleMarker(latlng, {
                // Defining circle radius according to the magnitude
                radius: feature.properties.mag * 7,
                getFillCollor: feature.geometry.coordinates[2],
                fillOpacity: 0.8,
                // color: getColor(feature.properties.mag)
            }).addTo(myMap);
        }
    });
});

// Starting pop up layers
function onEachFeature(feature, layer) {
    // console.log('Creating pop up'),
    //Pop up layer using title, title and magnitude
    var popupText = (layer.binfPopup('<h1>' + 'Location : ' + feature.properties.title + '</h1>' + '<hr>' + '<p>' + 'Type : ' + feature.properties.type + '</p>' + '<br>' + '<p>' + 'Magnitude : ' + feature.properties.mag + '</p>'
    )).addTo(myMap)
};

layer.bindPopup(popupText);

var legend = L.control({ position: 'bottomright' })

