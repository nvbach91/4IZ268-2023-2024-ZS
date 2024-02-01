$("#verifyButton").click(() => {
    localStorage.setItem("API_KEY", JSON.stringify($("#apiKeyInput").val()));
    Swal.fire({
        icon: "success",
        title: "API key entered",
        showConfirmButton: false,
    });
})