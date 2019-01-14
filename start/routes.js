'use strict'

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

const Route = use('Route')

Route.post('/login', 'UserController.login')
Route.post('/register', 'UserController.register')
Route.post('/getUser', 'UserController.getUser')

Route.get('/categories', 'CategoryController.all')
Route.post('/categories/add', 'CategoryController.add')
Route.delete('/categories/:id', 'CategoryController.delete')

Route.post('/imports/import', 'ImportController.import')
Route.post('/imports/transactions', 'ImportController.importTransactions')

Route.get('/transactions/all', 'TransactionController.all')

Route.any('*', 'NuxtController.render')
