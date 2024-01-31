$(document).ready(function () {
    const storage = JSON.parse(localStorage.getItem('UNSENT_EMAIL')) ?? [];
    storage.forEach((item) => {
        $("#emailList").append("<div class=\"email-item list-group-item\">\n" +
                "        <div class=\"row\">\n" +
                "                <div class=\"col\">Komu: " + item.to + "</div>\n" +
                "                <div class=\"col\">CC: " + item.cc + "</div>\n" +
                "                <div class=\"col\">Předmět: " + item.subject + "</div>\n" +
                "                <div class=\"col\">Zpráva: " + item.body + "</div>\n" +
                "            </div></div>");
    });
});