# Jak založit nový projekt

Tento soubor popisuje, co podniknout za kroky při zakládání nového projektu postaveného na šabloně [monorepo-starter](https://github.com/manGoweb/monorepo-starter).

1. Na [stránce šablony](https://github.com/manGoweb/monorepo-starter) klikni na tlačítko `Use this template`.
1. Repozitář si pojmenuj ideálně podle konvence `{nazev-projektu}-monorepo`. Například pro projekt `Who's laughing now` tedy `whos-laughing-now-monorepo` nebo pro `Aura` název repa `aura-monorepo`.
1. Pro nově vytvořený repozitář proveď následující kroky:

   1. V [Contember Selfcare](https://selfcare.eu.contember.cloud/org/mangoweb/create-project) založ betu a prod.

      1. Do _Project Name_ dej `{nazev-projektu}-prod` (např. `whos-laughing-now-prod`, `aura-prod`) a do _Project Group Slug_ jen `{nazev-projektu}`. _Database_ nastav na `Bring your own database` -> `mgw`. Pokračuj tlačítkem _Create Project_.
      1. Vytvoř ještě druhý projekt s _Project Name_ `{nazev-projektu}-beta` a v _Advanced Settings_ v _Project Group_ vyber `{nazev-projektu}` z předchozího kroku.
      1. Nastav si heslo do contentové administrace přes odkaz, který ti přišel do e-mailové schránky.
      1. Ze sekce _Content GraphQL API_ v Selfcare překopíruj URL do příslušného `.env` souboru. Pro prod do `website/.env.prod` a pro betu do `website/.env.beta` na řádek za `CONTEMBER_API_URL=`. Commitni.
      1. Tlačítkem _Create new Deploy Token_ získej DSN pro prod i betu. Začínají na `contember://{nazev-projektu}-`. Vlož je do repozitáře pod _Settings_>_Secrets_>_Actions_>_New repository secret_ s názvem `CONTEMBER_PROD_DSN` a `CONTEMBER_BETA_DSN`.
      1. Proveď první deploy Contember části tím.
         1. Pushni do `deploy/contember/{stage}`.
            ```sh
            git push origin HEAD:deploy/contember/prod
            git push origin HEAD:deploy/contember/beta
            ```
         1. Ověř si, že v repozitáři v záložce _Actions_ deploye úspěšně doběhly.

   1. Nasaď frontend:

      1. Mezi secrets přidej ještě `VERCEL_TOKEN`, který získáš z [1passwordu](https://start.1password.com/open/i?a=ICPKCFXVEFAAJN3JQNJEB6QCVM&h=mangoweb.1password.com&i=6rt62rr45rffvbwl6bkguogkt4&v=3wa6zbwihzewbpmpnu7ytecy2i).

      1. Proveď první deploy frontend části.

         1. Na [Sentry.io](https://sentry.io/) pod organizací `mangoweb` založ nový projekt pojmenovaný jako `{nazev-projektu}` (například `whos-laughing-now`, `aura`).

            1. Uprav soubor `website/.env`. `SENTRY_PROJECT=""` přepiš na `SENTRY_PROJECT="{nazev-projektu}"` a najdi v administraci Sentry DNS projektu (https://sentry.io/settings/mangoweb/projects/`{nazev-projektu}`/keys/), které doplň do `NEXT_PUBLIC_SENTRY_DSN`.

         1. V Selfcare vytvoř pro každou stage nový API token přes _Create new API token_ s _Description_ `website` a rolí `public`. Token překopíruj do příslušného `.env.{stage}` souboru ve složce `website` na řádek za `CONTEMBER_TOKEN=`.
         1. V `.env` souborech uprav `NEXT_PUBLIC_WEB_URL` podle následující šablony:
            - `.env.prod`
              ```
              NEXT_PUBLIC_WEB_URL="https://{nazev-projektu}.vercel.app"
              ```
            - `.env.beta`
              ```
              NEXT_PUBLIC_WEB_URL="https://{nazev-projektu}-beta.vercel.app"
              ```
         1. Pusť následující příkaz a odpověz na následující otázky na příkazové řádce:

            ```sh
            npx vercel --token={VERCEL_TOKEN}
            ```

            `{VERCEL_TOKEN}` nahraď stejným tokenem z 1passwordu jako v secrets.

            1. _Set up and deploy?_: `Y`
            1. _Which scope do you want to deploy to?_: `manGoweb`
            1. _Link to existing project?_: `N`
            1. _What’s your project’s name?_: `aura-prod`
            1. _In which directory is your code located?_: `./`
            1. _Want to modify these settings?_: `N`

         1. Přihlas se do [Vercelu](https://vercel.com/mangowebcz) nebo požádej někoho, kdo má přístup do mangowebí organizace (@FilipChalupa, @ViliamKopecky).

         1. V _Settings_ nově nasazeného projektu změň pod _Serverless Functions_ ve vybírátku region na `Frankfurt, Germany (West) – fra1`.

         1. Pro produkční stage uprav pod _Domains_ adresu z `{nazev-projektu}-prod.vercel.app` na `{nazev-projektu}.vercel.app`. (Stage necháváme jen u bety. U produ je důležitější, aby adresa byla jednodušeji zapamatovatelná a hezčí na pohled.)

         1. Obsah souboru `.vercel/project.json` přesuň do `.vercel/prod.json`.

         1. `.vercel/project.json` a `.vercel/README.txt` smaž.

         1. Opakuj kroky výše, ale tentokrát jako _project's name_ napiš `aura-beta` a `project.json` přesuň do `beta.json`.

         1. Z `.gitignore` odstraň řádek se záznamem `.vercel`.

         1. Commitni frontendové úpravy.

      1. Pro kontrolu a řádné donastavení všech proměnných proveď druhý deploy frontend části.
         1. Pushni do `deploy/website/{stage}`.
            ```sh
            git push origin HEAD:deploy/website/prod
            git push origin HEAD:deploy/website/beta
            ```
         1. Ověř si, že v repozitáři v záložce _Actions_ deploye úspěšně doběhly.

1. Smaž tento soubor `burn-after-reading.md` i odkaz na něj z [README.md](README.md).
