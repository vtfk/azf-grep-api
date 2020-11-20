module.exports = {
  PROGRAMOMRADER_URL: 'https://data.udir.no/kl06/programomraader.json',
  UTDANNINGSPROGRAM_URL: 'https://data.udir.no/kl06/utdanningsprogram.json',
  OPPLAERINGSFAG_URL: 'https://data.udir.no/kl06/opplaeringsfag.json',
  LAEREPLANER_URL: 'https://data.udir.no/kl06/laereplaner.json',
  KOMPETANSEMAAL_URL: 'https://data.udir.no/kl06/kompetansemaal.json',

  SPARQL_URL: process.env.GREP_SPARQL_URL || 'http://sandkasse-data.udir.no:7200/repositories/NavnFiksing',
  PROGFAG_QUERY: process.env.GREP_PROGFAG_QUERY || `
    prefix u: <http://psi.udir.no/ontologi/kl06/>
    prefix d: <http://psi.udir.no/kl06/>
    prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

    SELECT DISTINCT ?up_kode ?po_kode ?lp_kode ?trinn ?kompetansemaalsett ?km_kode ?km_tittel WHERE {
      ?up rdf:type ?utdanningsprogram ;
          u:kode ?up_kode ;
          u:status ?up_status .

      ?of rdf:type u:opplaeringsfag;
          u:tilhoerende-kompetansemaalsett ?kms ;
          u:for-aarstrinn ?tr ;
          u:programomraader-referanse ?po ;
          u:laereplan-referanse ?lp.

      ?tr u:kode ?trinn ;
          u:rekkefoelge ?rekkefoelge .

      ?lp u:status ?lp_status ;
          u:kode ?lp_kode ;
          u:fagtype ?fagtype .

      ?kms u:tittel ?kompetansemaalsett ;
          u:kompetansemaal ?km .

      ?km u:tittel ?km_tittel;
          u:kode ?km_kode .

      ?po rdf:type u:programomraade ;
          u:kode ?po_kode ;
          u:utdanningsprogram-referanse ?up ;
          u:status ?po_status ;
          u:programomraade-type d:programomraadetype_skole .
          
      FILTER regex(str(?fagtype), "programfag", "i")
      FILTER (lang(?km_tittel) = "default")
      FILTER (lang(?kompetansemaalsett) = "default")    
      FILTER regex(str(?up_status), "publisert", "i")
      FILTER regex(str(?po_status), "publisert", "i")  
      FILTER regex(str(?lp_status), "publisert", "i") 
    } ORDER BY ?up ?po ?rekkefoelge ?lp_kode 
  `
}
