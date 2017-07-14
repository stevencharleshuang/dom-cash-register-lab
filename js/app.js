/* eslint-env browser */

'use strict';

// Let's get a reference to all our DOM elements
// and store them in an object
// @hint: use document.querySelector()
let total = 0;
const $els = {
  total:      null,
  entries:    null,
  entryForm:  null,
  inputField: null,
};


// helper functions

/**
 * @func addRow
 * @desc creates a table row and cell, and injects content into the cell
 * @param {String} content
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement/insertRow
 * @return {HTMLTableRowElement} a reference to the new row created
 */
const addRow = function (content) {
};

/**
 * @func removeDecimal
 * @desc parses a string and converts it to a whole number (decimal removed)
 * @param {String} str
 * @returns {Number} the incoming number multiplied by 100
 */
const removeDecimal = function (str) {
};

/**
 * @func dollarFormat
 * @desc takes an integer and formats a string in dollar format
 * @param {numeric} num -
 * @returns {string} 0000 -> '$00.00'
 */
const dollarFormat = function (num) {
};

/**
 * @func handleFormSubmit
 * @desc get the value of the entry field
 * @param {submit} event - the 'submit' event that was triggered when the form was submitted
 * @returns {undefined}
 */
const handleFormSubmit = function (event) {
  // stop the event from happening
  event.preventDefault();

  // note: remember that form fields ALWAYS contain text



  // add a row with the data
  // our design dictates that this row should have two cells
  // let's insert the new empty cell BEFORE the existing one



  // update the total price
  // and
  // update the display total



  // reset the form to clear out anything previously typed

};



// event handlers
/**
 * Listen for submit events from the form
 */

$els.entryForm.addEventListener('submit', handleFormSubmit);

