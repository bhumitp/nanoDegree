function initMap() {

  //Map Options - Setting it to atlanta
  var coordinates = {
    lat: 33.7490,
    lng: -84.3880
  };

  //New Map
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: coordinates
  });

  // Adding starting Marker
  // var marker = new google.maps.Marker({
  //   position: coordinates,
  //   map: map
  // });
  //
  // //Adding info when you click the marker
  // var infoWindow = new google.maps.InfoWindow({
  //   content:'<h1>Atlanta</h1>'
  // });
  //
  // //Adding listener to pop up info on click
  // marker.addListener('click', function(){
  //   infoWindow.open(map, marker);
  // });

  var locations = [{
      title: 'Fox Theatre',
      coordinates:{lat: 33.7726059, lng: -84.3852046},
      type: 'Entertainment'
    },
    {
      title: 'CNN Studios',
      coordinates:{lat: 33.7580, lng: -84.3951},
      type: 'Entertainment'
    },
    {
      title: 'Coke Factory',
      coordinates:{lat: 33.7509397, lng: -84.3890936},
      type: 'Entertainment'
    },
    {
      title: 'GA Aquarium',
      coordinates:{lat: 33.7622222, lng: -84.395},
      type: 'Entertainment'
    }
  ]

  for(var i = 0; i < myLocations.length; i++){
    this.markerTitle = myLocations[i].title;
            this.markerLat = myLocations[i].lat;
            this.markerLng = myLocations[i].lng;
            var marker = new google.maps.Marker({
              position: {lat: this.markerLat,
                    lng: this.markerLng
                  },
              map: map
            });
    //addMarker(myLocations[i]);
  }

  //addMarker(coordinates);
  // addMarker({coordinates:{lat:42.4668,lng:-70.9495}});
  // addMarker({coordinates:{lat:42.8584,lng:-70.9300}});

  // function addMarker(props) {
  //   var marker = new google.maps.Marker({
  //     position: props.coordinates,
  //     map: map
  //   });
  // }
}
