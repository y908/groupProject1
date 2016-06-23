


// -----------------------
//	flickr stuff
// -----------------------

// use YOUR OWN KEY!!!!
// needs to be updated
var apiKey = "87d4ef71bdff0695666b4d895cb3b651";
	

// create variables
// for flickr
var apiurl;
var apiurl_size;
var selected_size;  

// set size
// of image to download
selected_size=75; 
 

// give lat & long and it will show within 20 mile radius
// apiurl = "https://api.flickr.com/services/rest/?method=flickr.photos.search&has_geo=1&lat=40.37&lon=-74.299&radius=20&api_key=" + apiKey  + "&per_page=10&format=json&nojsoncallback=1";  


// -----------------------
//	GOOGLE STUFF
// -----------------------

// starting location
var temp1 = 41;
var temp2 = -75;


// initiate map
function initMap() {


  // latitude and logitude
  var myLatLng = {lat: temp1, lng: temp2};


	// old code to start a map

	/*

	  // create new map
	  var map = new google.maps.Map(document.getElementById('map'), {
		  zoom: 8,
		  center: myLatLng
		});

	*/



// style map our way
var styles = [
    {
      stylers: [
      { "saturation": -40 },
      { "hue": "#0008ff" },
      { "visibility": "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 50 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    },{
      featureType: "labels",
      elementType: "labels",
      stylers: [
        { lightness: 40 }
      ]
    }
  ];

var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});


var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(temp1, temp2),
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  };


  var map = new google.maps.Map(document.getElementById('map'),
    mapOptions);

  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

// end of styling map


// marker image
//var imageFlag = 'beachflag.png';
var imageFlag = 'pbjelly.gif';


// so when you click it puts a pin there 
// EVENT LISTENER - click on map
// here!!!
google.maps.event.addListener(map, 'click', function(eventFTW) {

    marker = new google.maps.Marker({
    	position: eventFTW.latLng, 
    	map: map,
   	  icon: imageFlag,
 	    optimized: false,
    });


	//get photos from location where I clicked

    loadPhotos(eventFTW.latLng.lat(),eventFTW.latLng.lng());

}); // end map click listener




//==========================================
// MARKERS ON GOOGLE MAPS
//==========================================


// // starting marker
//   var marker = new google.maps.Marker({
//     position: myLatLng,
//     map: map,
//     icon: imageFlag,
//     optimized: false,
//     title: 'hello world'
//   });



// // add another marker  -- this code works
// myLatlng = new google.maps.LatLng(temp1+1,temp2+1);

// 	var marker = new google.maps.Marker({
// 	    position: myLatlng,
// 	    title:"Hello World!"
// 	});

// 	// To add the marker to the map, call setMap();
// 	marker.setMap(map);
  
}//END OF GOOGLE MAPS INITIATION FUNCTION
//========================================
// END OF GOOGLE MAPS INITIATION FUNCTION
//========================================




//======================================
// code I found -- doesn't work yet
//======================================

// function addMyMarker() { //function that will add markers on button click

// 	alert("hello");

// myLatlng = new google.maps.LatLng(temp1+1,temp2+1);


//     var marker = new google.maps.Marker({
//         position:myLatlng,
//         map: map,
//         title:"This a new marker!"
//     });

//     marker.setMap(map);
// }

//======================================
// trying to get it work after initialization
// doesn't work yet!
//=======================================


// function placemarker(){

//       temp1 = 41.5;
//       temp2 = -74.5;

// // add another marker
//   myLatLng2 = {lat: temp1, lng: temp2};

//   marker = new google.maps.Marker({
//     position: myLatLng2,
//     map: map,
//     title: 'Hello World 2!'
//   });
//   // google maps marker

// }







//===========================================================================
// 		flickr function for GPS input
//===========================================================================


function loadPhotos(aaa,bbb){  

	apiurl = "https://api.flickr.com/services/rest/?method=flickr.photos.search&has_geo=1&lat="+aaa+"&lon="+bbb+"&radius=5&api_key=" + apiKey  + "&per_page=3&format=json&nojsoncallback=1";  

	$.getJSON(apiurl,function(jsonFTW){  

		//console.log(jsonFTW);

		$.each(jsonFTW.photos.photo,function(i,myresult){  

			//console.log("running" + i);
			
			// my result.id --- the ID can be for a specific photo, eg: 27234882763

			apiurl_size = "https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=" + apiKey + "&photo_id="+myresult.id+"&format=json&nojsoncallback=1"; 

			$.getJSON(apiurl_size,function(sizeFTW){  

				//console.log(sizeFTW);

				// only display stuff if we know its GPS location
				if(sizeFTW.photo.location.latitude != ""){

					//alert("success");

					apiurl_size = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=" + apiKey + "&photo_id="+myresult.id+"&format=json&nojsoncallback=1"; 

					$.getJSON(apiurl_size,function(sizeFTW2){  

						$.each(sizeFTW2.sizes.size,function(i,myresult_size){  


							//console.log("doing" + i);

							// this only shows the images of the correct size !!!
							// otherwise ALL size types of each image is displayed !!!

							// only load SQUARE previews -- 75x75
							if(myresult_size.width==selected_size && myresult_size.height==selected_size){ 
								// displays longitude too 
								//$("#results").append('<a href="'+myresult_size.url+'" target="_blank"><img src="'+myresult_size.source+'"/></a><br><text>Latitude:'+sizeFTW.photo.location.latitude+'<br>Longitude:'+sizeFTW.photo.location.longitude+'</text><br>');  
								$("#results").append('<a href="'+myresult_size.url+'" target="_blank"><img title="'+sizeFTW.photo.location.latitude+' and '+sizeFTW.photo.location.longitude+'" src="'+myresult_size.source+'"/></a>');

							} // end of IF statement

						}); // end of .each

					}) // end of .getJSON

				} // end of IF statement

			}) // end of .getJSON

		}); // end of .each

	}); // end of .getJSON

} // end loadPhotos



$(document).ready(function() {


// code to have the button do something -- still doesn't work

/*	 $('#btn').on('click', function(){
	 	//placemarker(41.2,-74.2);
	 	alert("you clicked");

	 });*/


	/*$('#btn').on('click', function() {

		//alert("hi");

	      temp1 = 41.5;
	      temp2 = -74.5;
		  myLatLng2 = {lat: temp1, lng: temp2};

	//    addmarker(myLatLng2);
	//  		addMyMarker();

	})*/

// end of *** code

});