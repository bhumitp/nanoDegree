/////// Initializing Global Variables ////////////////////

//For the map
var map;

//Default coordinates for Atlanta
var coordinates = {lat:33.7490, lng:-84.3880}

//Needed for Foursquare API call
var clientID = "SDAWFJVJMXDH011Q0JCQLB54FG4H232CSMAXO4HAJBC0KQYO";
var clientSecret = "LGTNR2W3Q1KUWC4DZNEHLP0UK1K3RX0OO1KAA30IWB1PLVPH";

//Calling the starting function and loading view model
function drawMap() {
  ko.applyBindings(new viewModel());
}; //End of drawMap function

///////////////////////////////////////////////////////////////////////////////
/////// Main Function ////////////////////
///////////////////////////////////////////////////////////////////////////////

//Setting up viewModel
function viewModel() {
  //Initializing the plot variable
  var plot = this;
  //Calling initMap - sets up screen size and default markers
  this.initMap = function() {

    //Sets css properties for map and sidebar
    windowHeight = $(window).innerHeight();
    $('#map').css('min-height', windowHeight);
    $('#sidebar').css('min-height', windowHeight);


    //Draw the map on the screen
    var mapDraw = document.getElementById('map');
    var mapOptions = {
      center: new google.maps.LatLng(coordinates),
      zoom: 10,
    };

    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(mapDraw, mapOptions);

    // Setting the information window
    this.largeInfoWindow = new google.maps.InfoWindow();

    //Retrieving information from the locations array
    for (var i = 0; i < locations.length; i++) {
      this.markertitle = locations[i].title;
      this.markerLat = locations[i].lat;
      this.markerLng = locations[i].lng;

      // Adding markers on the screen
      this.marker = new google.maps.Marker({
        map: map,
        position: {
          lat: this.markerLat,
          lng: this.markerLng
        },
        title: this.markertitle,
        lat: this.markerLat,
        lng: this.markerLng,
        animation: google.maps.Animation.DROP //Drop marker animation
      });

      this.marker.setMap(map);
      this.markers.push(this.marker);
      this.marker.addListener('click', plot.populateAndBounceMarker);
    }
  }; //End of initMap



  // Populating the information window on click
  this.populateInfoWindow = function(marker, infowindow) {
    if (infowindow.marker != marker) {
      infowindow.setContent('');
      infowindow.marker = marker;

      // URL for Foursquare API
      var url = 'https://api.foursquare.com/v2/venues/search?ll=' +
        marker.lat + ',' + marker.lng + '&client_id=' + clientID +
        '&client_secret=' + clientSecret + '&query=' + marker.title +
        '&v=20170801' + '&m=foursquare';

      //Extracting data from the API response
      $.getJSON(url).done(function(marker) {
        var response = marker.response.venues[0];  //Gets entire response
        plot.street = response.location.formattedAddress[0];  //Get Street
        plot.city = response.location.formattedAddress[1];    //Get City
        plot.category = response.categories[0].shortName;     //Get Category

        //Formatting content for information window
        plot.htmlContentFoursquare =
          '<h5 class="iw_subtitle">(' + plot.category + ')</h5>' + '<div>' +
          '<h6 class="iw_address_title"> Address: </h6>' +
          '<p class="iw_address">' + plot.street + '</p>' +
          '<p class="iw_address">' + plot.city + '</p>';

        infowindow.setContent(plot.htmlContent + plot.htmlContentFoursquare);
      }).fail(function() {
        //Error handling for Foursquare API
        alert("There was an issue loading the Foursquare API. Please try again later.");
      });

      //Getting title from location array and setting it for information window
      this.htmlContent = '<div>' + '<h4 class="iw_title">' + marker.title + '</h4>';

      infowindow.open(map, marker);
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
      }); //End of addListener
    }
  }; //End of information window

  //Setting up the bounce animation
  this.populateAndBounceMarker = function() {
    plot.populateInfoWindow(this, plot.largeInfoWindow);
    this.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout((function() {
      this.setAnimation(null);
    }).bind(this), 1100);
  };

  //Setting up search option
  this.searchOption = ko.observable("");
  this.markers = [];
  this.initMap();

  //Integrating the knockout API
  this.locationsFilter = ko.computed(function() {
    var result = [];
    for (var i = 0; i < this.markers.length; i++) {
      var markerLocation = this.markers[i];
      if (markerLocation.title.toLowerCase().includes(this.searchOption()
          .toLowerCase())) {
        result.push(markerLocation);
        this.markers[i].setVisible(true);
      } else {
        this.markers[i].setVisible(false);
      }
    }
    return result;
  }, this);
} // End of viewModel function


//Handling google map api error
googleError = function googleError() {
  alert('There was an issue with Google Maps API. Please try again later');
}; //End of googleError function



////////////////////////////////////////////////////////////////////////////////////////////////////
//Adding marker data
////////////////////////////////////////////////////////////////////////////////////////////////////
var locations = [{
    title: 'Fox Theatre',
    lat: 33.7726059,
    lng: -84.3852046
  },
  {
    title: 'CNN Studios',
    lat: 33.7580,
    lng: -84.3951
  },
  {
    title: 'Coke Factory',
    lat: 33.7509397,
    lng: -84.3890936
  },
  {
    title: 'GA Aquarium',
    lat: 33.7622222,
    lng: -84.395
  },
  {
    title: 'Lenox Mall',
    lat: 33.8463,
    lng: -84.3621
  },
  {
    title: 'Sun Trust Park',
    lat: 33.8907,
    lng: -84.4677
  },
  {
    title: 'Phillips Arena',
    lat: 33.7573,
    lng: -84.3963
  },
  {
    title: 'Shake Shack',
    lat: 33.8377,
    lng: -84.3809
  }
]
