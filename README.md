<h1>Leaflet---Challenge</h1>
<hr>
<h3>Background</h3>
<p align = 'justify'>The US Geological Survey (USGS) provides scientific data about natural hazards, resource availability, ecosystem health, and climate and land-use change impacts. In addition, USGS scientists develop new methods and tools to supply timely, relevant, and helpful information about the Earth and its processes. One of such resources is their <a href ='https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php' target='_blank'>USGS GeoJSON Feed</a>, which provides comprehensive data sets related to geological hazards and phenomena. In addition, this feed contains the historical earthquake data, which can be a valuable tool to map earthquake locations and details using tools such as Leaflet. This project aims to showcase global earthquake data from the last seven days in a world map visualization and is divided into two tasks:</p>

<h3>Step 1: Basic Visualization</h3>
<hr>
<p align = 'justify'>This map shows the earthquakes' magnitude and location over a single-layer map.  Visualizations are generated using the Leaflet library for Javascript in the static/js/logic.js file and called into the DOM in the index.html. This visualization is displayed over a single, plain layer using circles whose color and size vary according to the recorded earthquake's magnitude and depth. In addition, this interactive map allows for the user to view additional details using the map's tooltips, as shown in the figure below.</p>
<br>
<img src='https://github.com/Karla-Flores/Leaflet---Challenge/blob/main/Screenshots/Step_1_Basic_Visualization.png'>
<br>
<h3>Step 3: Tectonic Plates Visualization</h3>
<hr>
<p align = 'justify'>This map is prepared to illustrate the relationship between <a href='https://github.com/fraxen/tectonicplates'>tectonic plates</a> and seismic activity. In addition to the original USGS GeoJSON data set, a second data set is visualized alongside the actual earthquake blobs. While using tectonic plate data, the bonus section allows the user to select the desired layer and background format from the following option:</p>
<ul>
  <li>Standard</li>
  <li>Topographic</li>
</ul>
<br>
<table>
  <tr>
    <td><img src='https://github.com/Karla-Flores/Leaflet---Challenge/blob/main/Screenshots/Step_2_Tectonic_Plates%20Visualization.png'></td>
    <td><img src='https://github.com/Karla-Flores/Leaflet---Challenge/blob/main/Screenshots/Step_2_Tectonic_Plates%20Visualization_2.png'></td>
  </tr>
</table>
