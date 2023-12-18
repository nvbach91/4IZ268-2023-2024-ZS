
$('select').click(function () {
    alert('Selected filter for ' + $(this).attr('name'));

    
});

const getDataForFilterYear = () => {

        url = 'http://ergast.com/api/f1/seasons.json?limit=100';
        $.getJSON(url).done((seasons) => {
            seasons.MRData.SeasonTable.Seasons.forEach(season => {
                const element = $(`
                <option value='${season.season}'>
                ${season.season}
                </option>
            `);
                $('.select-year').append(element)
            });


        });
}




var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

getDataForFilterYear()