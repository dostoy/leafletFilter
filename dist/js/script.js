var groupData = L.layerGroup();
var allCountries = [];
var countries = [];
var toggle = [];
var myData;


var map = L.map('map', {
    zoom: 2,
    maxZoom:20,
    center: [51.505, -0.09],
});

init();

map.on('moveend', function(){
    console.log(countries)
loadData(countries);
});


function init(){

    $.getJSON('data/countries.geojson', function(data) {
    var countries = L.geoJSON(data).addTo(map);
        })
    
        
    $.getJSON('data/pop.geojson', function(data) {
            myData = data.features
            for(d in myData){
                myData[d].properties.sov0name = myData[d].properties.sov0name.replace(/\s+/g, '');
                allCountries.push(myData[d].properties.sov0name)
                allCountries = _.uniq(allCountries);
                countries = allCountries;
            }
            loadData(countries);
        });
}



function loadData(countryList){
    console.log(myData)
    console.log(countryList)
    var pointsFilter = L.geoJSON(myData, {filter: function (feature, layer) {
        if(countryList != undefined){
            for (d in countryList){
                if(feature.properties.sov0name == countryList[d]){
                return true        
                }
           }
        }else{
            return true;
        }

      }})

      var markers = L.markerClusterGroup();
  
      

      
       groupData.clearLayers()
       groupData.addLayer(pointsFilter);   
       var newData = getFeaturesInView(groupData);
       var points = L.geoJSON(newData)
       groupData.removeLayer(pointsFilter);
       console.log('new', newData);
       
       markers.addLayer(points);
       //map.addLayer(markers);
       groupData.addLayer(markers).addTo(map);   
  
};


function getFeaturesInView(groupData) {
    var features = [];
    groupData.eachLayer( function(layer) {      
      for(d in layer._layers){
          
           if(map.getBounds().contains(layer._layers[d]._latlng)) {
            features.push(layer._layers[d].feature);
          } 
      }
      
    });
    //console.log(features);
    return features;
  }



  $('#btnBox').click(function(e){
    
    var divId = e.target.id
    if(divId != 'All'){
        var i = toggle.indexOf(divId);
        console.log('i',i);
        (i == -1) ?  toggle.push(divId) : toggle.splice(i, 1);
        console.log('toggle',toggle);
        countries = _.difference(allCountries, toggle); 
        loadData(countries);
    }else{
        (groupData.getLayers().length > 0) ? groupData.clearLayers() : loadData(countries);  
        }
});