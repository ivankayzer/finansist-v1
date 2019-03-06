class Report {
  constructor(transactions, start, end) {
    this._start = start;
    this._end = end;
    this._transactions = transactions;
  }

  generate() {
    return [];
  }
}

module.exports = Report;
