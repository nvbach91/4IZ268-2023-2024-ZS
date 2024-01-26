# Build prereqs
Vue 3 + Vite
Dependencies in package.json

# Stav aplikace
- Aplikace má připraveny funkce pro založení, edit, výmaz a odeslání todočka do prmárního Google calendáře přihlášeného usera. 
- Todos se ukládají v Indexed DB
- Todos se dají sortovat podle přepínatelného filteru 
- Edit probíhá přímo přepisem/updatem hodnot v listu (pomocí Vue Watch direktivy), editovatelné části jsou vizuálně interaktivní 

## Implementační caveats
- Google APIs mi nedovolí do appky přidat víc než jednoho test usera pro Oauth token bez toho, aniž bych appku publikoval, as is tedy funkcionalita nepřijme jiný google účet než můj
- Google API velmi agresivně zařezává přihlášení z non authorised URLs, pro testovací účely jsou otevřeny adresy http://localhost a https://localhost na portech 8080 a 5173, v případě použití jiných portů nebude fungovat autentizace na origin_uri_mismatch erroru (sidenote: je potřeba používat HTTPS protokol i když autentizační služba googlu vrací HTTP, důvod neznám a v dokumentaci o tom nic není)
- Jelikož zapracování důkladnějích notifikací vyžaduje připojení externích knihoven/komponent, pro notifikace o logout a API operacích se používají standartní JS alerty
- Aplikace implicitně pracuje s "primárním" kalendářem přihlášeného uživatele (tj. osobní kalendář uživatele)
- Aplikace implicitně nepodporuje posílání dokončených tasků do Google Calendar

## Known issues
- Select v rámci založení todo "neumí" zobrazovat placeholder, patrně se kope s implmentací v-modelu 
- Nepodařilo se mi rozchodit modální okna podle představ (tj. tak aby korektně došlo k předání dat mezi modálem a source dokumentem), problém je dle mého názoru v tom jak pracují Vue komponenty ve vztahu k deklaraci jednotlivým skriptům a v-modelu (jinak řečeno měl jsem problém skloubit komponenty s tím, jak jsem si představoval že appka bude fungovat)
- Čistý výstup npm run build do index.html špatně generuje paths -> je potřeba ručně před /assets dopsat tečku, jinak bude docházet k nějaké zvlášní variantě 404 erroru (projevuje se jako zablokování přístupu ke zdroji, byť se jedná o path mismatch https://medium.com/developer-rants/why-is-strict-mime-type-checking-blocking-the-static-serving-of-vue-frontend-files-4cbea1eedbd1)

### Resolved issues 
- RESOLVED: Z neznámého důvodu se špatně inicializuje gapi client po prohnání npm run build (po nahrání dist output na ESO), fix: https://stackoverflow.com/questions/61100835/error-using-google-login-vue-gapi-is-not-defined , tldr: je potřeba appendnout další google platform.js skript na úrovni indexu appky

```
    <script src="https://apis.google.com/js/platform.js"></script>
    <script>
      let app = new Vue({
        el: '#app',
        methods: {
          test() {
            console.log('method', gapi);
          },
        },
        mounted() {
          console.log('mounted', gapi);
        },
      });
    </script>
```
-- resolution: úprava load orderu v onMounted funkci, previously při incializaci appky mohl nastat případ, kdy validace empty hodnot při načítání databáze zařízla zbytek on mounted funkce a nedošlo k načtení potřebných google scritpů pro obsloužení loginu 



