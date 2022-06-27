
const response = (res, status, msg, data, pagination) => {
    /*
    * module view format response data
    */
    let result = {}
    result.status = status || 200
    result.msg = msg
    result.data = data
    result.pagination = pagination

    return res.status(result.status).json(result)
}

module.exports = response
