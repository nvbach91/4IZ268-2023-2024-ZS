if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
    });
} else {
    console.log('geolocation is not available');
}
