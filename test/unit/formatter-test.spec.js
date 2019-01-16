'use strict'

const Formatter = require('../../app/Services/Formatter');

const { test } = use('Test/Suite')('Formatter Test')
const { transaction, formattedTransaction, ignoredTransaction } = require('../fakes/formatter')

test('it has an original title', async ({ assert }) => {
  let formatter = new Formatter(transaction);

  assert.isString(formatter._transaction.original_title);
})

test('transaction with formatted title is not eligible for format', async ({ assert }) => {
  let formatter = new Formatter(formattedTransaction);

  assert.isFalse(formatter.isElegibleForFormat());
})

test('ignored transaction is not eligible for format', async ({ assert }) => {
  let formatter = new Formatter(ignoredTransaction);

  assert.isFalse(formatter.isElegibleForFormat());
})

test('transaction with empty formatted title and not ignored is eligible for format', async ({ assert }) => {
  let formatter = new Formatter(transaction);

  assert.isTrue(formatter.isElegibleForFormat());
})

test('fake transaction save is callable', async ({ assert }) => {
  assert.equal(transaction.save(), 'did nothing')
})
