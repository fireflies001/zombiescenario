var map = L.map('map').setView([14.5995, 120.9842], 13);
var geodata = null;
var VERSION_NUMBER = "1.0.0";

function init_data(){
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
}

async function init(){
    const res = await fetch('lapulapu.geojson');
    const data = await res.json();
    return data;
}

function getDistance(areaName, geojson){
    const target = geojson.features.find(f => f.properties.NAME_2 == areaName);
    const cebu = geojson.features.find(f => f.properties.NAME_2 === "Mandaue City");
    const featureA = getTolerance(target);
    const featureB = getTolerance(cebu);
    const centroidA = getCenter(featureA);
    const centroidB = getCenter(featureB);
    const dist = turf.distance(centroidA, centroidB, { units: 'kilometers' });
    console.log("Centroid-to-centroid distance:", dist.toFixed(2), "km");
}

init_data();

init().then(data =>{
    geodata = data;
    const neighbors = getNeighbors(geodata);
    console.log(neighbors);
    getDistance("Lapu-Lapu City",geodata);
    drawArea(geodata);
});