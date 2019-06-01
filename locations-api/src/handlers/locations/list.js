// file: src/handlers/locations/list.js

require('dotenv/config')

const { LocationRepository } = require('../../repositories/location.repository')
const { withStatusCode } = require('../../utils/response.util')
const { DocClientWithEnvVar } = require('../../dynamodb.factory')

const docClient = DocClientWithEnvVar(process.env)
const repository = new LocationRepository(docClient)
const ok = withStatusCode(200, JSON.stringify)

exports.handler = async (event) => {
  const locations = await repository.list()
  return ok(locations)
}
