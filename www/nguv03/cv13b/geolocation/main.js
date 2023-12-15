if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        $("#map").geomap({
            center: [longitude, latitude],
            zoom: 15
        });
    });
} else {
    console.log('Geolocation is not available');
}