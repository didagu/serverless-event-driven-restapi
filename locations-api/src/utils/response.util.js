// file: src/utils/response.util.js

const withStatusCode = (statusCode, formatter = null) => {
  if (statusCode < 100 || statusCode > 599) {
    throw new Error('status code is invalid')
  }

  const hasFormatter = typeof formatter === 'function'
  const format = hasFormatter ? formatter : _ => _

  return (data = null) => {
    const response = {
      statusCode: statusCode
    }

    if (data) {
      response.body = format(data)
    }

    return response
  }
}

module.exports = {
  withStatusCode
}
