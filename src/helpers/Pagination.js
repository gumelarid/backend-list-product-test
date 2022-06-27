const qs = require('querystring')
module.exports = {
    getPrevLink: (page, currentQuery) => {
        if (page > 1) {
            const generatePage = { page: page - 1 }
            const resultNextLink = { ...currentQuery, ...generatePage }
            return qs.stringify(resultNextLink)
        } else {
            return null
        }
    },
    getNextLink: (page, totalPage, currentQuery) => {
        if (page < totalPage) {
            const generatePage = { page: page + 1 }
            const resultPrevLink = { ...currentQuery, ...generatePage }
            return qs.stringify(resultPrevLink)
        } else {
            return null
        }
    }
}