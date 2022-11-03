/*
	COMP 4610 GUI I
	HW3: Creating an Interactive Dynamic Table 
	Samuel Mason
	Samuel_Mason@student.uml.edu
	10/24/2022
*/

/* 
	Object to store validation state of input values
	input values n are valid under the following conditions:

		1.	n != ""
		2.	n is an integer in the range [-50. 50]
		3. 	nmin < nmax
*/
function Validation() {
	this.cond1 = false;
	this.cond2 = false;
	this.cond3 = false;
}
/*
	Function for checking input validation
 */
function validateInput() {

	let xmin = document.getElementById('xmin').value;
	let xmax = document.getElementById('xmax').value;
	let ymin = document.getElementById('ymin').value;
	let ymax = document.getElementById('ymax').value;

	// console.log(`xmin: ${xmin}\nxmax: ${xmax}\nymin: ${ymin}\nymax: ${ymax}\n`);
	// Create and initialize array for  
	// validation states of each input
	let inputState = new Array();

	for (let i = 0; i < 4; i++) {
		let state = new Validation();
		inputState.push(state);
	}

	// innocent until proven guilty flag for invalid data break
	let valid = true;

	// check if each input value passes condition 1
	// save validity state for error message production
	if (xmin != '') {
		inputState[0].cond1 = true;
	}
	else {
		valid = false;
	}
	if (xmax != '') {
		inputState[1].cond1 = true;
	}
	else {
		valid = false;
	}
	if (ymin != '') {
		inputState[2].cond1 = true;
	}
	else {
		valid = false;
	}
	if (ymax != '') {
		inputState[3].cond1 = true;
	}
	else {
		valid = false;
	}

	// if (!valid) return displayErrorMessage(inputState);

	// cast input valus to Number type
	xmin = +document.getElementById('xmin').value;
	xmax = +document.getElementById('xmax').value;
	ymin = +document.getElementById('ymin').value;
	ymax = +document.getElementById('ymax').value;

	// check if each input value passes condition 2
	// save validity state for error message production
	if (xmin >= -50 && xmin <= 50) {
		inputState[0].cond2 = true;
	}
	else {
		valid = false;
	}
	if (xmax >= -50 && xmax <= 50) {
		inputState[1].cond2 = true;
	}
	else {
		valid = false;
	}
	if (ymin >= -50 && ymin <= 50) {
		inputState[2].cond2 = true;
	}
	else {
		valid = false;
	}
	if (ymax >= -50 && ymax <= 50) {
		inputState[3].cond2 = true;
	}
	else {
		valid = false;
	}

	// if (!valid) return displayErrorMessage(inputState);

	// check if each input value passes condition 3
	// save validity state for error message production
	if (xmin < xmax && inputState[1].cond1) {
		inputState[0].cond3 = true;
		inputState[1].cond3 = true;
	}
	else {
		valid = false;
	}
	if (ymin < ymax && inputState[3].cond1) {
		inputState[2].cond3 = true;
		inputState[3].cond3 = true;
	}
	else {
		valid = false;
	}

	if (!valid) return displayErrorMessage(inputState);

	processInput(xmin, xmax, ymin, ymax);
}

function processInput(xmin, xmax, ymin, ymax) {

	clearErrorMessages();
	let table = document.getElementById('multitable');
	table.innerHTML = '';
	let head = document.createElement('thead');
	table.appendChild(head);

	let row = document.createElement('tr');
	head.appendChild(row);

	let header = document.createElement('th');
	row.appendChild(header);
	let data;

	for(let i = xmin; i <= xmax; i++) {
		header = document.createElement('th');
		header.textContent = i;
		header.className = 'fixed';
		row.appendChild(header);
	}

	let body = document.createElement('tbody');
	table.appendChild(body);

	row = document.createElement('tr');
	body.appendChild(row);

	for(let i = ymin; i <= ymax; i++) {

		row = document.createElement('tr');
		header = document.createElement('th');
		header.textContent = i;
		header.className = 'fixed-left';
		row.appendChild(header);

		for(let j = xmin; j <= xmax; j++) {
			data = document.createElement('td');
			data.textContent = i*j;
			row.appendChild(data);
		}
		table.appendChild(row);
	}
}

function displayErrorMessage(inputState) {

	let errorFlags = ['', '', '', ''];
	console.log(inputState)

	// Clear table element of child nodes
	clearMultitable();

	const errorMessages = document.querySelector('tfoot');
	const containsMessages = errorMessages.childElementCount;

	if(containsMessages) {
		clearErrorMessages();
	}


	for(let i = 0; i < 4; i++) {
		if(inputState[i].cond1 == false) {
			addErrorMessage(errorMessages, 'all entries must be entered');
			break;
		}
	}
	
	for(let i = 0; i < 4; i++) {
		if(inputState[i].cond2 == false) {
			addErrorMessage(errorMessages, 'entries must be within range [-50, 50]');
			break;
		}
	}

	for(let i = 0; i < 4; i++) {
		if(inputState[i].cond3 == false) {
			addErrorMessage(errorMessages, 'min values must be less than max values');
			break;
		}
	}

	console.log(errorMessages);
}

function addErrorMessage(errorMessages, message) {
	let newRow = document.createElement('tr');
	let cell = document.createElement('td');
	cell.setAttribute('colspan', '4');
	cell.appendChild(createMessage(message));
	newRow.appendChild(cell);
	errorMessages.appendChild(newRow);
}

function createMessage(message) {
	let item = document.createElement('p');
	item.className = 'error-message';
	item.textContent = message;
	return item;
}


function clearErrorMessages() {
	console.log('clear error messages');
	document.querySelector('tfoot').innerHTML = '';
}



function clearMultitable() {
	// console.log('clear multitable');
	document.getElementById('multitable').innerHTML = '';
}

function conditionOne() {

}