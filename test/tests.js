/* eslint-env mocha, browser */
/* eslint-disable no-unused-expressions */
/**
 * @file JS Cash Register tests
 * @run this file with `npm t`
 * @desc this test uses JSDOM to simulate a DOM,
 * and SINON to spy on function calls. In addition, it uses node's VM
 * feature that allows scripts to be executed in another context
 * (i.e. as if they were written directly into the JSDOM vDOM env,
 * not here in Node)
 */
const fs              = require('fs');
const path            = require('path');
const jsdom           = require('jsdom');
const sinon           = require('sinon');
const cashRegisterApp = require('../js/app');
const { expect }      = require('chai');
const { Script }      = require('vm');


let $testEls;
let document;
let app;

const { JSDOM } = jsdom;
const html      = fs.readFileSync(path.join(__dirname, '/../index.html'), 'utf-8');

/**
 * @func initDocument
 * @desc create a new
 */
const initDocument = options => new JSDOM(html, options);


/**
 * @func getTestEls
 * @desc in order to properly test DOM manipulation and
 * ability to target elements, we'll grab the ones we need in this env,
 * and compare it to the functions under test.
 * @returns {object} a container of DOM elements
 */
const getTestEls = () => ({
  total:      document.querySelector('#total'),
  entries:    document.querySelector('#entries'),
  entryForm:  document.querySelector('#entry'),
  inputField: document.querySelector('#entry').children[0],
});

/**
 * @func setUp
 * @desc used before each of the tests to set up the environment
 */
const setUp = () => {
  document = initDocument({}).window.document;
  $testEls = getTestEls();
  app = cashRegisterApp.init($testEls);
};

