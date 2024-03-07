namespace WikiDataTest.Services
{
    public class QueryService
    {
        public string GetCapitalsQuery()
        {
            return "SELECT ?capitalLabel ?countryLabel WHERE {  ?capital wdt:P1376 ?country.  ?capital wdt:P31 wd:Q5119. ?country wdt:P31 wd:Q3624078.  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],en\". }} LIMIT 400";
        }

        public string GetElementSymbolsQuery(){
            return "SELECT DISTINCT ?elementLabel ?symbol WHERE { ?element wdt:P31 wd:Q11344; wdt:P246 ?symbol. SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],en\". } } ORDER BY RAND() LIMIT 100";
        }

        public string GetMovieDirectorQuery(){
            return GetQuery("movie", "director", "P57", "P31");
        }

        public string GetElementSymbolQuery(){
            return GetQuery("element", "symbol", "P31", "P246");
        }

        private string GetQuery(string subjectLabel, string objectLabel, string subjectProperty, string objectProperty)
        {
            return $"SELECT DISTINCT ?{subjectLabel}Label ?{objectLabel}Label WHERE {{ ?{subjectLabel} wdt:{subjectProperty} ?{objectLabel}; wdt:{objectProperty} ?{objectLabel}. SERVICE wikibase:label {{ bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],en\". }} }} ORDER BY RAND() LIMIT 100";
        }
    }
}
