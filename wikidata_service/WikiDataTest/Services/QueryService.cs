namespace WikiDataTest.Services
{
    public class QueryService
    {
        public string GetCapitalsQuery()
        {
            return "SELECT ?capitalLabel ?countryLabel WHERE {  ?capital wdt:P1376 ?country.  ?capital wdt:P31 wd:Q5119. ?country wdt:P31 wd:Q3624078.  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],en\". }} LIMIT 400";
        }

        public string GetMovieDirectorQuery(){
            return GenerateSparqlQuery("Q11424", "P57");
        }

        public string GetElementSymbolQuery(){
            return GenerateSparqlQuery("Q11344", "P246");
        }

        private string GenerateSparqlQuery(string themeId, string attributeId, int limit = 10)
        {
            return $@"
                SELECT ?themeLabel ?attributeLabel WHERE {{
                    ?theme wdt:P31 wd:{themeId};
                        wdt:{attributeId} ?attribute.
                    SERVICE wikibase:label {{ bd:serviceParam wikibase:language ""[AUTO_LANGUAGE],en"". }}
                }}
                LIMIT {limit}
            ";
        }
    }
}
