var Map = function( latLng, zoom ) {

  this.googleMap = new google.maps.Map(document.getElementById('map'), {
    center: latLng,
    zoom: zoom
    // mapTypeId: google.maps.MapTypeId.SATELLITE
  })

  this.addMarker = function(latLng, title){
    var marker = new google.maps.Marker({
      position: latLng,
      map: this.googleMap,
      animation: google.maps.Animation.BOUNCE,
      title: title
    });

    return marker;
  }


  this.addInfoWindow = function(latLng, country){
    var marker = this.addMarker(latLng, country.name);
    var contentString = '<div id="content">'+
      '<h4 id="firstHeading" class="firstHeading"><u>'+ country.name +'</u></h4>'+
      '<p><b>Co-Ordinates:</b></p> <p>Latitude: '+ country.latlng[0] +', Longitude: '+ country.latlng[1]+'</p>'+
      '<p><b>Region: </b>'+ country.region +'</p>'+
      '<p><b>Sub-Region: </b>'+ country.subregion +'</p>'+
      '<p><a href="https://en.wikipedia.org/wiki/'+country.name+'" target="_blank">Wikipedia Entry</a></p> '+
      '</div>';
    marker.addListener('click', function(){
      var infoWindow = new google.maps.InfoWindow({
        content: contentString
      });
      infoWindow.open( this.map, marker);
      infoWindow.addListener('closeclick', function(){
        this.map.setCenter(latLng);
      }.bind(this));
    });
  }




};
