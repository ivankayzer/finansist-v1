'use strict'
const Papa = require('papaparse')
const fs = require('fs');
const path = require('path');

class ImportController {
  async import({ request, auth }) {
    const csv = request.file('csv')
    const Helpers = use('Helpers')
    const removeFile = Helpers.promisify(fs.unlink)

    await csv.move(Helpers.tmpPath('uploads'), {
      name: csv.clientName,
      overwrite: true
    })

    if (!csv.moved()) {
      return csv.error()
    }

    const file = fs.readFileSync(path.join(csv._location, csv._fileName), 'utf8');

    const output = await Papa.parse(file);

    removeFile(path.join(csv._location, csv._fileName))

    return output;
  }
}

module.exports = ImportController
