class QueryGenerator {
    static getCountryCapitalsQuery(limit = 10) {
        return this.generateSparqlQuery("Q6256", "P36", limit);
    }

    static getMovieDirectorQuery(limit = 10) {
        return this.generateSparqlQuery("Q11424", "P57", limit);
    }

    static getElementSymbolQuery(limit = 10) {
        return this.generateSparqlQuery("Q11344", "P246", limit);
    }

    static generateSparqlQuery(themeId, attributeId, limit) {
        return `
            SELECT ?themeLabel ?attributeLabel WHERE {
                ?theme wdt:P31 wd:${themeId};
                    wdt:${attributeId} ?attribute.
                SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
            }
            LIMIT ${limit}
        `;
    }
}

module.exports = QueryGenerator;