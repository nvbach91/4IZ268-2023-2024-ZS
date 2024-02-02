let clicker = {
    cookie: 0,
    upgrades: {},
    achievments: [{ req: "clicker.cookie>0", gotten: false, text: "Upekl si první sušenku!" },
    { req: "clicker.cookie>100", gotten: false, text: "Upekl si sto sušenek!" },
    { req: "clicker.cookie>10000", gotten: false, text: "Upekl si deset tisíc sušenek!" },
    { req: "clicker.cookie>100000", gotten: false, text: "Upekl si sto tisíc sušenek!" }]
};
var sfx = {
    click: new Howl({
        src: ["/sounds/click.mp3"]
    }),
    achieve: new Howl({
        src: ["/sounds/Woosh-Mark_DiAngelo-4778593.mp3"]
    })
}
document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        document.querySelector("#loader").style.visibility = "visible";
    } else {
        document.querySelector("#loader").style.display = "none";
        document.querySelector("body").style.visibility = "visible";
    }
};
let numAch = 0;

var start = performance.now();


var submit = document.getElementById("form1")
submit.addEventListener("submit", function (e) {
    var stop = performance.now();
    e.preventDefault();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var achievsGotten = numAch;
    var timer = (stop - start) / 1000;
    var body = "name " + name + '<br/> email: ' + email + '<br/> Získaných ocenění: ' + achievsGotten + '<br/> Hrál si: ' + timer;
    console.log(body);
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "cerj37@vse.cz",
        Password: "D873B2A230CEFF8B84DE84DB0D5108E1C21A",
        SecureToken: "5115a0bb-6218-4015-8dd8-d816ca97ba95",
        To: 'cerj37@vse.cz',
        From: "jcerny03@gmail.com",
        Subject: "Statistiky:",
        Body: body
    }).then(
        message => alert(message)
    );
});
var delay = 0;
function upgrade_clicked(upgrade_key) {
    if (clicker.upgrades[upgrade_key].cost <= clicker.cookie) {
        clicker.cookie -= clicker.upgrades[upgrade_key].cost;
        clicker.upgrades[upgrade_key].amount++;
        clicker.upgrades[upgrade_key].cost += Math.round(clicker.upgrades[upgrade_key].cost * clicker.upgrades[upgrade_key].cost_multiplier)
        update_upgrades();
    }
    sfx.click.play();
}
//function update_upgrades() {
//    document.querySelector("#upgrades").innerHTML = "";
//    for (o in clicker.upgrades) {
//        document.querySelector("#upgrades").innerHTML += `<br> <button class="button_upgrade" onclick = "item_clicked('${o}')">${clicker.upgrades[o].name}: ${clicker.upgrades[o].title}</button> máš ${clicker.upgrades[o].amount}. Cena: ${clicker.upgrades[o].cost}<br>`;
//    }
//}
function update_upgrades() {
    const upgradesContainer = document.querySelector("#upgrades");
    upgradesContainer.innerHTML = "";

    for (const upgrade_key in clicker.upgrades) {
        console.log(upgrade_key);
        const upgrade = clicker.upgrades[upgrade_key];
        const button = document.createElement("button");
        //button.className = "button_upgrade";
        button.textContent = `${upgrade.name}: ${upgrade.title} máš ${upgrade.amount}. Cena: ${upgrade.cost}`;
        button.addEventListener("click", function () {
            upgrade_clicked(upgrade_key);
        });

        const br = document.createElement("br");

        upgradesContainer.appendChild(button);
        upgradesContainer.appendChild(br);
    }
}
function cookie_clicked() {
    clicker.cookie++
}
document.getElementById("main-button").addEventListener("click", cookie_clicked);

const logAchievments = document.querySelector("#achievements");

function update_count() {
    var clicker1;

    if (Cookies.get("clicker") != null && Cookies.get("clicker") != "undefined") {
        clicker1 = JSON.parse(Cookies.get("clicker"));
        for (i in clicker.upgrades) {
            if (clicker1.upgrades[i] == null) {
                clicker1.upgrades[i] = clicker.upgrades[i];
            }
        }

        for (i in clicker.achievments) {
            if (clicker1.achievments[i] == null || clicker.achievments[i].text != clicker1.achievments[i].text) {
                clicker1.achievments[i] = clicker.achievments[i]
            }
        }
    } else {
        clicker1 = clicker;
    }

    clicker = clicker1;
    update_upgrades();
    setInterval(() => {
        for (i in clicker.upgrades) {
            clicker.cookie += clicker.upgrades[i].amount * clicker.upgrades[i].gen_p_sec / 20
        }
        for (i in clicker.achievments) {
            var a = new Function('return ' + clicker.achievments[i].req)
            if (a() && !clicker.achievments[i].gotten) {
                clicker.achievments[i].gotten = true;
                logAchievments.innerHTML += `<br>ZÍSKAL JSI OCENĚNÍ<br>${clicker.achievments[i].text}`;
                numAch++;
            }
        }
        document.querySelector("#cookie").innerHTML = "Máš " + String(clicker.cookie).split(".")[0] + " sušenek";
        delay++;
        if (delay >= 40) {
            Cookies.set("clicker", JSON.stringify(clicker), { expires: 10000 });
            delay = 0;
        }
    }, 50);
}

function fetchUpgrades() {
    fetch('https://johns-cookies-default-rtdb.firebaseio.com/upgrades.json')
        .then(response => response.json())
        .then(data => {
            clicker.upgrades = data;
            update_upgrades();
        })
        .catch(error => console.error('Error fetching upgrades:', error));
}

onload = () => {
    update_count();
    fetchUpgrades();
};
