// file: src/utils/request.util.js

const parseWith = parser => text => {
  if (!parser) {
    throw new Error('no parser defined')
  }

  if (!text) {
    throw new Error('no text defined')
  }

  return parser(text)
}

module.exports = {
  parseWith
}
