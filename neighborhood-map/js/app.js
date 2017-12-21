function initMap() {

  //Map Options - Setting it to atlanta
  var coordinates = {
    lat: 33.7490,
    lng: -84.3880
  };

  //New Map
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: coordinates
  });

  // Adding starting Marker
  var marker = new google.maps.Marker({
    position: coordinates,
    map: map
  });

  //Adding info when you click the marker
  var infoWindow = new google.maps.InfoWindow({
    content:'<h1>Atlanta</h1>'
  });

  //Adding listener to pop up info on click
  marker.addListener('click', function(){
    infoWindow.open(map, marker);
  });
}
