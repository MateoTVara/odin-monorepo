/**
 * Updates the quantity of an item in an iterable based on the specified operation.
 * @param {number} i - The index of the item to update.
 * @param {Array} iterable - The array of items.
 * @param {{op: ('+'|'-')}} options - The options object. 'op' must be '+' or '-'.
 * @returns {Array} - The updated array with the modified quantity.
 */
const updateQty = (i, iterable, {op = '+'}) => {
  if (op !== '+' && op !== '-') throw new Error('Invalid operation: op must be "+" or "-"')

  return iterable.map((item, idx) => 
    idx === i ?
      (item.quantity <= 1 && op === '-') ?
        item : {...item, quantity: item.quantity + (op === '+' ? 1 : -1)} :
      item
  )
}

export { updateQty }