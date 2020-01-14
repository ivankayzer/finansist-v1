class Santander {
  constructor(model, transaction, columns) {
    this._model = model;
    this._transactions = transaction;
    this._columns = columns;
  }

  fillModel() {
    for (const key in this._columns) {
      if (this._columns[key] === "paid_at") {
        let [day, month, year] = this._transactions[key].split("-");
        this._model[this._columns[key]] = `${year}-${month}-${day}`;
      } else {
        this._model[this._columns[key]] = this._transactions[key];
      }
    }

    return this._model;
  }
}

module.exports = Santander;
