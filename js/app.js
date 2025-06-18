// Initialize the map and set its view
var map = L.map('map').setView([14.5995, 120.9842], 13); // Example: Manila
var geodata = null;
// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);
async function init(){
    const res = await fetch('lapulapu.geojson');
    const data = await res.json();
    return data;
}


function getNeighbors(areaName, geojson) {
    // const target = geojson.features.find(f => f.properties.NAME_2 === areaName);
    // if (!target) return [];
    // const simpleA = turf.simplify(target, { tolerance: 0.0001, highQuality: false });
    // console.log(simpleA);
    // const neighbors = geojson.features.filter(other => {
    //     if (other === target) return false;
    //     const simpleB = turf.simplify(other, { tolerance: 0.0001, highQuality: false });
    //     console.log(simpleB)
    //     return turf.booleanTouches(simpleA, simpleB);
    // });

    // return neighbors.map(n => n.properties.NAME_2);
    const lapu = geojson.features.find(f => f.properties.NAME_2 === "Lapu-Lapu City");
    const cebu = geojson.features.find(f => f.properties.NAME_2 === "Cordoba");
    console.log(lapu)
    console.log(cebu)
    const featureA = turf.simplify(lapu, { tolerance: 1, highQuality: false });
    const featureB = turf.simplify(cebu, { tolerance: 1, highQuality: false });
    console.log(featureA)
    console.log(featureB)
    const touches = turf.booleanTouches(featureA.geometry, featureB.geometry);
    console.log("Do they touch?", touches);

}
function drawArea(data){
    data.features.forEach(feature => {

    const layer = L.geoJSON(feature, {
        style: {
        color: 'green',
        fillColor: 'white',
        fillOpacity: 0
        }
    }).addTo(map);
    layer.on('click', function () {
        layer.setStyle({ fillColor: 'red', fillOpacity: 0.7 });
    });
    map.fitBounds(layer.getBounds()); // Zoom to fit
    });
}
// const neighbors = getNeighbors("Lapu-Lapu City", geodata);

init().then(data =>{
    geodata = data;
    const neighbors = getNeighbors("Lapu-Lapu City", geodata);
    console.log("Neighbors of Lapu-Lapu:", neighbors);
    drawArea(geodata);
});
// console.log(geodata);