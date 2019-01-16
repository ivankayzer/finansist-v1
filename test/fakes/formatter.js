module.exports = {
  transaction: {
    original_title: 'This is original title',
    formatted_title: null,
    is_ignored: false,
    save: () => 'did nothing'
  },
  formattedTransaction: {
    original_title: 'This is original title',
    formatted_title: 'This is formatted title',
    is_ignored: false
  },
  ignoredTransaction: {
    original_title: 'This is original title',
    formatted_title: null,
    is_ignored: true
  },
  transactionToCrop: {
    original_title: 'This is original title. This text should be cropped.',
    formatted_title: null,
    is_ignored: false,
    category_id: null,
    save: () => 'did nothing'
  },
  transactionToIgnore: {
    original_title: 'This is original title. This transaction should be ignored.',
    formatted_title: null,
    is_ignored: false,
    category_id: null,
    save: () => 'did nothing'
  },
  transactionToAssign: {
    original_title: 'This is original title. I bought a food. This transaction should be assigned to a category',
    formatted_title: null,
    is_ignored: false,
    category_id: null,
    save: () => 'did nothing'
  },
  cropperAction: {
    action: 'crop',
    match: ' This text should be cropped.',
    additional_data: null
  },
  ignoreAction: {
    action: 'ignore',
    match: 'should be ignored',
    additional_data: null
  },
  assignAction: {
    action: 'assign',
    match: 'should be assigned',
    additional_data: {
      category_id: 7
    }
  }
}
