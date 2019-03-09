/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route');

Route.post('/login', 'UserController.login');
Route.post('/register', 'UserController.register');
Route.post('/getUser', 'UserController.getUser');

Route.get('/categories', 'CategoryController.all');
Route.post('/categories/add', 'CategoryController.add');
Route.delete('/categories/:id', 'CategoryController.delete');

Route.post('/imports/import', 'ImportController.import');
Route.post('/imports/transactions', 'ImportController.importTransactions');

Route.get('/transactions/all', 'TransactionController.all');
Route.get('/transactions/unformatted', 'TransactionController.getUnformatted');
Route.get('/transactions/incomes', 'TransactionController.getIncomes');
Route.patch('/transactions/:id', 'TransactionController.update');
Route.get('/transactions/format', 'TransactionController.format');
Route.post('/transactions/filter', 'TransactionController.filter');
Route.post('/transactions/filter-by-day', 'TransactionController.filterByDay');
Route.get('/transactions/reset', 'TransactionController.reset');
Route.post('/transactions/add', 'TransactionController.add');

Route.get('/actions/all', 'ActionController.all');
Route.patch('/actions/:id', 'ActionController.update');
Route.delete('/actions/:id', 'ActionController.delete');
Route.post('/actions', 'ActionController.add');

Route.get('/budgets/all', 'BudgetController.all');
Route.post('/budgets', 'BudgetController.add');
Route.delete('/budgets/:id', 'BudgetController.delete');

Route.get('/reports/dates', 'ReportController.dates');
Route.post('/reports/generate', 'ReportController.generate');

Route.any('*', 'NuxtController.render');
