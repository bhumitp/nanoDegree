//Initialize the map
var map;

//Initialize the array for location/markers
//setting up locations
// var myLocations = [
//     {
//         title: 'Fox Theatre',
//         lat: 33.7726059,
//         lng: -84.3852046,
//         type: 'Entertainment'
//     },
//     {
//         title: 'CNN Studios',
//         lat: 33.7580,
//         lng: -84.3951,
//         type: 'Entertainment'
//     },
//     {
//         title: 'Coke Factory',
//         lat: 33.7509397,
//         lng: -84.3890936,
//         type:  'Entertainment'
//     },
//     {
//         title: 'GA Aquarium',
//         lat: 33.7622222,
//         lng: -84.395,
//         type:  'Entertainment'
//     },
//     {
//         title: 'Phipps Plaza',
//         lat: 33.8525,
//         lng: 84.3620,
//         type: 'Shopping'
//     },
//     {
//         title: 'Lenox Mall',
//         lat: 33.8463,
//         lng: -84.3621,
//         type: 'Shopping'
//     },
//     {
//         title: 'Sun Trust Park',
//         lat: 33.8907,
//         lng: -84.4677,
//         type: 'Sports'
//     },
//     {
//         title: 'Phillips Arena',
//         lat: 33.7573,
//         lng: -84.3963,
//         type: 'Sports'
//     },
//     {
//         title: 'Shake Shack',
//         lat: 33.8377,
//         lng: -84.3809,
//         type: 'Restaurant'
//     }
// ]


//Initialize coordinates
var coordinates = {
  lat: 33.7490,
  lng: -84.3880
};

// Initialize the map
var map;
function initMap() {
    "use strict";
    map = new google.maps.Map(document.getElementById('map'), {
        center: coordinates,
        zoom: 11,
        disableDefaultUI: true
    });
    // Start the ViewModel here so it doesn't initialize before Google Maps loads
    ko.applyBindings(new ViewModel());
}

// Alert the user if google maps isn't working
function googleError() {
    "use strict";
    document.getElementById('error').innerHTML = "<h2>Google Maps is not loading. Please try refreshing the page later.</h2>";
}

// Place constructor
// Credit https://discussions.udacity.com/t/having-trouble-accessing-data-outside-an-ajax-request/39072/10
var Place = function (data) {
    "use strict";
    this.title = ko.observable(data.title);
    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.lng);
    this.id = ko.observable(data.id);
    this.marker = ko.observable();
    this.phone = ko.observable('');
    this.description = ko.observable('');
    this.address = ko.observable('');
    this.rating = ko.observable('');
    this.url = ko.observable('');
    this.canonicalUrl = ko.observable('');
    this.photoPrefix = ko.observable('');
    this.photoSuffix = ko.observable('');
    this.contentString = ko.observable('');
};

// ViewModel
var ViewModel = function () {
    "use strict";
    // Make this accessible
    var self = this;

    // Create an array of all places
    // Credit https://www.udacity.com/course/viewer#!/c-ud989-nd/l-3406489055/e-3464818693/m-3464818694
    this.placeList = ko.observableArray([]);

    // Call the Place constructor
    // Create Place objects for each item in locations & store them in the above array
    // Credit https://www.udacity.com/course/viewer#!/c-ud989-nd/l-3406489055/e-3464818693/m-3464818694
    myLocations.forEach(function (placeItem) {{}
        self.placeList.push(new Place(placeItem));
    });

    // Initialize the infowindow
    var infowindow = new google.maps.InfoWindow({
        maxWidth: 200,
    });

    // Initialize marker
    var marker;

    // For each place, set markers, request Foursquare data, and set event listeners for the infowindow
    // Credit https://github.com/kacymckibben/project-5-app.git
    self.placeList().forEach(function (placeItem) {

        // Define markers for each place
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(placeItem.lat(), placeItem.lng()),
            map: map,
            animation: google.maps.Animation.DROP
        });
        placeItem.marker = marker;

        var clientID = "SDAWFJVJMXDH011Q0JCQLB54FG4H232CSMAXO4HAJBC0KQYO";
        var clientSecret =
            "LGTNR2W3Q1KUWC4DZNEHLP0UK1K3RX0OO1KAA30IWB1PLVPH";
        var lat = placeItem.lat();
        console.log(lat);
        var lng = placeItem.lng();
        var title = placeItem.title();
        // Make AJAX request to Foursquare
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

                var bestPhoto = result.hasOwnProperty('bestPhoto') ? result.bestPhoto : '';
                if (bestPhoto.hasOwnProperty('prefix')) {
                    placeItem.photoPrefix(bestPhoto.prefix || '');
                }

                if (bestPhoto.hasOwnProperty('suffix')) {
                    placeItem.photoSuffix(bestPhoto.suffix || '');
                }

                var description = result.hasOwnProperty('description') ? result.description : '';
                placeItem.description(description || '');

                var rating = result.hasOwnProperty('rating') ? result.rating : '';
                placeItem.rating(rating || 'none');

                var url = result.hasOwnProperty('url') ? result.url : '';
                placeItem.url(url || '');

                placeItem.canonicalUrl(result.canonicalUrl);

                // Infowindow code is in the success function so that the error message
                // displayed in infowindow works properly, instead of a mangled infowindow
                // Credit https://discussions.udacity.com/t/trouble-with-infowindows-and-contentstring/39853/14

                // Content of the infowindow
                var contentString = '<div id="iWindow"><h4>' + placeItem.name() + '</h4><div id="pic"><img src="' +
                        placeItem.photoPrefix() + '110x110' + placeItem.photoSuffix() +
                        '" alt="Image Location"></div><p>Information from Foursquare:</p><p>' +
                        placeItem.phone() + '</p><p>' + placeItem.address() + '</p><p>' +
                        placeItem.description() + '</p><p>Rating: ' + placeItem.rating() +
                        '</p><p><a href=' + placeItem.url() + '>' + placeItem.url() +
                        '</a></p><p><a target="_blank" href=' + placeItem.canonicalUrl() +
                        '>Foursquare Page</a></p><p><a target="_blank" href=https://www.google.com/maps/dir/Current+Location/' +
                        placeItem.lat() + ',' + placeItem.lng() + '>Directions</a></p></div>';

                // Add infowindows credit http://you.arenot.me/2010/06/29/google-maps-api-v3-0-multiple-markers-multiple-infowindows/
                google.maps.event.addListener(placeItem.marker, 'click', function () {
                    infowindow.open(map, this);
                    // Bounce animation credit https://github.com/Pooja0131/FEND-Neighbourhood-Project5a/blob/master/js/app.js
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
