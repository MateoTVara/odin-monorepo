/**
 * Select a single element from the DOM.
 * @param {string} selector 
 * @param {ParentNode} [parent=document]
 * @returns {Element | null}
 */
export const $ = (selector, parent = document) => {
  return parent.querySelector(selector);
};

/**
 * Select multiple elements from the DOM.
 * @param {string} selector 
 * @param {ParentNode} [parent=document]
 * @returns {NodeListOf<Element>}
 */
export const $$ = (selector, parent = document) => {
  return parent.querySelectorAll(selector);
};