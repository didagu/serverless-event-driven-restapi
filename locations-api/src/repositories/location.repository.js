// file: src/repositories/location.respository.js

class LocationRepository {
  constructor (documentClient) {
    this._documentClient = documentClient
  }

  get _baseParams () {
    return {
      TableName: process.env.LOCATIONS_TABLE
    }
  }

  _createParamsObject (additionalArgs = {}) {
    return Object.assign({}, this._baseParams, additionalArgs)
  }

  async list () {
    let params = this._createParamsObject()
    const response = await this._documentClient.scan(params).promise()
    return response
  }

  async get (id) {
    let params = this._createParamsObject({ Key: { id } })
    const response = await this._documentClient.get(params).promise()
    return response
  }

  async put (location) {
    let params = this._createParamsObject({ Item: location })
    await this._documentClient.put(params).promise()
    return location
  }

  async delete (id) {
    let params = this._createParamsObject({ Key: { id } })
    await this._documentClient.delete(params).promise()
    return id
  }
}

exports.LocationRepository = LocationRepository
