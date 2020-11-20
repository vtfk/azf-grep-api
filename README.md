# azf-grep-api

Mikrotjeneste som returnerer aggregerte data fra UDIR's GREP-API
Primært for å hente ut kompetansemål tilhørende et utdanningsprogram og programområde

## API-endepunkter

### GET /utdanningsprogrammer

### GET /utdanningsprogrammer/:kode/:trinn/:programomraade

## Utvikling

- Klon repoet
- `$ npm install`

### Hente oppdaterte data fra UDIR

- `$ npm run start`
  - **Kjører**:
    - `npm run data:load`
      - `npm run data:load:utdanningsprogrammer` (Henter alle utdanningsprogrammer)
      - `npm run data:load:programomraader` (Henter alle programområder)
      - `npm run data:load:opplaeringsfag` (Henter alle opplæringsfag)
      - `npm run data:load:kompetansemaalsett` (Henter alle kompetansemålsett)
    - `npm run data:match`
      - `npm run data:match:opplaeringsfag` (Matcher kompetansemålsett mot opplæringsfag)
      - `npm run data:match:programomraader` (Matcher opplæringsfag mot programområder)
      - `npm run data:match:utdanningsprogrammer` (Matcher programområder mot utdanningsprogrammer)

### Starte lokal Azure function

- Pass på at du har siste versjon av [azure-functions-core-tools](https://www.npmjs.com/package/azure-functions-core-tools) installert
- `$ func start`

## Lisens

[MIT](/LICENSE.md)