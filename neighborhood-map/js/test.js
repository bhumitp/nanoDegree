this.initMap = function() {

  //Setting height for the map and side bar
  windowHeight = $(window).innerHeight();
  $('#map').css('min-height', windowHeight);
  $('#sidebar').css('min-height', windowHeight);

  //Map Options - Setting it to atlanta by default
   coordinates = {
    lat: 33.7490,
    lng: -84.3880
  };

  //Drawing New Map
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: coordinates
  });

  //Iterating to the locations array from marker.js file
  for (var i = 0; i < locations.length; i++) {
    //Getting the title
    this.markerTitle = locations[i].title;
    //Getting latitude
    this.markerLat = locations[i].lat;
    //Getting longitude
    this.markerLng = locations[i].lng;

    //Getting the type
    this.markerType = locations[i].type;
    //Drawing that on the map
    var marker = new google.maps.Marker({
      position: {
        lat: this.markerLat,
        lng: this.markerLng
      },
      map: map
    });
  }
}




//////////////////////////////////////////////////////////////////////////////////////////////

// Global Variables
var map, clientID, clientSecret;

function AppViewModel() {
    var self = this;

    this.searchOption = ko.observable("");
    this.markers = [];

    // This function populates the infowindow when the marker is clicked. We'll only allow
    // one infowindow which will open at the marker that is clicked, and populate based
    // on that markers position.
    this.populateInfoWindow = function(marker, infowindow) {
        if (infowindow.marker != marker) {
            infowindow.setContent('');
            infowindow.marker = marker;
            // Foursquare API Client
            clientID = "SDAWFJVJMXDH011Q0JCQLB54FG4H232CSMAXO4HAJBC0KQYO";
            clientSecret =
                "LGTNR2W3Q1KUWC4DZNEHLP0UK1K3RX0OO1KAA30IWB1PLVPH";
            // URL for Foursquare API
            var apiUrl = 'https://api.foursquare.com/v2/venues/search?ll=' +
                marker.lat + ',' + marker.lng + '&client_id=' + clientID +
                '&client_secret=' + clientSecret + '&query=' + marker.title +
                '&v=20170801' + '&m=foursquare';
            // Foursquare API
            $.getJSON(apiUrl).done(function(marker) {
                var response = marker.response.venues[0];
                self.street = response.location.formattedAddress[0];
                self.city = response.location.formattedAddress[1];
                self.zip = response.location.formattedAddress[3];
                self.country = response.location.formattedAddress[4];
                self.category = response.categories[0].shortName;

                self.htmlContentFoursquare =
                    '<h5 class="iw_subtitle">(' + self.category +
                    ')</h5>' + '<div>' +
                    '<h6 class="iw_address_title"> Address: </h6>' +
                    '<p class="iw_address">' + self.street + '</p>' +
                    '<p class="iw_address">' + self.city + '</p>' +
                    '<p class="iw_address">' + self.zip + '</p>' +
                    '<p class="iw_address">' + self.country +
                    '</p>' + '</div>' + '</div>';

                infowindow.setContent(self.htmlContent + self.htmlContentFoursquare);
            }).fail(function() {
                // Send alert
                alert(
                    "There was an issue loading the Foursquare API. Please refresh your page to try again."
                );
            });

            this.htmlContent = '<div>' + '<h4 class="iw_title">' + marker.title +
                '</h4>';

            infowindow.open(map, marker);

            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
            });
        }
    };

    this.populateAndBounceMarker = function() {
        self.populateInfoWindow(this, self.largeInfoWindow);
        this.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout((function() {
            this.setAnimation(null);
        }).bind(this), 1400);
    };

    this.initMap = function() {

      windowHeight = $(window).innerHeight();
      $('#map').css('min-height', windowHeight);
      $('#sidebar').css('min-height', windowHeight);
        var mapCanvas = document.getElementById('map');
        var mapOptions = {
            center: new google.maps.LatLng(33.7490, -84.3880),
            zoom: 10,
        };
        // Constructor creates a new map - only center and zoom are required.
        map = new google.maps.Map(mapCanvas, mapOptions);

        // Set InfoWindow
        this.largeInfoWindow = new google.maps.InfoWindow();
        for (var i = 0; i < myLocations.length; i++) {
            this.markerTitle = myLocations[i].title;
            this.markerLat = myLocations[i].lat;
            this.markerLng = myLocations[i].lng;
            // Google Maps marker setup
            this.marker = new google.maps.Marker({
                map: map,
                position: {
                    lat: this.markerLat,
                    lng: this.markerLng
                },
                title: this.markerTitle,
                lat: this.markerLat,
                lng: this.markerLng,
                id: i,
                animation: google.maps.Animation.DROP
            });
            this.marker.setMap(map);
            this.markers.push(this.marker);
            this.marker.addListener('click', self.populateAndBounceMarker);
        }
    };

    this.initMap();

    // This block appends our locations to a list using data-bind
    // It also serves to make the filter work
    this.myLocationsFilter = ko.computed(function() {
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
}

googleError = function googleError() {
    alert(
        'Oops. Google Maps did not load. Please refresh the page and try again!'
    );
};

function startApp() {
    ko.applyBindings(new AppViewModel());
}
/////////////////////////////////////////////////////////////////////////////////////

<body>

  <div class="container-fluid h-100">
    <div class="row h-100">
      <main class="col p-0 navbar-inverse">
        <a href class="float-right m-3 navbar-light" data-target="#sidebar" data-toggle="collapse">
                    <span class="navbar-toggler-icon"></span>
                </a>
        <div class="content bg-inverse">
          <!-- Map Content -->
          <div id="map">
          </div>
        </div>
      </main>
      <nav class="col-2 collapse bg-inverse pt-2 h-100 sidebar_width" id="sidebar">
        <h4 class="app_title text-white">Neighborhood Map</h4>
        <!-- Search Input -->
        <input class="search" data-bind="textInput: searchOption, valueUpdate: 'afterkeydown'" placeholder="Search Locations...">
        <hr class="sidebar_hr">
        <ul class="nav flex-column" data-bind="foreach: myLocationsFilter">
          <a href="#">
            <li class="nav-item text-white location_list" data-bind="text: title, click: $parent.populateAndBounceMarker"></li>
          </a>
        </ul>
      </nav>
    </div>
  </div>
