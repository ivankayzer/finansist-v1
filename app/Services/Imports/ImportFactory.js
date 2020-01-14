const Revolut = require("./Revolut");
const Santander = require("./Santander");

class ImportFactory {
  static make(filename, model, transaction, columns) {
    if (filename.startsWith("Revolut")) {
      return new Revolut(model, transaction);
    }

    return new Santander(model, transaction, columns);
  }
}

module.exports = ImportFactory;
