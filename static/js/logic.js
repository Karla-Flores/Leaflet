// Load the GeoJSON url.
let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson';

// Tectonic plates Json
let platesUrl = 'static/data/PB2002_boundaries.json';

// Layer control variables
var standard = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}),
    topography = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    })
var quakes = new L.LayerGroup(),
    tec = new L.LayerGroup()

// Creating the map object
var myMap = L.map("map", {
    center: [34.0522, -118.2437],
    zoom: 5,
    layers: [standard, topography]
});

// Adding the tile layer
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(myMap);

// Adding the topo layer // ask how to get the grey, ourdoors
// L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
//     attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
// }).addTo(myMap);

// Depth function
function getFillColor(depth) {
    if (depth >= 90) {
        return '#21b2b3'
    } else {
        if (depth > 80) {
            return '#72c1b2'
        }
        else {
            if (depth > 70) {
                return '#a0cfb4'
            }
            else {
                if (depth > 60) {
                    return '#c7deb9'
                } else {
                    if (depth > 50) {
                        return '#e8edc7'
                    } else {
                        if (depth > 40) {
                            return '#ffdcc1'
                        } else {
                            if (depth > 30) {
                                return '#ffb89f'
                            } else {
                                if (depth > 20) {
                                    return '#ff9278'
                                } else {
                                    if (depth > 10) {
                                        return '#ff644a'
                                    } else {
                                        return '#ff0000'
                                    }
                                }
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
                radius: feature.properties.mag * 4,
                fillColor: getFillColor(feature.geometry.coordinates[2]),
                fillOpacity: 0.6,
                weight: 0
            }).addTo(quakes).addTo(myMap);
        },
    });
});

// Option 1 - Adding tectonic plates
d3.json(platesUrl).then(function (boundariesPlates) {
    console.log(boundariesPlates);
    L.geoJSON(boundariesPlates, {
        onEachFeature: onEachFeature,
        // color:'#ff0000',
        color: 'grey',
        weight: 5
    }).addTo(tec).addTo(myMap)
});

// Objects, one will contain a base layers and one will contain overlay
var baseMaps = {
    'Topography': topography,
    'Standard': standard
    
};
var overlayMaps = {
    'Earthquake': quakes,
    'Tectonic plates': tec
};

// Control layer
L.control.layers(baseMaps, overlayMaps , {
    collapsed: false
}).addTo(myMap);

// Option 1 - Adding tectonic plates - Do not use
// d3.json(platesUrl,function(response){
//     console.log(boundariesPlates);
//     var tecto = response.features;
//     var tectoData = L.geoJSON(tecto,{
//         color:'#FD8F52'
//     }).addTo(myMap)
// });

// Starting pop up layers
function onEachFeature(feature, layer) {
    console.log('Creating pop up');
    // Time format
    var format = d3.timeFormat('%d-%b-%Y at %H:%M');
    //Pop up layer using title, title and magnitude
    var popupText = (layer.bindPopup('<h2>' + 'Location : ' + '<br>' + feature.properties.title + '</h2>' + '<hr>' + '<h3>' + 'Time : ' + (format(new Date(feature.properties.time))) + '</h3>' + '<h3>' + 'Type : ' + feature.properties.type + '</h3>' + '<h3>' + 'Magnitude : ' + feature.properties.mag + '</h3>' + '<h3>' + 'Depth : ' + feature.geometry.coordinates[2] + '</h3>'
    )).addTo(myMap);
};

// Defining legend
var legend = L.control({ position: 'bottomleft' });
legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend');
    var depth = [-10, 10,20, 30,40, 50, 60, 70, 80, 90];
    var colors = ['#ff0000', '#ff644a', '#ff9278', '#ffb89f', '#ffdcc1', '#e8edc7', '#c7deb9', '#a0cfb4', '#72c1b2', '#21b2b3']
    var labels = [];
    // var labelsInfo = '<h4>Depth</h4>';
    // Add min & max
    div.innerHTML = '<h2>Depth</h2>' + '<div class="labels"><div class="min">' + depth[0] + '</div> \
    <div class="max">' + depth[depth.length - 1] + '</div></div>';
    depth.forEach(function (depth, index) {
        labels.push('<li style="background-color: ' + colors[index] + '"></li>')
    })
    div.innerHTML += '<ul>' + labels.join('') + '</ul>'
    return div
};
legend.addTo(myMap);