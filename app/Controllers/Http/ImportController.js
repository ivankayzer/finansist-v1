const Papa = require('papaparse');
const fs = require('fs');
const path = require('path');

const Helpers = use('Helpers');
const collect = require('collect.js');

class ImportController {
  async import({ request, auth }) {
    const csv = request.file('csv');

    const filename = this.generateFileName(csv._clientName);

    await csv.move(Helpers.tmpPath('uploads'), {
      name: filename,
      overwrite: true,
    });

    if (!csv.moved()) {
      return csv.error();
    }

    const file = fs.readFileSync(
      path.join(csv._location, csv._fileName),
      'utf8'
    );

    const output = await Papa.parse(file);

    return { output, filename };
  }

  generateFileName(csv) {
    if (!csv) {
      return;
    }

    let filename = csv.split('.');

    filename = `${filename[0]}-${Math.round(new Date().getTime() / 1000)}.${
      filename[1]
    }`;

    return filename;
  }

  async importTransactions({ request, auth }) {
    const removeFile = Helpers.promisify(fs.unlink);
    const { columns, filename } = request.all();
    const output = await Papa.parse(
      fs.readFileSync(path.join(Helpers.tmpPath('uploads'), filename), 'utf8')
    );
    const Transaction = use('App/Models/Transaction');
    const user = await auth.getUser();

    let existingTransactions = await user
      .transactions()
      .select('uid')
      .fetch();
    existingTransactions = collect(existingTransactions.rows)
      .pluck('uid')
      .unique();

    output.data
      .filter(transaction => transaction.length > 1)
      .forEach(async transaction => {
        const model = new Transaction();

        for (const key in columns) {
          model[columns[key]] = transaction[key];
        }

        const uid = model.generateUid();

        if (existingTransactions.contains(uid)) {
          return;
        }

        await user.transactions().save(model);
      });

    removeFile(path.join(Helpers.tmpPath('uploads'), filename));
  }
}

module.exports = ImportController;
