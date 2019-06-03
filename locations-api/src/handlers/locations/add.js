// file: src/handlers/locations/add.js

require('dotenv/config')

const { LocationRepository } = require('../../repositories/location.repository') 
const { parseWith } = require('../../utils/request.util')
const { withStatusCode } = require('../../utils/response.util')
const { DocClientWithEnvVar } = require('../../dynamodb.factory')
const uuidv1 = require('uuid/v1')

const docClient = DocClientWithEnvVar(process.env)
const repository = new LocationRepository(docClient)
const created = withStatusCode(204)
const parseJson = parseWith(JSON.parse)

exports.handler =  async (event) => {

  console.log(event)
  const { body } = event
  const location = parseJson(body)
  location = Object.assign({}, location, {
    "id" : uuidv1()
  })
  await repository.put(location)
  return created()
}
