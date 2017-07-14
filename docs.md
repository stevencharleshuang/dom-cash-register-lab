## Functions

<dl>
<dt><a href="#addRow">addRow(content)</a> ⇒ <code>HTMLTableRowElement</code></dt>
<dd><p>creates a table row and cell, and injects content into the cell</p>
</dd>
<dt><a href="#removeDecimal">removeDecimal(str)</a> ⇒ <code>Number</code></dt>
<dd><p>parses a string and converts it to a whole number (decimal removed)</p>
</dd>
<dt><a href="#dollarFormat">dollarFormat(num)</a> ⇒ <code>string</code></dt>
<dd><p>takes an integer and formats a string in dollar format</p>
</dd>
<dt><a href="#handleFormSubmit">handleFormSubmit(event)</a> ⇒ <code>undefined</code></dt>
<dd><p>get the value of the entry field</p>
</dd>
</dl>

## Events

<dl>
<dt><a href="#event_submit">"submit"</a></dt>
<dd><p>Submit event.</p>
</dd>
</dl>

<a name="addRow"></a>

## addRow(content) ⇒ <code>HTMLTableRowElement</code>
creates a table row and cell, and injects content into the cell

**Kind**: global function  
**Returns**: <code>HTMLTableRowElement</code> - a reference to the new row created  
**See**: https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement/insertRow  

| Param | Type |
| --- | --- |
| content | <code>String</code> | 

<a name="removeDecimal"></a>

## removeDecimal(str) ⇒ <code>Number</code>
parses a string and converts it to a whole number (decimal removed)

**Kind**: global function  
**Returns**: <code>Number</code> - the incoming number multiplied by 100  

| Param | Type |
| --- | --- |
| str | <code>String</code> | 

<a name="dollarFormat"></a>

## dollarFormat(num) ⇒ <code>string</code>
takes an integer and formats a string in dollar format

**Kind**: global function  
**Returns**: <code>string</code> - 0000 -> '$00.00'  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>numeric</code> | - |

<a name="handleFormSubmit"></a>

## handleFormSubmit(event) ⇒ <code>undefined</code>
get the value of the entry field

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>submit</code> | the 'submit' event that was triggered when the form was submitted |

<a name="event_submit"></a>

## "submit"
Submit event.

**Kind**: event emitted  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | the type of event |

