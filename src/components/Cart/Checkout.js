import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = (value) => {
	return value.trim() === '';
};

const is5Chars = (value) => {
	return value.trim().length >= 5;
};
const Checkout = (props) => {
	const nameInputRef = useRef();
	const addressInputRef = useRef();
	const postalInputRef = useRef();
	const cityInputRef = useRef();

	const [formInputValidity, setFormInputValidty] = useState({
		name: true,
		address: true,
		city: true,
		postalcode: true
	});
	const confirmHandler = (event) => {
		event.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredAddress = addressInputRef.current.value;
		const enteredPostal = postalInputRef.current.value;
		const enteredCity = cityInputRef.current.value;

		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredAddressIsValid = !isEmpty(enteredAddress);
		const enteredCityIsValid = !isEmpty(enteredCity);
		const enteredPostalIsValid = is5Chars(enteredPostal);

		setFormInputValidty({
			name: enteredNameIsValid,
			address: enteredAddressIsValid,
			city: enteredCityIsValid,
			postalcode: enteredPostalIsValid
		});
	};

	const nameControlCls = `${classes.control} ${
		formInputValidity.name ? '' : classes.invalid
	}`;
	const addressControlCls = `${classes.control} ${
		formInputValidity.address ? '' : classes.invalid
	}`;
	const cityControlCls = `${classes.control} ${
		formInputValidity.city ? '' : classes.invalid
	}`;
	const postalControlCls = `${classes.control} ${
		formInputValidity.postalcode ? '' : classes.invalid
	}`;

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={nameControlCls}>
				<label htmlFor="name">Your Name</label>
				<input type="text" id="name" ref={nameInputRef} />
				{!formInputValidity.name && <p>Please enter your name</p>}
			</div>
			<div className={addressControlCls}>
				<label htmlFor="street">Street</label>
				<input type="text" id="street" ref={addressInputRef} />
				{!formInputValidity.address && <p>Please enter your address.</p>}
			</div>
			<div className={postalControlCls}>
				<label htmlFor="postal">Postal Code</label>
				<input type="text" id="postal" ref={postalInputRef} />
				{!formInputValidity.postalcode && (
					<p>Please enter valid 5 digit postal code.</p>
				)}
			</div>
			<div className={cityControlCls}>
				<label htmlFor="city">City</label>
				<input type="text" id="city" ref={cityInputRef} />
				{!formInputValidity.city && <p>Please enter your city.</p>}
			</div>
			<div className={classes.actions}>
				<button type="button" onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
