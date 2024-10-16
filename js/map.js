// initialise map
var map = L.map("map").setView([14.70, -17.30], 13);

var marker= L.marker([14.70, -17.5]).addTo(map);
// add the scale bar to the map
L.control.scale().addTo(map)

// add the basemap osm
var OpenStreetMap_France = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
	maxZoom: 20,
	attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
// Add the basemap stadia Alidade satellite
var Stadia_AlidadeSatellite = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'jpg'
});

// Ajout des geojson
var region = L.geoJSON(Sn_reg,{ 
    style:{
        color:"red"
    }}
  ).bindPopup(function  (layer) {
     return "Région de : " + layer.feature.properties.REG
}).addTo(map)
var route_national = L.geoJSON(route_national,{
    style: {color:"red"}
})


// basemaps legend
var baseLayers = {
   
    "OSM": OpenStreetMap_France,
    "Satellite": Stadia_AlidadeSatellite
};
// layers legend
var overlays = {
    "Marker": marker,
   "Route nationale" : route_national,
   "Région": region
};
// controle de la légende 
L.control.layers(baseLayers, overlays,{collapsed:false}).addTo(map);


// ajout de leaflet impression de carte web
L.control.browserPrint({position: 'topleft'}).addTo(map);

// coordonner du hover de la souris
map.on("mousemove",function(e){
    console.log(e)
    $('.coordinate').html('Lat: ${e.latlng.lat},Lng : ${e.latlng.lng}')
//$('.coordinate').html("Lat:${e.latlng.lat} ,Lng:${e.latlng.lng}")
   
})