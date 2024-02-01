var clicker = {
    cookie: 0,
    upgrades: {
        click_power: {
            amount: 0,
            cost: 5,
            cost_multiplier: 3,
            gen_p_sec: 1.5,
            name: "Zlaté ručičky",
            title: "Jsi více zkušený v pečení sušenek, a proto ti to jde lépe od ruky."
        },
        rolling_pins: {
            amount: 0,
            cost: 10,
            cost_multiplier: 0.3,
            gen_p_sec: 1,
            name: "Kvalitní válečky",
            title: "Lepší válečky, které se jen tak neopotřebují."
        },
        caffeine: {
            amount: 0,
            cost: 100,
            cost_multiplier: 0.3,
            gen_p_sec: 5,
            name: "Dávka kofeinu",
            title: "Teď můžeš péct sušenky celý den!"
        },
        materials: {
            amount: 0,
            cost: 250,
            cost_multiplier: 0.3,
            gen_p_sec: 25,
            name: "Donáška surovin",
            title: "Už nemusíš chodit do obchodů, jen péct... a občas jíst."
        },
        grandmas: {
            amount: 0,
            cost: 1000,
            cost_multiplier: 0.3,
            gen_p_sec: 200,
            name: "Osamělé babičky",
            title: "Osamělé babičky z nedalekého domovu důchodců, které ti rády pomůžou s pečením."
        },
        pills: {
            amount: 0,
            cost: 2500,
            cost_multiplier: 0.3,
            gen_p_sec: 450,
            name: "Podivuhodné pilulky",
            title: "Zvláštní pilulky, po kterých se cítíš podezřele dobře a plný energie."
        },
        ritual: {
            amount: 0,
            cost: 6666,
            cost_multiplier: 0.3,
            gen_p_sec: 666,
            name: "Temný rituál",
            title: "O tvých sušenkách se dozvěděla místní sekta. Vyvolávají pekelný oheň pro tvé pečení."
        },
        cosmic_power: {
            amount: 0,
            cost: 1000000,
            cost_multiplier: 0.3,
            gen_p_sec: 3000,
            name: "Kosmická síla",
            title: "Bytosti z celého vesmíru létají do tvé kuchyně a přinášejí ti suroviny z jiných planet."
        }
    },
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
var delay = 0;
function item_clicked(item) {
    if (clicker.upgrades[item].cost <= clicker.cookie) {
        clicker.cookie -= clicker.upgrades[item].cost;
        clicker.upgrades[item].amount++;
        clicker.upgrades[item].cost += Math.round(clicker.upgrades[item].cost * clicker.upgrades[item].cost_multiplier)
        update_upgrades();
    }
    sfx.click.play();
}
function update_upgrades() {
    document.querySelector("#upgrades").innerHTML = "";
    for (o in clicker.upgrades) {
        document.querySelector("#upgrades").innerHTML += `<br> <button class="button_upgrade" onclick = "item_clicked('${o}')">${clicker.upgrades[o].name}: ${clicker.upgrades[o].title}</button> máš ${clicker.upgrades[o].amount}. Cena: ${clicker.upgrades[o].cost}<br>`;
    }
}
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
                document.querySelector("#achievements").innerHTML += `<br>ZÍSKAL JSI OCENĚNÍ<br>${clicker.achievments[i].text}`;
            }
        }
        document.querySelector("#cookie").innerHTML = "Máš " + String(clicker.cookie).split(".")[0] + " sušenek";
        delay++;
        if (delay >= 40) {
            Cookies.set("clicker", JSON.stringify(clicker), { expires: 1000 });
            delay = 0;
        }
    }, 50);
}
