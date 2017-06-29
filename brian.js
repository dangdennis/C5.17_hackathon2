var map;

function initMap(position) {
    var pyrmont = {lat: position.coords.latitude, lng: position.coords.longitude};

    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 17
    });

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: pyrmont,
        radius: 10000,
        type: ['bar']
    }, processResults);
}

function processResults(results, status, pagination) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return;
    } else {
        createMarkers(results);

        if (pagination.hasNextPage) {
            var moreButton = document.getElementById('more');

            moreButton.disabled = false;

            moreButton.addEventListener('click', function() {
                moreButton.disabled = true;
                pagination.nextPage();
            });
        }
    }
}

function createMarkers(places) {
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0, place; place = places[i]; i++) {
        var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };

        var marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
        });
            var row = $("<tr>");
            var name = $("<td>").text(place.name);
            var address = $("<td>").text(place.vicinity);
            $("tbody").append(row);
            $(row).append(name, address);

        bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
}
function getLocation(){
    navigator.geolocation.getCurrentPosition(initMap);
}
$(document).ready(function(){
    getLocation();
})