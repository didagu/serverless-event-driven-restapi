// file: src/handlers/locations/get.js

require('dotenv/config')

const { LocationRepository } = require('../../repositories/location.repository')
const { withStatusCode } = require('../../utils/response.util')
const { DocClientWithEnvVar } = require('../../dynamodb.factory')

const docClient = DocClientWithEnvVar(process.env)
const repository = new LocationRepository(docClient)
const ok = withStatusCode(200, JSON.stringify)
const notFound = withStatusCode(404)

exports.handler = async (event) => {
  const { id } = event.pathParameters
  const location = await repository.get(id)

  if (!location) {
    return notFound()
  }

  return ok(location)
}
