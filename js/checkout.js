'use strict'

// Exercise 7

let ERRORS = 0;
const FORM = document.querySelector("form.form");
const INPUTS = document.querySelectorAll('form.form input');

const getInputData = (input) => {
	const FIELD = input.id.substring(1);
	const NAME = FIELD == "LastN" ? "last name" : FIELD.toLowerCase();
	const ERROR = document.getElementById("error" + FIELD);

	return {FIELD: FIELD, NAME: NAME, ERROR: ERROR}
}

const valMinLength = (input, type, minLength) => {
	const {NAME} = getInputData(input);
	const TYPE = type.trim().toUpperCase();
	let value = input.value;
	let testvalue = value; 
	let char = "character";

	if (TYPE != "PASSWORD") {
		value = value.trim();
		testvalue = value
	}

	if (TYPE == "PHONE")
		char = "digit";

	if (TYPE == "NAME" || TYPE == "PHONE") {
		value = value.replace(/\s+/g, ' ');
		testvalue = value.replace(/\s+/g, '')
	}
	
	input.value = value;

	if (!minLength && !testvalue.length)
		return "The " + NAME + " is required.";

	if (testvalue.length < minLength) {
		if (minLength == 1)
			return "The " + NAME + " is required and must have, at least, one " + char + "."
		else
			return "The " + NAME + " is required and must have, at least, " + minLength + " " + char + "s.";
	}

	return ""
}

const valChars = (VALUE, ...types) => {
	const LOW = "a-z";
	const UPPER = "A-Z";
	const LOWENYE = "a-zñ";
	const UPPERENYE = "A-ZÑ";
	const LOWACCENTS = "àèìòùáéíóúäëïöü";
	const UPPERACCENTS = "ÀÈÌÒÙÁÉÍÓÚÄËÏÖÜ";
	const CATALA = "·'";
	const NUMBERS = "\\d";
	const SPACES = "\\s";
	let STR = "";

	types = types.map(v => v.trim().toUpperCase());

	types.forEach(v => {
		const INC = ["CATALA", "ALLLETTERS", "LETERS", "NUMBERS"].includes(v);

		if (!INC)
			console.log("Error. Unknown type '" + v + "' ")
	})

	if (types.includes("CATALA"))
		STR += CATALA;

	if (types.includes("ALLLETTERS"))
		STR += LOWENYE + UPPERENYE + LOWACCENTS + UPPERACCENTS + CATALA;

	if (types.includes("LETTERS"))
		STR += LOW + UPPER;

	if (types.includes("NUMBERS"))
		STR += NUMBERS;

	if (types.includes("SPACES"))
		STR += SPACES;

	const REGEXP = RegExp("[" + STR + "]+", 'g');
	const MATCH = VALUE.match(REGEXP);

	return !(MATCH == null || MATCH != VALUE)
}

const valName = (input) => {
	// Must be checked ater the minimum length validation
	const {NAME} = getInputData(input);
	const VALUE = input.value;
	const TYPES = ["ALLLETTERS", "SPACES"];

	if (!valChars(VALUE, ...TYPES))
		return "The " + NAME + " must have only letters and spaces.";

	return ""
}

const valEmail = (input) => {
	// Must be checked ater the minimum length validation
	const VALUE = input.value;
	const REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            
	if (REGEXP.test(VALUE))
		return "";

	return "Invalid email address"
}

const valPassword = (input) => {
	// Must be checked ater the minimum length validation
	const {NAME} = getInputData(input);
	const VALUE = input.value;
	const LETTERS = /[a-zñA-ZÑ]/.test(VALUE);
	const DIGITS = /[0-9]/.test(VALUE);
	
	if (!(LETTERS && DIGITS))
		return "The " + NAME + " must have almost one letter and one digit.";

	return ""
}

const valPhone = (input) => {
	// Must be checked ater the minimum length validation
	const {NAME} = getInputData(input);
	const VALUE = input.value;

	if (!valChars(VALUE, "Numbers", "SPACES"))
		return "The " + NAME + " must have only numbers and spaces.";

	return ""
}

const validateInput = (input) => {
	const {FIELD, ERROR} = getInputData(input);
	let ERROR_TEXT = ""

	if (new Set(['Name', 'LastN']).has(FIELD)) {
		ERROR_TEXT = valMinLength(input, "NAME", 3);
		if (!ERROR_TEXT.length) ERROR_TEXT = valName(input, 3)
	} else if (FIELD == "Email") {
		ERROR_TEXT = valMinLength(input, "TRIM", 0);
		if (!ERROR_TEXT.length) ERROR_TEXT = valEmail(input)
	} else if (FIELD == "Address") {
		ERROR_TEXT = valMinLength(input, "NAME", 3)
	} else if (FIELD == "Password") {
		ERROR_TEXT = valMinLength(input, "Password", 3);
		if (!ERROR_TEXT.length) ERROR_TEXT = valPassword(input)
	} else if (FIELD == "Phone") {
		ERROR_TEXT = valMinLength(input, "Phone", 9);
		if (!ERROR_TEXT.length) ERROR_TEXT = valPhone(input)
	}

	ERROR.innerText = ERROR_TEXT

	if (!ERROR_TEXT.length ) {
		input.classList.remove('is-invalid');
		return
	}

	ERRORS++;
	input.classList.add('is-invalid');

}
const validate = () => {
	ERRORS = 0;
	
	INPUTS.forEach(INPUT => validateInput(INPUT))

	if (!ERRORS) {
		FORM.classList.add('was-validated');
		setTimeout(() => {
			FORM.classList.remove('was-validated');
		}, 3500)
	}
}

(function () {
	const FORM = document.querySelector("form.form");
	const blurEvent = (event) => {
		const INPUT = event.target;
		const ISCONTROL = INPUT.classList.contains("form-control");

		if (ISCONTROL && INPUT.value.length > 0)
			validateInput(INPUT)
	};

	Array.prototype.slice.call(INPUTS)
		.forEach(input => {
			input.addEventListener("blur", blurEvent)
	})
	
	// Disable submit event
	FORM.addEventListener('submit', function (event) {
		event.preventDefault()
		event.stopPropagation()
	}, false)
})()
