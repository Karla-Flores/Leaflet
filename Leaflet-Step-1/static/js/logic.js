// Load the GeoJSON url.
let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson';

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
                radius: feature.properties.mag * 5,
                fillOpacity: 0.6,
                color: getColor(feature.properties.mag)
            });
        }
    });
}).addTo(myMap);

function onEachFeature(feature, layer){
    console.log('Creating pop up'),
    //Pop up layer using title, title and magnitude
    layer.binfPopup('<h1>' + feature.properties.title + '</h1>' + '<hr>' + '<p>' + 'Type : ' + feature.properties.type + '</p>' + '<br>' + '<p>' + 'Magnitude : ' + feature.properties.mag + '</p>')
}

// // Function for map features
// function createFeatures(edata) {
//     //Pop up layer using title, title and magnitude
//     function onEachFeature(feature, layer) {
//         layer.binfPopup('<h1>' + feature.properties.title + '</h1>' + '<hr>' + '<p>' + 'Type : ' + feature.properties.type + '</p>' + '<br>' + '<p>' + 'Magnitude : ' + feature.properties.mag + '</p>')
//     }
//     // Creating circle marker
//     let earthquake = L.geoJson(edata, {
//         poinToLayer: function (feature, latlng) {
//             // Defining circle radius according to the magnitude
//             return new L.CircleMarker(latlng, {
//                 radius: feature.properties.mag * 5,
//                 fillOpacity: 0.6,
//                 color: getColor(feature.properties.mag)
//             })
//         },
//         //Adding pup ups
//         onEachFeature: onEachFeature
//     });
//     createMap(earthquake);
// });

// // Function for creating map
// function createMap(earthquake) {
//     // Tile Layer
//     let layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     });
//     // 
//     let myMap = L.map('map', {
//         center: [34.0522, -118.2437],
//         zoom: 5
//     });
// }


    // Adding the tile layer



