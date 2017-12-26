//Initialize the map
var map;

//Initialize coordinates
var coordinates = {
  lat: 33.7490,
  lng: -84.3880
};

// Initialize the map
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: coordinates,
        zoom: 11,
        //disableDefaultUI: true
    });

    // Initializing the ko view model
    ko.applyBindings(new ViewModel());
}

// Alert if maps api fail
function googleError() {
    alert('There seems to be an issue with Google Maps API, Please try again later.');
}

// Building the constructor
var Place = function (data) {
    this.title = ko.observable(data.title);
    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.lng);
    this.marker = ko.observable();
    this.phone = ko.observable('');
    this.description = ko.observable('');
    this.address = ko.observable('');
    this.rating = ko.observable('');
    this.contentString = ko.observable('');
};

// ViewModel
var ViewModel = function () {

  var self = this;

    // Creating array of all locations
    this.placeList = ko.observableArray([]);

    // Creating objects for each marker/location
    myLocations.forEach(function (placeItem) {{}
        self.placeList.push(new Place(placeItem));
    });

    // Initializing the infowindow
    var infowindow = new google.maps.InfoWindow({
        maxWidth: 200,
    });

    // Initializing marker
    var marker;

    // Setting markers and requesting api data
    self.placeList().forEach(function (placeItem) {

        // Define markers for each place
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(placeItem.lat(), placeItem.lng()),
            map: map,
            animation: google.maps.Animation.DROP
        });
        placeItem.marker = marker;

        // Setting up varibales for api call

        //Foursquare api client ID
        var clientID = "SDAWFJVJMXDH011Q0JCQLB54FG4H232CSMAXO4HAJBC0KQYO";
        //Foursquare api client secret key
        var clientSecret = "LGTNR2W3Q1KUWC4DZNEHLP0UK1K3RX0OO1KAA30IWB1PLVPH";
        //Storing the latitude in variable
        var lat = placeItem.lat();
        console.log(lat);
        //Storing longitude in variable
        var lng = placeItem.lng();
        console.log(lng);
        //Storing title in variable
        var title = placeItem.title();
        console.log(title);

        // AJAX request to Foursquare
        $.ajax({
            url: 'https://api.foursquare.com/v2/venues/' + lat + ',' + lng +
            '&client_id=' + clientID +
            '&client_secret=' + clientSecret + '&query=' + title +
            '&v=20170801' + '&m=foursquare',
            dataType: "json",
            success: function (data) {
                // Make results easier to handle
                var result = data.response.venue;

                // The following lines handle inconsistent results from Foursquare
                // Check each result for properties, if the property exists,
                // add it to the Place constructor
                // Credit https://discussions.udacity.com/t/foursquare-results-undefined-until-the-second-click-on-infowindow/39673/2
                var contact = result.hasOwnProperty('contact') ? result.contact : '';
                if (contact.hasOwnProperty('formattedPhone')) {
                    placeItem.phone(contact.formattedPhone || '');
                }

                var location = result.hasOwnProperty('location') ? result.location : '';
                if (location.hasOwnProperty('address')) {
                    placeItem.address(location.address || '');
                }

                var description = result.hasOwnProperty('description') ? result.description : '';
                placeItem.description(description || '');

                var rating = result.hasOwnProperty('rating') ? result.rating : '';
                placeItem.rating(rating || 'none');

                // var url = result.hasOwnProperty('url') ? result.url : '';
                // placeItem.url(url || '');

                placeItem.canonicalUrl(result.canonicalUrl);

                // Infowindow code is in the success function so that the error message
                // displayed in infowindow works properly, instead of a mangled infowindow
                // Credit https://discussions.udacity.com/t/trouble-with-infowindows-and-contentstring/39853/14

                // Content of the infowindow
                var contentString = '<div id="iWindow"><h4>' + placeItem.name() +
                        placeItem.phone() + '</p><p>' + placeItem.address() + '</p><p>' +
                        placeItem.description() + '</p><p>Rating: ' + placeItem.rating() +
                      //'</p><p><a href=' + placeItem.url() + '>' + placeItem.url() +
                        '</a></p><p><a target="_blank" href=' + placeItem.canonicalUrl();
                        //  +
                        // '>Foursquare Page</a></p><p><a target="_blank" href=https://www.google.com/maps/dir/Current+Location/' +
                        // placeItem.lat() + ',' + placeItem.lng() + '>Directions</a></p></div>';

                // Adding the info windows
                // credit http://you.arenot.me/2010/06/29/google-maps-api-v3-0-multiple-markers-multiple-infowindows/
                google.maps.event.addListener(placeItem.marker, 'click', function () {
                    infowindow.open(map, this);
                    placeItem.marker.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(function () {
                        placeItem.marker.setAnimation(null);
                    }, 500);
                    infowindow.setContent(contentString);
                    map.setCenter(placeItem.marker.getPosition());
                });
            },
            // Alert the user on error. Set messages in the DOM and infowindow
            error: function (e) {
                infowindow.setContent('<h5 style=" color: red; ">Foursquare data is unavailable. Please try refreshing later.</h5>');
                //document.getElementById("error").innerHTML = '<h4 style=" color: red; ">Foursquare data is unavailable. Please try refreshing later.</h4>';
            }
        });

        // This event listener makes the error message on AJAX error display in the infowindow
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, this);
            placeItem.marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function () {
                placeItem.marker.setAnimation(null);
            }, 500);
        });
    });

    // Activate the appropriate marker when the user clicks a list item
    self.showInfo = function (placeItem) {
        google.maps.event.trigger(placeItem.marker, 'click');
        self.hideElements();
    };

    // Toggle the nav class based style
    // Credit Stacy https://discussions.udacity.com/t/any-way-to-reduce-infowindow-content-on-mobile/40352/25
    self.toggleNav = ko.observable(false);
    this.navStatus = ko.pureComputed (function () {
        return self.toggleNav() === false ? 'nav' : 'navClosed';
        }, this);

    self.hideElements = function (toggleNav) {
        self.toggleNav(true);
        // Allow default action
        // Credit Stacy https://discussions.udacity.com/t/click-binding-blocking-marker-clicks/35398/2
        return true;
    };

    self.showElements = function (toggleNav) {
        self.toggleNav(false);
        return true;
    };

    // Filter markers per user input
    // Credit http://codepen.io/prather-mcs/pen/KpjbNN?editors=001

    // Array containing only the markers based on search
    self.visible = ko.observableArray();

    // All markers are visible by default before any user input
    self.placeList().forEach(function (place) {
        self.visible.push(place);
    });

    // Track user input
    self.userInput = ko.observable('');

    // If user input is included in the place name, make it and its marker visible
    // Otherwise, remove the place & marker
    self.filterMarkers = function () {
        // Set all markers and places to not visible.
        var searchInput = self.userInput().toLowerCase();
        self.visible.removeAll();
        self.placeList().forEach(function (place) {
            place.marker.setVisible(false);
            // Compare the name of each place to user input
            // If user input is included in the name, set the place and marker as visible
            if (place.name().toLowerCase().indexOf(searchInput) !== -1) {
                self.visible.push(place);
            }
        });
        self.visible().forEach(function (place) {
            place.marker.setVisible(true);
        });
    };

}; // ViewModel
