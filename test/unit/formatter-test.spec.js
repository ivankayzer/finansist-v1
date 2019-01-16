'use strict'

const Formatter = require('../../app/Services/Formatter')

const { test } = use('Test/Suite')('Formatter Test')
const {
  transaction,
  formattedTransaction,
  ignoredTransaction,
  cropperAction,
  assignAction,
  ignoreAction,
  transactionToCrop,
  transactionToIgnore,
  transactionToAssign
} = require('../fakes/formatter')

test('it has an original title', async ({ assert }) => {
  let formatter = new Formatter(transaction)

  assert.isString(formatter._transaction.original_title)
})

test('transaction with formatted title is not eligible for format', async ({ assert }) => {
  let formatter = new Formatter(formattedTransaction)

  assert.isFalse(formatter.isElegibleForFormat())
})

test('ignored transaction is not eligible for format', async ({ assert }) => {
  let formatter = new Formatter(ignoredTransaction)

  assert.isFalse(formatter.isElegibleForFormat())
})

test('transaction with empty formatted title and not ignored is eligible for format', async ({ assert }) => {
  let formatter = new Formatter(transaction)

  assert.isTrue(formatter.isElegibleForFormat())
})

test('fake transaction save is callable', async ({ assert }) => {
  assert.equal(transaction.save(), 'did nothing')
})

test('transaction will not be formatted if title does not satisfy match condition', async ({ assert }) => {
  let formatter = new Formatter(transaction, [cropperAction, assignAction, ignoreAction])
  let formattedTransaction = formatter.apply()

  assert.equal(transaction, formattedTransaction)
})

test('title can be formatted by cropper', async ({ assert }) => {
  let formatter = new Formatter(transactionToCrop, [cropperAction])
  let formattedTransaction = formatter.apply()

  assert.equal(formattedTransaction.formatted_title, 'This is original title.')
})

test('title can be formatted by ignorer', async ({ assert }) => {
  let formatter = new Formatter(transactionToIgnore, [ignoreAction])
  let formattedTransaction = formatter.apply()

  assert.isTrue(formattedTransaction.is_ignored)
})

test('title can be formatted by assigner', async ({ assert }) => {
  let formatter = new Formatter(transactionToAssign, [assignAction])
  let formattedTransaction = formatter.apply()

  assert.equal(formattedTransaction.category_id, 7)
})
