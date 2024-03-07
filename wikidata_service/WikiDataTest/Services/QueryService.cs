namespace WikiDataTest.Services
{
    public class QueryService
    {
        public string GetCapitalsQuery()
        {
            return "SELECT ?capitalLabel ?countryLabel WHERE {  ?capital wdt:P1376 ?country.  ?capital wdt:P31 wd:Q5119. ?country wdt:P31 wd:Q3624078.  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],en\". }} LIMIT 400";
        }
    }
}
