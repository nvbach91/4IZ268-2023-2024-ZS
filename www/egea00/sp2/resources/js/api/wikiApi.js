function fetchLatestHTML(city) {
    const baseUrl = "https://en.wikipedia.org/api/rest_v1";

    const customUrl = `${baseUrl}/page/summary/${encodeURIComponent(city)}`;

    fetch(customUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('NETWORK ERROR');
            }
            return response.text();
        })
        .then(html => {
            console.log(html);
        })
        .catch(error => {
            console.error('Fetching HTML failed:', error);
        });
}


function cityInfo(city) {

    $.ajax({
        type:"GET",
        url:"https://en.wikipedia.org/api/rest_v1/page/summary/"+city,
        async:true,
        dataType: "json",
        success: function(json) {
            getEvents.json = json;
            showEvents(json);
        },
        error: function(xhr, status, err) {
            console.log(err);
        }
    });
}
