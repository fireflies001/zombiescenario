function getNeighbors(geojson){
    let neighbors = {};
    geojson.features.forEach(mainArea => {
        const featureA = getTolerance(mainArea);
        geojson.features.forEach(Neighbor => {
            if (Neighbor.properties.NAME_2 != mainArea.properties.NAME_2){
                const featureB = getTolerance(Neighbor);
                if(turf.booleanIntersects(featureA.geometry, featureB.geometry)){
                    if(!neighbors[mainArea.properties.NAME_2]){
                        neighbors[mainArea.properties.NAME_2] = [];
                    }
                    neighbors[mainArea.properties.NAME_2].push(Neighbor.properties.NAME_2);
                }
            }
        });
    });
    return neighbors;
}

function drawArea(data){
    data.features.forEach(feature => {
        const layer = L.geoJSON(feature, {
            style: {
            color: 'white',
            fillColor: 'white',
            fillOpacity: 0
            }
        }).addTo(map);
        layer.on('click', function () {
            layer.setStyle({ fillColor: 'red', fillOpacity: 0.7 });
        });
        map.fitBounds(layer.getBounds());
    });
}

function getCenter(geoData) {
    return turf.centroid(geoData);
}

function getTolerance(geoData) {
    return turf.simplify(geoData, { tolerance: 0.002, highQuality: false });
}