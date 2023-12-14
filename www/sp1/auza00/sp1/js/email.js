function sendEmail(){
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "t.auzky@outlook.cz",
        Password: "1B3A081CD6E994177F93FDD7649FB93A7CC4",
        To : 't.auzky@outlook.cz',
        From : document.getElementById("email").value,
        Subject : "Konktaktní formulář z webu",
        Body : "Jméno: " + document.getElementById("fname").value + "<br>"
            + "Příjmení: " + document.getElementById("lname").value + "<br>"
            + "Předmět: " + document.getElementById("subject").value + "<br>"
            + "Zpráva: " + document.getElementById("message").value
    }).then(
      message => alert(message)
    );
}