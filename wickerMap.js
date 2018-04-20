var rectangle;
var map;
var infoWindow;
var bounds = {};

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


  //**call to response handler for hash iteration
  plotCheck(bounds);


  //**for kml overlay
  var ctaLayer = new google.maps.KmlLayer({
    url: 'https://raw.githubusercontent.com/vaidashi/map-dashboard/master/MAVIC_0103600_01.DAT.kml',
    map: map
  })
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


//**dummy data for test, will check db in real application
coordinateList = [4.017, 9.722] // mock report (bin file of lat longs)

var a = new Array();
a[0] = [1,2];
a[1] = [3.933766,9.834060];
a[2] = [3.670675, 11.525954];



function plotCheck(range) {
  a.forEach(function(element) {
    if ((element[0] <= range["north"] && element[0] >= range["south"]) && (element[1] <= range["east"] && element[1] >= range["west"])) {
      var str = JSON.stringify(range)

      $('#myList').append(`<li>Flight log exists within this zone  <button onclick="reportGenerator()">Click Here for the Flight Log Report </button> ${str}</li>`);
    }
    // else {
    //   $('#myList').append('<li>No flights within this zone</li>');
    // }
  })
}

function plotCheckAgain(coords) {
  $('#myList').empty();
  $('p').empty();

  a.forEach(function(element) {
    if ((element[0] <= coords[0] && element[0] >= coords[2]) && (element[1] <= coords[1] && element[1] >= coords[3])) { //north, east, south, west
      // $('#myList').empty();
      // debugger
      $('#myList').append(`<li>Flight log exists within this zone   <button onclick="reportGenerator()">Click Here for the Flight Log Report</button> <br />  <br /> North: ${coords[0]} <br /> South: ${coords[2]}<br /> East: ${coords[1]}<br /> West: ${coords[3]}</li> <br />`);
    } else {
      $('#myList').empty();
      // $('#myList').append('<li>No flights within this zone</li>');
    }
  })
}


// function plotCheck(range) {
//   if ((coordinateList[0] <= range["north"] && coordinateList[0] >= range["south"]) && (coordinateList[1] <= range["east"] && coordinateList[1] >= range["west"])) {
//     var str = JSON.stringify(range)
//     $('#myList').append(`<li>Flight log exists within this zone  <button onclick="reportGenerator(range)">Click Here for the Flight Log Report </button> ${str}</li>`);
//   } else {
//     $('#myList').append('<li>No flights within this zone</li>');
//   }
// }

// function plotCheckAgain(coords) {
//   if ((coordinateList[0] <= coords[0] && coordinateList[0] >= coords[2]) && (coordinateList[1] <= coords[1] && coordinateList[1] >= coords[3])) { //north, east, south, west
//     $('#myList').empty();
//     $('p').empty();
//     $('#myList').append(`<li>Flight log exists within this zone  <button onclick="reportGenerator(coordinateList)">Click Here for the Flight Log Report</button> <br />  <br /> North: ${coords[0]} <br /> South: ${coords[2]}<br /> East: ${coords[1]}<br /> West: ${coords[3]}</li>`);
//   }
//   else {
//     $('#myList').empty();
//     $('#myList').append('<li>No flights within this zone</li>');
//   }
// }

function reportGenerator() {
  $('p').empty();

  $('p').append(` <br />
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus tellus nec rhoncus pretium. Fusce varius urna ante, id vulputate lorem auctor faucibus. Nullam efficitur nunc eget bibendum molestie. Aenean elementum mattis velit, ut molestie sem malesuada luctus. Cras vehicula luctus ipsum vel ornare. Duis ac sapien nec dui fringilla aliquet. Aliquam bibendum, eros at scelerisque eleifend, diam est consectetur nunc, sed dignissim ex sem eget metus.

    Sed eu sollicitudin turpis, quis porta diam. Vivamus vitae gravida ex. In ac condimentum nulla. Maecenas consequat pretium lorem consequat commodo. Donec eget ipsum dignissim, ullamcorper lacus quis, consequat nisi. Etiam viverra magna ac euismod ultrices. Nullam posuere augue eget ligula maximus, in pellentesque eros tempus. Ut consectetur a massa imperdiet ullamcorper. Quisque diam lorem, rutrum ut augue in, suscipit fringilla orci.

    Pellentesque commodo ante ex, rhoncus sodales neque pharetra ultricies. Nullam diam massa, tempor eu nisi sed, consectetur congue ante. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce sem velit, varius sit amet sem in, rutrum pellentesque arcu. Nunc in tempor erat. Nullam eu nibh aliquet, ullamcorper elit non, eleifend nulla. Aenean laoreet gravida ligula id viverra. Curabitur porta ex viverra congue feugiat. Nullam et laoreet lacus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas massa erat, pretium in arcu eu, maximus dignissim mi. Nam et sodales nisi. Morbi mollis mi metus, id euismod risus venenatis vitae. Nunc ullamcorper, ipsum sed mollis porttitor, nibh neque iaculis eros, viverra pharetra sem quam eu lectus. Morbi consequat pretium leo, vitae gravida magna hendrerit eu. Nunc aliquet, nisi vitae consequat ultrices, ipsum leo gravida nunc, tincidunt volutpat mauris sapien sit amet risus.

    Sed eget urna odio. Nullam tristique, lectus nec porta feugiat, sapien sem sollicitudin dolor, at rutrum justo metus eget odio. Morbi porttitor rhoncus lacus, eget aliquam leo. Quisque nec urna condimentum, auctor risus id, scelerisque purus. Sed ullamcorper, nibh sit amet tempor euismod, libero dui vulputate lectus, quis condimentum urna ante id erat. Nunc in neque sit amet urna laoreet consectetur. Morbi scelerisque massa et urna dictum, id vulputate metus condimentum.
    ` );
}
