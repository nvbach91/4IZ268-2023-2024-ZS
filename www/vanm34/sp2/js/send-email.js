const localStorageKey = 'UNSENT_EMAIL';
const restApiUrl      = 'http://51.21.135.226/api/sendEmail';
const form            = document.querySelector("#emailForm");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    $.ajax({
        url:         restApiUrl,
        data:        formData,
        cache:       false,
        processData: false,
        contentType: false,
        type:        'POST',
        beforeSend:  function (request) {
            const apiKey = JSON.parse(localStorage.getItem("API_KEY"))
            request.setRequestHeader("Api-Key", apiKey);
            Swal.fire({
                icon:              "info",
                title:             "sending...",
                showConfirmButton: false,
            });

        },
        success:     function () {
            console.log("SUCCESS!");
            Swal.fire({

                icon:              "success",
                title:             "Email sent!",
                showConfirmButton: false,
                timer:             2500
            });
        },
        error:       function (e) {
            if (e.status === 403) {
                Swal.fire({
                    icon:              "error",
                    title:             "Wrong API key",
                    showConfirmButton: false,
                });
            } else {
                const formDataFormatted = {
                    to:      formData.get("to"),
                    cc:      formData.get("cc"),
                    subject: formData.get("subject"),
                    body:    formData.get("body"),
                }
                const storedFormData    = JSON.parse(localStorage.getItem(localStorageKey)) || [];
                storedFormData.push(formDataFormatted)
                localStorage.setItem(localStorageKey, JSON.stringify(storedFormData));
            }
        }
    });
});