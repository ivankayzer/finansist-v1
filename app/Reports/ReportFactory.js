const ReportByCategory = require('./ReportByCategory');
const ReportByDays = require('./ReportByDays');

class ReportFactory {
  static make(relation, type, data) {
    if (type === 'by_category') {
      return new ReportByCategory(relation, data.startDate, data.endDate);
    }

    if (type === 'by_days') {
      return new ReportByDays(relation, data.startDate, data.endDate);
    }
  }
}

module.exports = ReportFactory;
