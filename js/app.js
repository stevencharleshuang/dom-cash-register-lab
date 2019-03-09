/* eslint-env browser, node */

'use strict';

/**
 * @func removeDecimal
 * @desc parses a string and converts it to a whole number (decimal removed)
 * @param {String} str
 * @returns {Number} the incoming number multiplied by 100
 * @hint you'll have to round the results before returing it because of possible JS rounding errors
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat
 * @see https://stackoverflow.com/questions/15118629/math-round-rounding-error
 */
function removeDecimal(str) {
  // TODO: [1] write the body of this function (described above)
  return Math.round(parseFloat(str) * 100) * 100/100;
}

/**
 * @func dollarFormat
 * @desc takes an integer and formats a string in dollar format
 * @param {numeric} num
 * @returns {string} 0000 -> '$00.00'
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
 */
function dollarFormat(num) {
  // TODO: [2] write the body of this function (described above)
  let numString = parseFloat(num / 100).toFixed(2);
  return `$${numString}`;
}

/**
 * @func getEls
 * @returns {object} an object that contains pointers to all the DOM elements we'll need later on
 * @hint we'll query and store these DOM elements once, so our code isn't cluttered elsewhere.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
 */
function getEls() {
  // TODO: [3] replace these nulls with actual document queries.
  return {
    total:      document.querySelector('#total'),
    entries:    document.querySelector('#entries'),
    entryForm:  document.querySelector('#entry'),
    inputField: document.querySelector('input'),
  };
}

/**
 * @name CashRegisterApplication
 * @author Jason Seminara <js@ga.co>
 * @desc let's wrap the entire program in a function
 * so we can create private variables and not pollute the global scope
 */
function cashRegisterApplication($els) {
  // this stores the total
  // TODO: [4] at what value should we start?
  let total = 0;

  /**
   * @func addRow
   * @desc creates a table row and cell, and injects content into the cell
   * @param {String} content
   * @return {HTMLTableRowElement} a reference to the new row created
   * @hint: this has to stay inside cashRegisterApplication because it needs access to $els
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableRowElement
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableRowElement/insertCell
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement/insertRow
   */
  const addRow = function (content, blank) {
    // TODO: [5] write the body of this function (described above)
    let tableRef = $els.entries;
    let row = tableRef.insertRow();
    if (!!blank) {
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      cell1.innerHTML = '';
      cell2.innerHTML = content;
    } else {
      let cell = row.insertCell(0);
      cell.innerHTML = content;
    }

    return row;
  };


  /**
   * @func handleFormSubmit
   * @desc get the value of the entry field, do the calculation; update the total
   * @param {submit} event - the 'submit' event that was triggered when the form was submitted
   * @listens submit
   * @returns {undefined}
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset
   */
  const handleFormSubmit = function (event) {
    // TODO: [6] stop the form from submitting and reloading the window
    event.preventDefault();

    // TODO: [7] get the value from the entry field, clean it up
    // note: remember that form fields ALWAYS contain text
    let cleanEntry = removeDecimal($els.inputField.value);    


    // TODO: [8] make a variable that's in dollar format
    let dollForm = dollarFormat(cleanEntry);

    // TODO: [9] add a row with the data
    // note: our design dictates that this row should have two cells (description, and price)
    // let's insert the new empty cell BEFORE the existing one
    addRow(dollForm, 'description');

    // TODO: [10] update the total price
    // TODO: [11] update the display total in dollarFormat
    total += cleanEntry;
    let dollTotal = dollarFormat(total);
    $els.total.innerHTML = `${dollTotal}`;

    // TODO: [12] reset the form to clear out anything previously typed
    $els.entryForm.reset();
  };


  /**
   * Listen for submit events from the form
   * @fires submit
   */
  // event handlers
  $els.entryForm.addEventListener('submit', handleFormSubmit);

  // return the internal functions so we can test them individually.
  return {
    addRow,
    handleFormSubmit,
  };
}

/**
 * @func onLoad
 * @desc the HTML will use this function to initialize the application
 * @returns {undefined}
 */
function onLoad() {
  cashRegisterApplication(getEls());
}

// this is here so we can test the code
if ((typeof module) !== 'undefined') {
  module.exports = {
    init: cashRegisterApplication,
    getEls,
    removeDecimal,
    dollarFormat,
    onLoad,
  };
}
