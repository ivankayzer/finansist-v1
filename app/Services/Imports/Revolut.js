class Revolut {
  constructor(model, transaction) {
    this._model = model;
    this._transaction = transaction;
  }

  fillModel() {
    this._model["paid_at"] = new Date(`${this._transaction[0].trim()} 12:00:00`)
      .toJSON()
      .substr(0, 10);
    this._model["original_title"] = this._transaction[1].trim();

    let paidOut = this._transaction[2].trim();
    let paidIn = this._transaction[3].trim();
    this._model["amount"] = paidOut.length ? "-" + paidOut : paidIn;

    return this._model;
  }
}

module.exports = Revolut;
