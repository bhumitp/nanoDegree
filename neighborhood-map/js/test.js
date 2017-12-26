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

  <!--Loading all the javascript files-->
  <script src="js/knockout-3.4.2.js" charset="utf-8"></script>
  <!-- <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script> -->
  <script src="js/locationData.js" charset="utf-8"></script>
  <script src="js/new_app.js" charset="utf-8"></script>
  <!-- <script src="js/manipulation.js" charset="utf-8"> -->
  </script>
  </script>
  <!-- <script async defer src="https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyC6zxg-IXHXe_YmCgQMXE2AULQfhhbqQlw&callback=startApp" onerror="googleError()"></script> -->
  <script async defer src="https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyC6zxg-IXHXe_YmCgQMXE2AULQfhhbqQlw&callback=initMap" onerror="googleError()"></script>

</body>
