const apikey = "yOU3QMP9oKmbKdQlXMWG4ad0pFXlvqLn"
$(document).ready(function(){
    $.ajax({
        url: 'http://dataservice.accuweather.com/currentconditions/v1/125572',
        method: 'GET',
        dataType: 'json',
        data: {
            apikey: apikey,
            details: 'true'
        },
        success: function(response) {
            console.log(response);
            $('#current-weather').text(JSON.stringify(response[0].ApparentTemperature.Metric.Value));
        },
        error: function(xhr, status, error) {
        console.error(error);
        }
    });
});