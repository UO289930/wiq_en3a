const data = require('../Models/Question-Model.json');

class QueryGenerator {
    static getQuestionsAndQuery(topic, limit = 10) {
        const items = data.array.filter(item => item.topic == topic);
        let query = '';
        let list = [];
        
        // Itererate trough the items and generate a query for each one
        for (let item of items) {
            if (item.hasOwnProperty('year')) {
                // If the item has a year property, generate a query with the date parsed
                query = this.generateSparqlQueryYear(item.themeId, item.attributeId, 5);
            } else {
                query = this.generateSparqlQuery(item.themeId, item.attributeId, 5);
            }

            let obj = {
                query: query,
                questionText: item.question,
            };
            list.push(obj);
        }

        return list;
    }

    // Geography
    static getCountryCapitalsQuery(limit = 10) {
        return this.generateSparqlQuery("Q6256", "P36", limit);
    }

    // Entertainment / Art
    static getMovieDirectorQuery(limit = 10) {
        return this.generateSparqlQuery("Q11424", "P57", limit);
    }

    // Chemistry
    static getElementSymbolQuery(limit = 10) {
        return this.generateSparqlQuery("Q11344", "P246", limit);
    }

    static generateSparqlQuery(themeId, attributeId, limit) {
        return `
            SELECT ?themeLabel ?attributeLabel ?entityUrl WHERE {
                ?theme wdt:P31 wd:${themeId};
                    wdt:${attributeId} ?attribute.
                BIND(IRI(CONCAT("https://www.wikidata.org/entity/", STRAFTER(STR(?attribute), "http://www.wikidata.org/entity/"))) AS ?entityUrl)
                SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
            }
            LIMIT ${limit}
        `;
    }

    static generateSparqlQueryYear(themeId, attributeId, limit) {
        return `
            SELECT ?themeLabel (YEAR(?date) as ?attributeLabel) ?entityUrl WHERE {
                ?theme wdt:P31 wd:${themeId};
                    wdt:${attributeId} ?date.
                BIND(IRI(CONCAT("https://www.wikidata.org/entity/", STRAFTER(STR(?theme), "http://www.wikidata.org/entity/"))) AS ?entityUrl)
                SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
                FILTER(YEAR(?date) >= 1)
            }
            LIMIT ${limit}
        `;
    }
}

module.exports = QueryGenerator;