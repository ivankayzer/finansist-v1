const ReportFactory = require('../../Reports/ReportFactory');

class ReportController {
  async dates({ request, auth }) {
    const Database = use('Database');
    const min = await Database.from('transactions').min('paid_at');
    const max = await Database.from('transactions').max('paid_at');

    return {
      min: Object.values(min[0])[0],
      max: Object.values(max[0])[0],
    };
  }

  async generate({ request, auth }) {
    const { type, startDate, endDate } = request.all();
    const user = await auth.getUser();
    const report = ReportFactory.make(user.transactions(), type, {
      startDate,
      endDate,
    });

    return await report.generate();
  }
}

module.exports = ReportController;
