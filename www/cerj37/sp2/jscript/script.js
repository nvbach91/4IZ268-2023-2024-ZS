var clicker = {
    cookie: 0,
    upgrades: {
        click_power: {
            amount: 0,
            cost: 5,
            cost_multiplier: 3,
            gen_p_sec: 1.5,
            click_multiplier: 1.5,
            name: "Zlaté ručičky",
            title: "Jsi více zkušený v pečení sušenek, a proto ti to jde lépe od ruky."
        },
        rolling_pins: {
            amount: 0,
            cost: 10,
            cost_multiplier: 0.15,
            gen_p_sec: 1,
            name: "Kvalitní válečky",
            title: "Lepší válečky, které se jen tak neopotřebují."
        },
        caffeine: {
            amount: 0,
            cost: 100,
            cost_multiplier: 0.15,
            gen_p_sec: 5,
            name: "Dávka kofeinu",
            title: "Teď můžeš péct sušenky celý den!"
        },
        materials: {
            amount: 0,
            cost: 250,
            cost_multiplier: 0.15,
            gen_p_sec: 25,
            name: "Donáška surovin",
            title: "Už nemusíš chodit do obchodů, jen péct... a občas jíst."
        },
        grandmas: {
            amount: 0,
            cost: 1000,
            cost_multiplier: 0.15,
            gen_p_sec: 200,
            name: "Osamělé babičky",
            title: "Osamělé babičky z nedalekého domovu důchodců, které ti rády pomůžou s pečením."
        },
        pills: {
            amount: 0,
            cost: 2500,
            cost_multiplier: 0.15,
            gen_p_sec: 450,
            name: "Podivuhodné pilulky",
            title: "Zvláštní pilulky, po kterých se cítíš podezřele dobře a plný energie."
        },
        ritual: {
            amount: 0,
            cost: 6666,
            cost_multiplier: 0.15,
            gen_p_sec: 666,
            name: "Temný rituál",
            title: "O tvých sušenkách se dozvěděla místní sekta. Vyvolávají pekelný oheň pro tvé pečení."
        },
        cosmic_power: {
            amount: 0,
            cost: 1000000,
            cost_multiplier: 0.15,
            gen_p_sec: 3000,
            name: "Kosmická síla",
            title: "Bytosti z celého vesmíru létají do tvé kuchyně a přinášejí ti suroviny z jiných planet."
        }
    }
};
function item_clicked(item) {
    if(clicker.upgrades[item].cost <= clicker.cookie){
        clicker.cookie-=clicker.upgrades[item].cost;
        clicker.upgrades[item].amount++;
        clicker.upgrades[item].cost += Math.round(clicker.upgrades[item].cost*clicker.upgrades[item].cost_multiplier)
        update_upgrades();
    }
}
function update_upgrades() {
    document.querySelector("#upgrades").innerHTML = "";
    for (i in clicker.upgrades) {
        document.querySelector("#upgrades").innerHTML += `<br> <button onclick = "item_clicked('${i}')">${clicker.upgrades[i].name}: ${clicker.upgrades[i].title}</button> máš ${clicker.upgrades[i].amount}. Cena: ${clicker.upgrades[i].cost}`;
    }
}
function update_count() {
    update_upgrades();
    setInterval(() => {
        for (i in clicker.upgrades) {
            clicker.cookie += clicker.upgrades[i].amount * clicker.upgrades[i].gen_p_sec / 20
        }
        document.querySelector("#cookie").innerHTML = "Máš " + String(clicker.cookie).split(".")[0] + " sušenek"
    }, 50);
}