describe('CashRegisterApplication', () => {
// 1. TEST INIT
  describe('__meta__ test init', () => {
    beforeEach(setUp);

    it('should grab all html elements from the vDom', () => {
      // ARRANGE

      // ACT
      // console.log($testEls);
      // ASSERT
      expect($testEls).to.be.an('object');
    });

    it('should create a document scope', () => {
      // ASSERT
      expect(document).to.exist;
    });
  });

// 2. APP INIT
  describe('#init()', () => {
    beforeEach(setUp);

  // CHECK FOR THE INTERNAL FUNCTIONS
    it('should return all the functions when called', () => {
      // ARRANGE
      const expected = ['addRow', 'handleFormSubmit'];

      // ACT
      const actual = cashRegisterApp.init($testEls);
      // ASSERT
      expect(actual).to.have.keys(...expected);
    });

  // CHECK FOR SUBMIT HANDLER
    it('should set a "submit" handler on the form', () => {
      // ARRANGE
      const eventListener = sinon.spy($testEls.entryForm, 'addEventListener');

      // ACT
      const actualFns = cashRegisterApp.init($testEls);

      // ASSERT
      expect(eventListener.callCount).to.eql(1);
      expect(eventListener.calledWithExactly('submit', actualFns.handleFormSubmit)).to.be.true;
    });
  });
// 3. ADD ROW
  describe('#addRow()', () => {
    beforeEach(setUp);

    it('should create a new row in our table; returning the row', () => {
      // ARRANGE
      const expected = 1;

      // ACT
      const $row = app.addRow();
      const actual = $testEls.entries.rows.length;

      // ASSERT

      // have we created only one row?
      expect(actual).to.eql(expected);

      // did we attach the right kind of element?
      expect($row).to.be.a('HTMLTableRowElement');

      // is the row exactly the dom element we're expecting?
      expect($row).to.equal($testEls.entries.rows[0]);
    });

    it('should create a td inside of the tr', () => {
      // ARRANGE
      const expected = '<td>dummy</td>';

      // ACT
      const { firstChild: actual } = app.addRow('dummy');
      // const actual = $row.firstChild.textContent;

      // ASSERT
      expect(actual.outerHTML).to.deep.eql(expected);
    });

    it('should set content in the td', () => {
      // ARRANGE
      const expected = 'dummy';

      // ACT
      const { firstChild: { textContent: actual } } = app.addRow('dummy');

      // ASSERT
      expect(actual).to.eql(expected);
    });

    it('should create the new row below others', () => {
      // ARRANGE
      const expected = 2;

      // ACT
      // first row
      app.addRow();
      // second row
      const $row2 = app.addRow('dummy');
      const actual = $testEls.entries.rows.length;

      // ASSERT

      // have we created two rows?
      expect(actual).to.eql(expected);

      // did we attach the right kind of element?
      expect($row2).to.be.a('HTMLTableRowElement');

      // is the bottom row exactly the dom element we're expecting?
      expect($row2).to.equal($testEls.entries.rows[1]);
    });

  });
// 4. getEls
  describe('#getEls()', () => {
    it('should grab the right HTML nodes', () => {
      // ARRANGE
      /**
       * @note: running app.js in the actual browser will expose it
       * to 'document', which is in lexical scope.
       * since we're running the script and the DOM separately,
       * 'document' isn't in lexical scope and we don't have that luxury
       * So, to make the script exec in the context of the vDOM,
       * we'll read the file in as text, and feed it into the VM, thus
       * faking its declaration in lexical scope of the DOM
       */
      const dom = initDocument({ runScripts: 'outside-only' });

      const scriptText = fs.readFileSync(path.join(__dirname, '/../js/app.js'), 'utf-8');
      const s = new Script(scriptText);
      dom.runVMScript(s);

      const expected = {
        total:      dom.window.document.querySelector('#total'),
        entries:    dom.window.document.querySelector('#entries'),
        entryForm:  dom.window.document.querySelector('#entry'),
        inputField: dom.window.document.querySelector('#entry').children[0],
      };
      // ACT
      const actual = dom.window.getEls();

      // ASSERT
      expect(actual).to.deep.equal(expected);
    });
  });

// 4. removeDecimal
  describe('#removeDecimal()', () => {
    let removeDecimal;
    before(() => {
      removeDecimal = cashRegisterApp.removeDecimal;
    });
    beforeEach(setUp);
    it('should take a string, return an Integer', () => {
      // ARRANGE
      const input = '0234.4';
      const expected = 23440;

      // ACT
      const actual = removeDecimal(input);

      // ASSERT
      expect(actual).to.eql(expected);
    });

    it('should take a weird string, return an Integer', () => {
      // ARRANGE
      const input = '0000.02344.00';
      const expected = 2;

      // ACT
      const actual = removeDecimal(input);

      // ASSERT
      expect(actual).to.eql(expected);
    });

    it('should take a non-number, return NaN', () => {
      // ARRANGE
      const input = 'abcde';

      // ACT
      const actual = removeDecimal(input);

      // ASSERT
      expect(actual).to.be.NaN;
    });
  });

// 5. dollarFormat
  describe('#dollarFormat()', () => {
    let dollarFormat;
    before(() => {
      dollarFormat = cashRegisterApp.dollarFormat;
    });
    beforeEach(setUp);

    it('should take a string, return an Integer', () => {
      // ARRANGE
      const input = '0234.4';
      const expected = '$2.34';

      // ACT
      const actual = dollarFormat(input);

      // ASSERT
      expect(actual).to.eql(expected);
    });

    it('should take an odd string, return an Integer', () => {
      // ARRANGE
      const input = '0233.4';
      const expected = '$2.33';

      // ACT
      const actual = dollarFormat(input);

      // ASSERT
      expect(actual).to.eql(expected);
    });
  });

// 6. handleFormSubmit
  describe('#handleFormSubmit()', () => {
    let event;
    beforeEach(() => {
      setUp();
      event = {
        preventDefault: sinon.spy(),
      };
    });

    it('should prevent the default action and reset the form', () => {
      // ARRANGE

      $testEls.entryForm.reset = sinon.spy();

      // ACT

      app.handleFormSubmit(event);

      // ASSERT
      expect($testEls.entryForm.reset.callCount).to.eql(1);
      expect(event.preventDefault.callCount).to.eql(1);
      // console.log($testEls.entryForm)
    });

    it('should create a new row with two cells, using dollarFormat', () => {
      // ARRANGE
      $testEls.inputField.value = '0450';

      const expected = '<tr><td></td><td>$450.00</td></tr>';
      const $row = $testEls.entries.children;

      // ACT
      app.handleFormSubmit(event);
      const actual = $row[0].outerHTML;

      // ASSERT
      expect($row).to.have.lengthOf(1);
      expect(actual).to.eql(expected);
    });

    it('should update the total field', () => {
      // ARRANGE
      $testEls.inputField.value = '68790r';

      const expected = '<tr><th>Total</th><th id="total">$68790.00</th></tr>';
      const $footer = document.querySelector('tfoot');

      // ACT
      app.handleFormSubmit(event);
      // our nodes might come back with errant whitespace
      const actual = $footer.rows[0].outerHTML.replace(/\n\s*/g, '');

      // ASSERT
      expect(actual).to.eql(expected);
    });

    it('should reset the form after update', () => {
      // ARRANGE
      $testEls.inputField.value = 'NHJIU';
      const expected = '';

      // ACT
      app.handleFormSubmit(event);
      const actual = $testEls.inputField.value;

      // ASSERT
      expect(actual).to.eql(expected);
    });
  });
});
