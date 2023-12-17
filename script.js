function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 50.07548904418945, lng: 14.434978485107422 },
        zoom: 14
    });

    const marker = new google.maps.Marker({
        position: { lat: 50.07548904418945, lng: 14.434978485107422 },
        map: map,
        title: 'My location'
    });
}