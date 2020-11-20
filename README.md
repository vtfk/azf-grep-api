# azf-grep-api

Mikrotjeneste som returnerer aggregerte data fra UDIR's GREP-API
Primært for å hente ut kompetansemål tilhørende et utdanningsprogram og programområde

## API-endepunkter

### GET /utdanningsprogrammer

- You can add query `?full=true` to get the whole objects with childs

Example response:

```json
// GET /utdanningsprogrammer

{
  "data": [
    {
      "kode": "BA",
      "url-data": "https://data.udir.no/kl06/v201906/utdanningsprogram/BA",
      "tittel": {
        "sme": "Huksen- ja ráhkadusteknihkka",
        "nob": "Bygg- og anleggsteknikk",
        "eng": "Building and Construction",
        "nno": "Bygg- og anleggsteknikk",
        "default": "Bygg- og anleggsteknikk"
      }
    },
    {
      "kode": "DH",
      "url-data": "https://data.udir.no/kl06/v201906/utdanningsprogram/DH",
      "tittel": {
        "eng": "Design, Arts and Crafts",
        "sme": "Design ja giehtaduodji",
        "nno": "Design og handverk",
        "nob": "Design og håndverk",
        "default": "Design og håndverk"
      }
    },

    [...]
  ],
  "count": 11
}
```

### GET /utdanningsprogrammer/:kode

```json
// GET /utdanningsprogrammer/EL

{
  "data": {
    "kode": "EL",
    "url-data": "https://data.udir.no/kl06/v201906/utdanningsprogram/EL",
    "tittel": {
      "sme": "Elektrofágat",
      "eng": "Electricity and Electronics",
      "nno": "Elektro og datateknologi",
      "nob": "Elektro og datateknologi",
      "default": "Elektro og datateknologi"
    },
    "trinn": [
      {
        "kode": "vg2",
        "url-data": "https://data.udir.no/kl06/v201906/aarstrinn/vg2",
        "tittel": {
          "nno": "Vidaregåande trinn 2",
          "nob": "Videregående trinn 2",
          "default": "Videregående trinn 2"
        },
        "programomraader": [
          {
            "kode": "ELAUT2----",
            "url-data": "https://data.udir.no/kl06/v201906/programomraader/ELAUT2----",
            "tittel": {
              "nob": "Automatisering",
              "eng": "Automation",
              "sme": "Automatiseren",
              "nno": "Automatisering",
              "default": "Automatisering"
            },
            "maal": [
              {
                "kode": "K1663",
                "url-data": "https://data.udir.no/kl06/v201906/kompetansemaal/K1663",
                "tittel": {
                  "eng": "plan, install, activate, and document programmable logical controller systems for digital and analogue signal handling related to electric, hydraulic and pneumatic systems, and using digital tools for programming, configuration and troubleshooting",
                  "nob": "planlegge, montere, sette i drift og dokumentere programmerbare logiske styringssystemer for digital og analog signalbehandling knyttet til elektriske, hydrauliske og pneumatiske anlegg, og bruke digitalt verktøy til programmering, konfigurering og feilsøking",
                  "default": "planlegge, montere, sette i drift og dokumentere programmerbare logiske styringssystemer for digital og analog signalbehandling knyttet til elektriske, hydrauliske og pneumatiske anlegg, og bruke digitalt verktøy til programmering, konfigurering og feilsøking"
                }
              },
              {
                "kode": "K1664",
                "url-data": "https://data.udir.no/kl06/v201906/kompetansemaal/K1664",
                "tittel": {
                  "eng": "plan and document control loops for temperature, pressure, RPMs, levels and amounts, and install and activate at least two of these",
                  "nob": "planlegge og dokumentere reguleringssløyfer for temperatur, trykk, turtall, nivå, mengde, og montere og sette i drift minst to av disse",
                  "default": "planlegge og dokumentere reguleringssløyfer for temperatur, trykk, turtall, nivå, mengde, og montere og sette i drift minst to av disse"
                }
              },
              {
                "kode": "K1665",
                "url-data": "https://data.udir.no/kl06/v201906/kompetansemaal/K1665",
                "tittel": {
                  "eng": "plan and document the installation and start-up of regulating valves with appurtenant actuators",
                  "nob": "planlegge og dokumentere montasje og idriftsetting av reguleringsventil med tilhørende forstillingselement",
                  "default": "planlegge og dokumentere montasje og idriftsetting av reguleringsventil med tilhørende forstillingselement"
                }
              },
              {...}
            ]
          },
          {...}
        ]
      },
      {...}
    ]
  }
}
```

## Utvikling

- Klon ned repoet
- `$ npm install`

### Hente oppdaterte data fra UDIR

`$ npm run start` eller `npm run data:load`

### Starte lokal Azure function

- Pass på at du har siste versjon av [azure-functions-core-tools](https://www.npmjs.com/package/azure-functions-core-tools) installert
- `$ func start`

## Publisere function

For å publisere ny release til Azure, opprett en release i github i master, så publiseres functionen til prod.

### Alternativ metode

- `$ az login`
- `$ func azure functionapp publish test-func-grep-api-v1`
- `$ func azure functionapp publish prod-func-grep-api-v1`

## Lisens

[MIT](/LICENSE.md)