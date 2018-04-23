// https://developers.google.com/kml/documentation/kml_tut
// https://developers.google.com/maps/documentation/javascript/kml
// https://developers.google.com/maps/documentation/javascript/kmllayer#overview
// https://developers.google.com/maps/documentation/javascript/examples/layer-kml


var rectangle;
var map;
var infoWindow;
var bounds = {};
var data1 = [];
var data2 = [];
var time = [];


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 2.2969, lng: 10.2406},
    scaleControl: true,
    zoom: 5
  });

  var bounds = {
    north: 2.2999,
    south: 1,
    east: 12.443,
    west: 8.649
  };

  // Define the rectangle and set its editable property to true.
  rectangle = new google.maps.Rectangle({
    bounds: bounds,
    editable: true,
    draggable: true
  });

  rectangle.setMap(map);

  // Add an event listener on the rectangle.
  rectangle.addListener('bounds_changed', showNewRect);

  // Define an info window on the map.
  infoWindow = new google.maps.InfoWindow();

  //call to check CSV
  checkCSV(bounds)
}


// Show the new coordinates for the rectangle in an info window.
/** @this {google.maps.Rectangle} */
function showNewRect(event) {
  var ne = rectangle.getBounds().getNorthEast();
  var sw = rectangle.getBounds().getSouthWest();

  var contentString = '<b>Rectangle moved.</b><br>' +
      'New north-east corner: ' + ne.lat() + ', ' + ne.lng() + '<br>' +
      'New south-west corner: ' + sw.lat() + ', ' + sw.lng();

  var newCoordinates = [];
  newCoordinates.push(ne.lat(), ne.lng(), sw.lat(), sw.lng());

  plotCheckAgain(newCoordinates);

  // Set the info window's content and position.
  infoWindow.setContent(contentString);
  infoWindow.setPosition(ne);

  infoWindow.open(map);
}


function checkCSV(bounds) {
  $.ajax({
    type: "GET",
    url: "https://raw.githubusercontent.com/vaidashi/map-dashboard/master/MAVIC_0103600_01.DAT_flightpath.csv",
    dataType: "text",
    success: function(data) {processData(data, bounds);}
  })
}


function processData(data, bounds) {
  var lines = data.split(/\r\n|\n/);
  // var time = [];
  var headings = lines[0].split(','); // Splice up the first row to get the headings

  for (var j=1; j<lines.length; j++) {
  var values = lines[j].split(','); // Split up the comma seperated values
     // We read the key,1st, 2nd and 3rd rows
     time.push(values[0]); // Read in as string
     // Recommended to read in as float, since we'll be doing some operations on this later.
     data1.push(parseFloat(values[1]));
     data2.push(parseFloat(values[2]));
  }

  var startLat = data1[0];
  var startLon = data2[0];
  plotCheck(bounds, startLat, startLon);
}


function plotCheck(range, lat, lon) {
  $('#myList').empty();
  $('p').empty();

  if ((lat <= range["north"] && lat >= range["south"]) && (lon <= range["east"] && lon >= range["west"])) {
    var str = JSON.stringify(range);

    $('#myList').append(`
      <table>
        <tr>
          <th>Date</th>
          <th>Bounds</th>
          <th>Report</th>
        </tr>
        <tr>
          <td> ${time[0]} </td>
          <td> ${str} </td>
          <td><button onclick="reportGenerator()">Click Here</button></td>
        </tr>
        </table>
      `)
  } else {
    $('#myList').empty();
    $('#myList').append('<p>No flights within this zone </p>');
  }

}


function plotCheckAgain(coords) {
  var startLat = data1[0];
  var startLon = data2[0];

  $('#myList').empty();
  $('p').empty();

  if ((startLat <= coords[0] && startLat >= coords[2]) && (startLon <= coords[1] && startLon >= coords[3])) {
    $('#myList').append(`
      <table>
        <tr>
          <th>Date</th>
          <th>Bounds</th>
          <th>Report</th>
        </tr>
        <tr>
          <td> ${time[0]} </td>
          <td>North:${coords[0]} South:${coords[2]} East:${coords[1]} West:${coords[3]} </td>
          <td><button onclick="reportGenerator()">Click Here</button></td>
        </tr>
        </table>
      `)
  } else {
    $('#myList').empty();
    $('#myList').append('<p>No flights within this zone </p>');
  }

}


function reportGenerator() {
  // **for kml overlay
  var ctaLayer = new google.maps.KmlLayer({
    url: 'https://raw.githubusercontent.com/vaidashi/map-dashboard/master/MAVIC_0103600_01.DAT.kml',
    map: map
  })

  $('p').empty();

  $.get("https://raw.githubusercontent.com/vaidashi/map-dashboard/master/MAVIC_0103600_01.DAT.html", function(data) {
    $("p").html(data);
  })

}
