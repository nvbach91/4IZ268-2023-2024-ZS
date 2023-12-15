if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
        $('#map').geomap({
            center: [
                position.coords.longitude,
                position.coords.latitude,
            ],
            zoom: 15
        })
    });
} else {
    console.log('Geolocation is not available');
}