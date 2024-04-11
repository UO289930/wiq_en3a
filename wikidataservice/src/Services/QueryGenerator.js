const data = require('../Models/Question-Model.json');

class QueryGenerator {
    static getQuestionsAndQuery(topic, limit = 10) {
        const items = data.array.filter(item => item.topic == topic);
        const randomIndex = Math.floor(Math.random() * items.length);
        let itemData = items[randomIndex];
        let query = '';

        // If the item has a year property, generate a query with the date parsed
        if ('year' in itemData) {
            query = this.generateSparqlQuery(itemData.themeId, itemData.attributeId, limit);
            // query = this.generateSparqlQueryYear(itemData.themeId, itemData.attributeId, limit);
        } else {
            query = this.generateSparqlQuery(itemData.themeId, itemData.attributeId, limit);
        }

        return {
            query: query,
            questionText: itemData.question
        };
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

    static getChemicalCompoundAndFormulaQuery(limit = 10) {
        return this.generateSparqlQuery("Q11173", "P274", limit);
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
            SELECT ?themeLabel (YEAR(?date) as ?year) ?entityUrl WHERE {
                ?theme wdt:P31 wd:${themeId};
                    wdt:${attributeId} ?date.
                BIND(IRI(CONCAT("https://www.wikidata.org/entity/", STRAFTER(STR(?theme), "http://www.wikidata.org/entity/"))) AS ?entityUrl)
                SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
            }
            LIMIT ${limit}
        `;
    }
}

module.exports = QueryGenerator;